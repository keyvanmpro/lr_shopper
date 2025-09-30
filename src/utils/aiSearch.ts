import { Product, Filters, AISearchResult, RefinementChip, AmbiguityChoice } from '../types/Product';

// Dictionnaire de correspondances pour normaliser les termes
const brandMappings: Record<string, string> = {
  'levi\'s': 'La Redoute Collections',
  'levis': 'La Redoute Collections',
  'anne': 'Anne Weyburn',
  'weyburn': 'Anne Weyburn',
  'castaluna': 'Castaluna',
  'redoute': 'La Redoute Collections',
  'collections': 'La Redoute Collections'
};

const colorMappings: Record<string, string[]> = {
  'blanc': ['Blanc'],
  'blanche': ['Blanc'],
  'blancs': ['Blanc'],
  'blanches': ['Blanc'],
  'noir': ['Noir'],
  'noire': ['Noir'],
  'noirs': ['Noir'],
  'noires': ['Noir'],
  'rouge': ['Rouge'],
  'rouges': ['Rouge'],
  'bleu': ['Bleu', 'Bleu foncé', 'Bleu clair', 'Marine'],
  'bleue': ['Bleu', 'Bleu foncé', 'Bleu clair', 'Marine'],
  'bleus': ['Bleu', 'Bleu foncé', 'Bleu clair', 'Marine'],
  'bleues': ['Bleu', 'Bleu foncé', 'Bleu clair', 'Marine'],
  'marine': ['Marine', 'Bleu foncé'],
  'vert': ['Vert'],
  'verte': ['Vert'],
  'verts': ['Vert'],
  'vertes': ['Vert'],
  'gris': ['Gris'],
  'grise': ['Gris'],
  'bordeaux': ['Bordeaux'],
  'camel': ['Camel'],
  'beige': ['Beige'],
  'kaki': ['Kaki'],
  'multicolore': ['Multicolore']
};

const sizeMappings: Record<string, string[]> = {
  't34': ['34'],
  't36': ['36'],
  't38': ['38'],
  't40': ['40'],
  't42': ['42'],
  't44': ['44'],
  'taille34': ['34'],
  'taille36': ['36'],
  'taille38': ['38'],
  'taille40': ['40'],
  'taille42': ['42'],
  'taille44': ['44'],
  'xs': ['XS'],
  's': ['S'],
  'm': ['M'],
  'l': ['L'],
  'xl': ['XL'],
  'xxl': ['XXL'],
  '34': ['34'],
  '36': ['36'],
  '38': ['38'],
  '40': ['40'],
  '42': ['42'],
  '44': ['44'],
  'petit': ['XS', 'S'],
  'petite': ['XS', 'S'],
  'moyen': ['M'],
  'moyenne': ['M'],
  'grand': ['L', 'XL'],
  'grande': ['L', 'XL']
};

const categoryKeywords: Record<string, string[]> = {
  'jean': ['jean', 'jeans', 'denim'],
  'robe': ['robe', 'robes'],
  'chemise': ['chemise', 'chemises'],
  'pull': ['pull', 'pulls', 'pullover', 'pull-over'],
  'tshirt': ['tshirt', 't-shirt', 'tee-shirt', 'tee shirt', 'tee', 'shirt'],
  'pantalon': ['pantalon', 'pantalons'],
  'chaussure': ['chaussure', 'chaussures', 'sneaker', 'sneakers', 'escarpin', 'escarpins', 'sandale', 'sandales', 'bottine', 'bottines'],
  'veste': ['veste', 'vestes', 'blazer', 'blazers', 'manteau', 'manteaux'],
  'jupe': ['jupe', 'jupes'],
  'short': ['short', 'shorts'],
  'cardigan': ['cardigan', 'cardigans'],
  'sweat': ['sweat', 'sweat-shirt', 'sweatshirt', 'hoodie', 'capuche'],
  'combinaison': ['combinaison', 'combinaisons']
};

const deliveryKeywords = ['rapide', '24h', 'express', 'livraison rapide', 'urgent', 'vite'];
const materialKeywords = ['coton', 'lin', 'laine', 'soie', 'polyester', 'cachemire', 'mérinos'];

export function parseAIQuery(query: string): AISearchResult | AmbiguityChoice[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Détection de requêtes hors sujet
  const offTopicKeywords = [
    'météo', 'weather', 'température', 'pluie', 'soleil',
    'commande', 'suivi', 'tracking', 'colis',
    'retour', 'remboursement', 'échange', 'sav',
    'horaires', 'magasin', 'adresse', 'téléphone',
    'recette', 'cuisine', 'restaurant',
    'actualité', 'news', 'politique'
  ];
  
  const isOffTopic = offTopicKeywords.some(keyword => normalizedQuery.includes(keyword));
  if (isOffTopic) {
    throw new Error('OFF_TOPIC');
  }
  
  // Détection de prix avec opérateurs améliorée
  let detectedPriceRange: [number, number] | undefined;
  const pricePatterns = [
    /[<≤]\s*(\d+)\s*€?/,  // <60€
    /moins\s+de\s+(\d+)/,  // moins de 60
    /budget\s+(\d+)/,      // budget 60
    /(\d+)\s*€?\s*max/,     // 60€ max
    /max\s+(\d+)/,         // max 60
    /(\d+)\s*[-–]\s*(\d+)\s*€?/, // 30-60€
    /entre\s+(\d+)\s+et\s+(\d+)/, // entre 30 et 60
    /(\d+)\s*€\s*environ/, // 50€ environ
    /autour\s+de\s+(\d+)/, // autour de 50
    /pas\s+cher/, // pas cher
    /bon\s+marché/, // bon marché
  ];
  
  for (const pattern of pricePatterns) {
    const match = normalizedQuery.match(pattern);
    if (match) {
      if (match[2]) {
        // Range pattern (30-60)
        detectedPriceRange = [parseInt(match[1]), parseInt(match[2])];
      } else if (match[1]) {
        // Max pattern (<60)
        const price = parseInt(match[1]);
        detectedPriceRange = [0, price];
      }
      break;
    }
  }
  
  // Détection spéciale pour "pas cher" ou "bon marché"
  if (normalizedQuery.includes('pas cher') || normalizedQuery.includes('bon marché')) {
    detectedPriceRange = [0, 50];
  }
  
  // Détection de catégorie améliorée
  let detectedCategory = '';
  let categoryConfidence = 0;
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const matches = keywords.filter(keyword => normalizedQuery.includes(keyword));
    if (matches.length > 0) {
      const confidence = matches.length / keywords.length;
      if (confidence > categoryConfidence) {
        detectedCategory = category;
        categoryConfidence = confidence;
      }
    }
  }

  // Détection de marque améliorée
  let detectedBrand = '';
  for (const [brand, mappedBrand] of Object.entries(brandMappings)) {
    if (normalizedQuery.includes(brand)) {
      detectedBrand = mappedBrand;
      break;
    }
  }

  // Détection de couleurs améliorée
  const detectedColors: string[] = [];
  for (const [color, mappedColors] of Object.entries(colorMappings)) {
    if (normalizedQuery.includes(color)) {
      detectedColors.push(...mappedColors);
    }
  }
  // Supprimer les doublons
  const uniqueColors = [...new Set(detectedColors)];

  // Détection de tailles améliorée
  const detectedSizes: string[] = [];
  for (const [size, mappedSizes] of Object.entries(sizeMappings)) {
    if (normalizedQuery.includes(size)) {
      detectedSizes.push(...mappedSizes);
    }
  }
  // Supprimer les doublons
  const uniqueSizes = [...new Set(detectedSizes)];

  // Détection de livraison rapide
  const fastDelivery = deliveryKeywords.some(keyword => normalizedQuery.includes(keyword));

  // Vérification d'ambiguïté - seulement si vraiment aucun critère détecté
  if (!detectedCategory && !detectedBrand && uniqueColors.length === 0 && 
      uniqueSizes.length === 0 && !detectedPriceRange && !fastDelivery) {
    // Vérifier si c'est une requête très générale
    const generalTerms = ['vêtement', 'habit', 'mode', 'style', 'tendance'];
    const isGeneral = generalTerms.some(term => normalizedQuery.includes(term));
    
    if (isGeneral || normalizedQuery.split(' ').length <= 2) {
      return generateAmbiguityChoices(normalizedQuery);
    }
  }

  // Génération des chips d'affinage intelligents
  const refinementChips = generateRefinementChips(
    detectedCategory, 
    uniqueColors, 
    uniqueSizes, 
    detectedPriceRange,
    fastDelivery
  );

  // Calcul de la confiance basé sur les critères détectés
  let confidence = 0;
  if (detectedCategory) confidence += 0.3;
  if (detectedBrand) confidence += 0.2;
  if (uniqueColors.length > 0) confidence += 0.2;
  if (uniqueSizes.length > 0) confidence += 0.2;
  if (detectedPriceRange) confidence += 0.1;
  if (fastDelivery) confidence += 0.1;

  // Bonus de confiance si plusieurs critères sont détectés
  const criteriaCount = [detectedCategory, detectedBrand, uniqueColors.length > 0, 
                        uniqueSizes.length > 0, detectedPriceRange, fastDelivery]
                        .filter(Boolean).length;
  if (criteriaCount >= 2) confidence += 0.1;

  // Génération de l'explication détaillée
  const explanation = generateExplanation(
    detectedCategory, 
    detectedBrand, 
    uniqueColors, 
    uniqueSizes, 
    detectedPriceRange,
    fastDelivery
  );

  return {
    query,
    detectedCategory,
    detectedBrand,
    detectedColors: uniqueColors,
    detectedSizes: uniqueSizes,
    detectedPriceRange,
    confidence: Math.min(confidence, 1), // Cap à 1
    explanation,
    refinementChips
  };
}

function generateAmbiguityChoices(query: string): AmbiguityChoice[] {
  return [
    {
      id: 'femme',
      label: 'Mode Femme',
      description: 'Vêtements et accessoires pour femme',
      filters: { 
        brands: [], 
        colors: [], 
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        priceRange: [0, 1000],
        fastDeliveryOnly: false,
        inStockOnly: false
      }
    },
    {
      id: 'homme',
      label: 'Mode Homme',
      description: 'Vêtements et accessoires pour homme',
      filters: { 
        brands: [], 
        colors: [], 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        priceRange: [0, 1000],
        fastDeliveryOnly: false,
        inStockOnly: false
      }
    },
    {
      id: 'chaussures',
      label: 'Chaussures',
      description: 'Chaussures pour tous',
      filters: { 
        brands: [], 
        colors: [], 
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
        priceRange: [0, 1000],
        fastDeliveryOnly: false,
        inStockOnly: false
      }
    }
  ];
}

function generateRefinementChips(
  category?: string,
  colors?: string[],
  sizes?: string[],
  priceRange?: [number, number],
  fastDelivery?: boolean
): RefinementChip[] {
  const chips: RefinementChip[] = [];

  // Chip budget intelligent
  if (!priceRange) {
    chips.push({
      id: 'budget-50',
      label: 'Budget -50€',
      type: 'budget',
      filters: { priceRange: [0, 50] }
    });
  } else {
    // Proposer d'augmenter le budget
    const currentMax = priceRange[1];
    chips.push({
      id: 'budget-increase',
      label: `Budget +20% (${Math.round(currentMax * 1.2)}€)`,
      type: 'budget',
      filters: { priceRange: [priceRange[0], Math.round(currentMax * 1.2)] }
    });
  }

  // Chips couleurs intelligents
  if (colors && colors.length > 0) {
    const baseColor = colors[0];
    if (baseColor.includes('Bleu')) {
      chips.push({
        id: 'color-blue-variants',
        label: 'Tous les bleus',
        type: 'color',
        filters: { colors: ['Bleu', 'Bleu foncé', 'Bleu clair', 'Marine'] }
      });
    } else if (baseColor === 'Noir' || baseColor === 'Blanc') {
      chips.push({
        id: 'color-neutral',
        label: 'Couleurs neutres',
        type: 'color',
        filters: { colors: ['Blanc', 'Noir', 'Gris', 'Beige'] }
      });
    }
  } else {
    chips.push({
      id: 'color-popular',
      label: 'Couleurs populaires',
      type: 'color',
      filters: { colors: ['Noir', 'Blanc', 'Bleu', 'Rouge'] }
    });
  }

  // Chip tailles intelligents
  if (sizes && sizes.length > 0) {
    const hasNumericSizes = sizes.some(size => /^\d+$/.test(size));
    if (hasNumericSizes) {
      chips.push({
        id: 'size-range',
        label: 'Tailles 36-42',
        type: 'size',
        filters: { sizes: ['36', '38', '40', '42'] }
      });
    } else {
      chips.push({
        id: 'size-standard',
        label: 'Tailles S-L',
        type: 'size',
        filters: { sizes: ['S', 'M', 'L'] }
      });
    }
  }

  // Chip livraison si pas déjà activé
  if (!fastDelivery) {
    chips.push({
      id: 'fast-delivery',
      label: 'Livraison 24h',
      type: 'delivery',
      filters: { fastDeliveryOnly: true }
    });
  }

  // Chip marque populaire si pas de marque détectée
  if (!category || category === 'jean' || category === 'robe') {
    chips.push({
      id: 'popular-brand',
      label: 'Anne Weyburn',
      type: 'brand',
      filters: { brands: ['Anne Weyburn'] }
    });
  }

  return chips.slice(0, 4); // Limiter à 4 chips
}

function generateExplanation(
  category?: string,
  brand?: string,
  colors?: string[],
  sizes?: string[],
  priceRange?: [number, number],
  fastDelivery?: boolean
): string {
  const parts: string[] = [];

  if (category) {
    const categoryNames: Record<string, string> = {
      'jean': 'jeans',
      'robe': 'robes',
      'chemise': 'chemises',
      'pull': 'pulls',
      'tshirt': 't-shirts',
      'pantalon': 'pantalons',
      'chaussure': 'chaussures',
      'veste': 'vestes',
      'jupe': 'jupes',
      'short': 'shorts'
    };
    parts.push(`Recherche dans les ${categoryNames[category] || category}`);
  }
  
  if (brand) {
    parts.push(`Marque : ${brand}`);
  }
  
  if (colors && colors.length > 0) {
    if (colors.length === 1) {
      parts.push(`Couleur : ${colors[0]}`);
    } else {
      parts.push(`Couleurs : ${colors.slice(0, 2).join(', ')}${colors.length > 2 ? '...' : ''}`);
    }
  }
  
  if (sizes && sizes.length > 0) {
    if (sizes.length === 1) {
      parts.push(`Taille : ${sizes[0]}`);
    } else {
      parts.push(`Tailles : ${sizes.slice(0, 3).join(', ')}${sizes.length > 3 ? '...' : ''}`);
    }
  }
  
  if (priceRange) {
    if (priceRange[0] === 0) {
      parts.push(`Budget max : ${priceRange[1]}€`);
    } else {
      parts.push(`Budget : ${priceRange[0]}€ - ${priceRange[1]}€`);
    }
  }
  
  if (fastDelivery) {
    parts.push('Livraison rapide activée');
  }

  if (parts.length === 0) {
    return 'Recherche générale dans le catalogue';
  }

  return parts.join(' • ');
}

export function applyAIFilters(products: Product[], aiResult: AISearchResult): Product[] {
  let filtered = products;

  // Filtrage par catégorie (recherche dans le nom du produit)
  if (aiResult.detectedCategory) {
    const categoryKeywords = getCategoryKeywords(aiResult.detectedCategory);
    filtered = filtered.filter(product =>
      categoryKeywords.some(keyword =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
      )
    );
  }

  // Filtrage par marque
  if (aiResult.detectedBrand) {
    filtered = filtered.filter(product => product.brand === aiResult.detectedBrand);
  }

  // Filtrage par couleurs
  if (aiResult.detectedColors && aiResult.detectedColors.length > 0) {
    filtered = filtered.filter(product =>
      product.colors.some(color => aiResult.detectedColors!.includes(color))
    );
  }

  // Filtrage par tailles
  if (aiResult.detectedSizes && aiResult.detectedSizes.length > 0) {
    filtered = filtered.filter(product =>
      product.sizes.some(size => aiResult.detectedSizes!.includes(size))
    );
  }

  // Filtrage par prix
  if (aiResult.detectedPriceRange) {
    const [min, max] = aiResult.detectedPriceRange;
    filtered = filtered.filter(product =>
      product.price >= min && product.price <= max
    );
  }

  return filtered;
}

function getCategoryKeywords(category: string): string[] {
  return categoryKeywords[category] || [category];
}