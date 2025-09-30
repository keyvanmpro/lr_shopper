import { useState, useEffect } from 'react';
import { Grid2x2 as Grid, List, Sparkles } from 'lucide-react';
import { Product, Filters, AISearchResult, RefinementChip, AmbiguityChoice } from '../types/Product';
import FilterBar from './FilterBar';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';
import AISearchBanner from './AISearchBanner';
import AIRefinementPanel from './AIRefinementPanel';
import AmbiguityModal from './AmbiguityModal';
import ZeroResultsState from './ZeroResultsState';
import AIErrorState from './AIErrorState';
import ExitAIConfirmModal from './ExitAIConfirmModal';
import FewResultsBanner from './FewResultsBanner';
import SmartFilterModal from './SmartFilterModal';
import { products } from '../data/products';
import { parseAIQuery, applyAIFilters } from '../utils/aiSearch';

interface ProductListPageProps {
  onProductSelect: (product: Product) => void;
  aiQuery?: string;
  onExitAIMode?: () => void;
}

export default function ProductListPage({ onProductSelect, aiQuery, onExitAIMode }: ProductListPageProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [ambiguityChoices, setAmbiguityChoices] = useState<AmbiguityChoice[] | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [smartFilterMessage, setSmartFilterMessage] = useState<string>('');
  const [highlightedFilters, setHighlightedFilters] = useState<string[]>([]);
  const [aiError, setAiError] = useState<'error' | 'off-topic' | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showRefinementPanel, setShowRefinementPanel] = useState(false);
  const [showSmartFilterModal, setShowSmartFilterModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    colors: [],
    sizes: [],
    priceRange: [0, 1000],
    fastDeliveryOnly: false,
    inStockOnly: false
  });

  // Handle AI search
  useEffect(() => {
    if (aiQuery) {
      try {
        const result = parseAIQuery(aiQuery);
        setAiError(null);
        
        if (Array.isArray(result)) {
          // Ambiguous query
          setAmbiguityChoices(result);
        } else {
          // Clear AI result
          setAiResult(result);
          setAmbiguityChoices(null);
          
          // Apply AI filters
          const aiFilters: Filters = {
            brands: result.detectedBrand ? [result.detectedBrand] : [],
            colors: result.detectedColors || [],
            sizes: result.detectedSizes || [],
            priceRange: result.detectedPriceRange || [0, 1000],
            fastDeliveryOnly: false,
            inStockOnly: false
          };
          setFilters(aiFilters);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'OFF_TOPIC') {
            setAiError('off-topic');
          } else {
            setAiError('error');
          }
        }
        setAiResult(null);
        setAmbiguityChoices(null);
      }
    } else {
      setAiResult(null);
      setAmbiguityChoices(null);
      setAiError(null);
    }
  }, [aiQuery]);

  // Simulate loading with fade-in effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [filters]);

  // Filter products
  useEffect(() => {
    let filtered = aiResult ? applyAIFilters(products, aiResult) : products;

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Fast delivery filter
    if (filters.fastDeliveryOnly) {
      filtered = filtered.filter(product => product.fastDelivery);
    }

    // In stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    setFilteredProducts(filtered);
  }, [filters, aiResult]);

  const handleAmbiguityChoice = (choice: AmbiguityChoice) => {
    setAmbiguityChoices(null);
    setFilters(prev => ({
      ...prev,
      ...choice.filters
    }));
  };

  const handleRefinementChip = (chip: RefinementChip) => {
    setFilters(prev => ({
      ...prev,
      ...chip.filters
    }));
  };

  const handleSmartFilter = (query: string) => {
    // Special case for opening AI panel
    if (query === 'OPEN_SMART_FILTER_MODAL') {
      setShowSmartFilterModal(true);
      return;
    }

    const result = parseAIQuery(query);
    
    if (Array.isArray(result)) {
      // Ambiguous query - show modal
      setAmbiguityChoices(result);
      return;
    }

    // Apply smart filters
    const newFilters = { ...filters };
    const appliedFilters: string[] = [];
    let hasUnrecognizedCriteria = false;

    // Check what was detected and apply filters
    if (result.detectedBrand) {
      if (!newFilters.brands.includes(result.detectedBrand)) {
        newFilters.brands = [...newFilters.brands, result.detectedBrand];
        appliedFilters.push('brands');
      }
    }

    if (result.detectedColors && result.detectedColors.length > 0) {
      const newColors = [...new Set([...newFilters.colors, ...result.detectedColors])];
      if (newColors.length > newFilters.colors.length) {
        newFilters.colors = newColors;
        appliedFilters.push('colors');
      }
    }

    if (result.detectedSizes && result.detectedSizes.length > 0) {
      const newSizes = [...new Set([...newFilters.sizes, ...result.detectedSizes])];
      if (newSizes.length > newFilters.sizes.length) {
        newFilters.sizes = newSizes;
        appliedFilters.push('sizes');
      }
    }

    if (result.detectedPriceRange) {
      const [min, max] = result.detectedPriceRange;
      newFilters.priceRange = [
        Math.max(newFilters.priceRange[0], min),
        Math.min(newFilters.priceRange[1], max)
      ];
      appliedFilters.push('price');
    }

    // Check for delivery keywords
    if (query.toLowerCase().includes('rapide') || query.toLowerCase().includes('24h') || query.toLowerCase().includes('express')) {
      newFilters.fastDeliveryOnly = true;
      appliedFilters.push('delivery');
    }

    // Determine if there are unrecognized criteria
    const queryWords = query.toLowerCase().split(/\s+/);
    const recognizedWords = [
      ...(result.detectedBrand ? [result.detectedBrand.toLowerCase()] : []),
      ...(result.detectedColors || []).map(c => c.toLowerCase()),
      ...(result.detectedSizes || []).map(s => s.toLowerCase()),
      'rapide', '24h', 'express', 'livraison', '€', 'euros', 'moins', 'de', 'max', 'budget'
    ];
    
    hasUnrecognizedCriteria = queryWords.some(word => 
      word.length > 2 && 
      !recognizedWords.some(recognized => word.includes(recognized) || recognized.includes(word)) &&
      !word.match(/^\d+$/) && // Not a number
      !word.match(/^[<>≤≥]/) // Not an operator
    );

    // Apply filters and show feedback
    setFilters(newFilters);
    setHighlightedFilters(appliedFilters);
    
    if (appliedFilters.length > 0) {
      if (hasUnrecognizedCriteria) {
        setSmartFilterMessage('Certains critères n\'ont pas pu être appliqués.');
      } else {
        setSmartFilterMessage('Filtres appliqués automatiquement 👌');
      }
    } else {
      setSmartFilterMessage('Aucun critère reconnu dans votre recherche.');
    }

    // Clear highlights and message after delay
    setTimeout(() => {
      setHighlightedFilters([]);
    }, 2000);
    
    setTimeout(() => {
      setSmartFilterMessage('');
    }, 4000);
  };

  const handleExitAIMode = () => {
    if (aiResult && filteredProducts.length > 0) {
      setShowExitConfirm(true);
      return;
    }
    confirmExitAIMode();
  };

  const confirmExitAIMode = () => {
    setAiResult(null);
    setAiError(null);
    setShowExitConfirm(false);
    setFilters({
      brands: [],
      colors: [],
      sizes: [],
      priceRange: [0, 1000],
      fastDeliveryOnly: false,
      inStockOnly: false
    });
    if (onExitAIMode) {
      onExitAIMode();
    }
  };

  const handleRetryAI = () => {
    setAiError(null);
    if (aiQuery && onExitAIMode) {
      // Re-trigger AI search
      window.location.reload();
    }
  };

  const handleZeroResultsAction = (action: 'color' | 'budget' | 'sizes') => {
    const newFilters = { ...filters };
    
    switch (action) {
      case 'color':
        // Assouplir les couleurs - ajouter des couleurs proches
        if (newFilters.colors.length > 0) {
          const additionalColors = ['Blanc', 'Gris', 'Noir'];
          newFilters.colors = [...new Set([...newFilters.colors, ...additionalColors])];
        }
        break;
      case 'budget':
        // Augmenter le budget de 50%
        const currentMax = newFilters.priceRange[1];
        newFilters.priceRange = [newFilters.priceRange[0], Math.round(currentMax * 1.5)];
        break;
      case 'sizes':
        // Ajouter des tailles proches
        if (newFilters.sizes.length > 0) {
          const currentSizes = newFilters.sizes;
          const allSizes = ['XS', 'S', 'M', 'L', 'XL', '34', '36', '38', '40', '42', '44'];
          const additionalSizes = allSizes.filter(size => !currentSizes.includes(size)).slice(0, 2);
          newFilters.sizes = [...currentSizes, ...additionalSizes];
        }
        break;
    }
    
    setFilters(newFilters);
  };

  const handleFewResultsAction = (action: 'colors' | 'budget') => {
    const newFilters = { ...filters };
    
    if (action === 'colors') {
      // Élargir aux couleurs voisines
      const neighborColors = ['Blanc', 'Gris', 'Noir', 'Beige', 'Marine'];
      newFilters.colors = [...new Set([...newFilters.colors, ...neighborColors])];
    } else if (action === 'budget') {
      // Augmenter le budget de 20%
      const currentMax = newFilters.priceRange[1];
      newFilters.priceRange = [newFilters.priceRange[0], Math.round(currentMax * 1.2)];
    }
    
    setFilters(newFilters);
  };

  const handleOpenRefinementPanel = () => {
    setShowRefinementPanel(true);
  };

  const handleCloseRefinementPanel = () => {
    setShowRefinementPanel(false);
  };

  const handleApplyRefinement = (query: string) => {
    // Use the same logic as smart filter
    handleSmartFilter(query);
    // Le panneau reste ouvert pour continuer la conversation - pas de fermeture automatique
  };

  const handleResetRefinement = () => {
    setFilters({
      brands: [],
      colors: [],
      sizes: [],
      priceRange: [0, 1000],
      fastDeliveryOnly: false,
      inStockOnly: false
    });
    setShowRefinementPanel(false);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Filter Bar */}
      <FilterBar 
        filters={filters} 
        onFiltersChange={setFilters}
        highlightedFilters={highlightedFilters}
        onSmartFilter={handleSmartFilter}
        showSmartFilter={!aiResult}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 animate-fadeIn">
            <span className="text-green-600">👌</span>
            <span className="text-green-800 font-medium">Affinage appliqué</span>
          </div>
        )}

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 animate-fadeIn">
            <span className="text-green-600">👌</span>
            <span className="text-green-800 font-medium">Affinage appliqué</span>
          </div>
        )}

        {/* Smart Filter Message */}
        {smartFilterMessage && (
          <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 animate-fadeIn ${
            smartFilterMessage.includes('👌') 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <span className={smartFilterMessage.includes('👌') ? 'text-green-800' : 'text-orange-800'}>
              {smartFilterMessage}
            </span>
          </div>
        )}

        {/* AI Search Banner */}
        {aiResult && (
          <AISearchBanner 
            aiResult={aiResult}
            onExitAIMode={handleExitAIMode}
            onApplyRefinement={handleRefinementChip}
          />
        )}

        {/* AI Error State */}
        {aiError && (
          <AIErrorState
            type={aiError}
            onRetry={aiError === 'error' ? handleRetryAI : undefined}
            onClassicSearch={confirmExitAIMode}
          />
        )}

        {/* Few Results Banner */}
        {!loading && filteredProducts.length > 0 && filteredProducts.length < 3 && (
          <FewResultsBanner
            count={filteredProducts.length}
            onElargiCouleurs={() => handleFewResultsAction('colors')}
            onAugmenteBudget={() => handleFewResultsAction('budget')}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tous les produits</h1>
            <p className="text-gray-600 flex items-center">
              <span className="mr-2">{filteredProducts.length} produits trouvés</span>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* AI Refinement Button - Only show when not in AI mode */}
            {!aiResult && (
              <button
                onClick={handleOpenRefinementPanel}
                className="flex items-center space-x-1 px-2 sm:px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-300 hover:border-red-300 rounded-md transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">Affiner avec l'IA</span>
                <span className="text-sm font-medium sm:hidden">IA</span>
              </button>
            )}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md border transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md border transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
          ) : filteredProducts.length === 0 && !aiError ? (
          <ZeroResultsState
            onAssouplirCouleur={() => handleZeroResultsAction('color')}
            onAugmenterBudget={() => handleZeroResultsAction('budget')}
            onVoirTaillesProches={() => handleZeroResultsAction('sizes')}
          />
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onProductSelect}
              />
            ))}
          </div>
          )}
        </div>

      </div>
    </div>

    {/* Ambiguity Modal */}
    {ambiguityChoices && (
      <AmbiguityModal
        query={aiQuery || ''}
        choices={ambiguityChoices}
        onChoiceSelect={handleAmbiguityChoice}
        onClose={() => setAmbiguityChoices(null)}
      />
    )}

    {/* Exit AI Confirmation Modal */}
    {showExitConfirm && (
      <ExitAIConfirmModal
        onConfirm={confirmExitAIMode}
        onCancel={() => setShowExitConfirm(false)}
      />
    )}

    {/* AI Refinement Panel */}
    <AIRefinementPanel
      isOpen={showRefinementPanel}
      onClose={handleCloseRefinementPanel}
      onApplyRefinement={handleApplyRefinement}
      onResetRefinement={handleResetRefinement}
      resultCount={filteredProducts.length}
    />

    {/* Smart Filter Modal */}
    <SmartFilterModal
      isOpen={showSmartFilterModal}
      onClose={() => setShowSmartFilterModal(false)}
      onApplyFilter={handleSmartFilter}
    />
    </>
  );
}