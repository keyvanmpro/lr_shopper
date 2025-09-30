import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Filters } from '../types/Product';
import SmartFilterInput from './SmartFilterInput';

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  highlightedFilters?: string[];
  onSmartFilter: (query: string) => void;
}

export default function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  highlightedFilters = [],
  onSmartFilter 
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['brands', 'colors', 'sizes', 'price']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const brands = ['Anne Weyburn', 'Castaluna', 'La Redoute Collections'];
  const colors = ['Blanc', 'Noir', 'Rouge', 'Bleu', 'Vert', 'Gris', 'Marine', 'Bordeaux', 'Camel'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', '44'];

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  return (
    <div className="w-72 bg-white p-6 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Filtres</h2>

      {/* Smart Filter */}
      <SmartFilterInput onSmartFilter={onSmartFilter} />

      {/* Marques */}
      <div className={`mb-6 transition-all duration-500 ${
        highlightedFilters.includes('brands') ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200' : ''
      }`}>
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Marque
          {expandedSections.includes('brands') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('brands') && (
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Couleurs */}
      <div className={`mb-6 transition-all duration-500 ${
        highlightedFilters.includes('colors') ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200' : ''
      }`}>
        <button
          onClick={() => toggleSection('colors')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Couleur
          {expandedSections.includes('colors') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('colors') && (
          <div className="space-y-2">
            {colors.map(color => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Tailles */}
      <div className={`mb-6 transition-all duration-500 ${
        highlightedFilters.includes('sizes') ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200' : ''
      }`}>
        <button
          onClick={() => toggleSection('sizes')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Taille
          {expandedSections.includes('sizes') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('sizes') && (
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-1 text-sm text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Prix */}
      <div className={`mb-6 transition-all duration-500 ${
        highlightedFilters.includes('price') ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200' : ''
      }`}>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Prix
          {expandedSections.includes('price') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('price') && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value) || 1000)}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Livraison */}
      <div className={`mb-6 transition-all duration-500 ${
        highlightedFilters.includes('delivery') ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200' : ''
      }`}>
        <h3 className="font-medium text-gray-900 mb-3">Livraison</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.fastDeliveryOnly}
            onChange={(e) => onFiltersChange({ ...filters, fastDeliveryOnly: e.target.checked })}
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <span className="ml-2 text-sm text-gray-700">Livraison rapide uniquement</span>
        </label>
      </div>

      {/* Stock */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFiltersChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <span className="ml-2 text-sm text-gray-700">En stock uniquement</span>
        </label>
      </div>
    </div>
  );
}