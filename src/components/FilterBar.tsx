import { useState } from 'react';
import { ChevronDown, Filter, Sparkles } from 'lucide-react';
import { Filters } from '../types/Product';
import SmartFilterInput from './SmartFilterInput';

interface FilterBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  highlightedFilters?: string[];
  onSmartFilter: (query: string) => void;
  showSmartFilter?: boolean;
}

export default function FilterBar({ 
  filters, 
  onFiltersChange, 
  highlightedFilters = [],
  onSmartFilter,
  showSmartFilter = true
}: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const getActiveFiltersCount = () => {
    return filters.brands.length + filters.colors.length + filters.sizes.length + 
           (filters.fastDeliveryOnly ? 1 : 0) + (filters.inStockOnly ? 1 : 0) +
           (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Trier */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sort')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-gray-400 transition-colors"
            >
              <span>Trier</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'sort' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Pertinence</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Prix croissant</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Prix décroissant</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Nouveautés</button>
                </div>
              </div>
            )}
          </div>

          {/* Marque */}
          <div className={`relative transition-all duration-500 ${
            highlightedFilters.includes('brands') ? 'bg-yellow-100 rounded-full' : ''
          }`}>
            <button
              onClick={() => toggleDropdown('brands')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                filters.brands.length > 0 
                  ? 'border-red-600 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>Marque</span>
              {filters.brands.length > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {filters.brands.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'brands' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2 max-h-64 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-3"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Couleur */}
          <div className={`relative transition-all duration-500 ${
            highlightedFilters.includes('colors') ? 'bg-yellow-100 rounded-full' : ''
          }`}>
            <button
              onClick={() => toggleDropdown('colors')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                filters.colors.length > 0 
                  ? 'border-red-600 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>Couleur</span>
              {filters.colors.length > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {filters.colors.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'colors' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2 max-h-64 overflow-y-auto">
                  {colors.map(color => (
                    <label key={color} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={() => handleColorChange(color)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-3"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Taille */}
          <div className={`relative transition-all duration-500 ${
            highlightedFilters.includes('sizes') ? 'bg-yellow-100 rounded-full' : ''
          }`}>
            <button
              onClick={() => toggleDropdown('sizes')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                filters.sizes.length > 0 
                  ? 'border-red-600 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>Taille</span>
              {filters.sizes.length > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {filters.sizes.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'sizes' && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 px-4">
                    {sizes.map(size => (
                      <label key={size} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prix */}
          <div className={`relative transition-all duration-500 ${
            highlightedFilters.includes('price') ? 'bg-yellow-100 rounded-full' : ''
          }`}>
            <button
              onClick={() => toggleDropdown('price')}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                filters.priceRange[0] > 0 || filters.priceRange[1] < 1000
                  ? 'border-red-600 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>Prix</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0] || ''}
                      onChange={(e) => onFiltersChange({ 
                        ...filters, 
                        priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                      })}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1] === 1000 ? '' : filters.priceRange[1]}
                      onChange={(e) => onFiltersChange({ 
                        ...filters, 
                        priceRange: [filters.priceRange[0], parseInt(e.target.value) || 1000] 
                      })}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-500">€</span>
                  </div>
                  <div className="space-y-2">
                    <button 
                      onClick={() => onFiltersChange({ ...filters, priceRange: [0, 50] })}
                      className="block w-full text-left text-sm hover:bg-gray-50 py-1"
                    >
                      Moins de 50€
                    </button>
                    <button 
                      onClick={() => onFiltersChange({ ...filters, priceRange: [50, 100] })}
                      className="block w-full text-left text-sm hover:bg-gray-50 py-1"
                    >
                      50€ - 100€
                    </button>
                    <button 
                      onClick={() => onFiltersChange({ ...filters, priceRange: [100, 200] })}
                      className="block w-full text-left text-sm hover:bg-gray-50 py-1"
                    >
                      100€ - 200€
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Livraison */}
          <div className={`relative transition-all duration-500 ${
            highlightedFilters.includes('delivery') ? 'bg-yellow-100 rounded-full' : ''
          }`}>
            <button
              onClick={() => onFiltersChange({ ...filters, fastDeliveryOnly: !filters.fastDeliveryOnly })}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                filters.fastDeliveryOnly 
                  ? 'border-red-600 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span>Livraison rapide</span>
            </button>
          </div>

          {/* Smart Filter */}
          <button 
            onClick={() => onSmartFilter('OPEN_SMART_FILTER_MODAL')}
            className="flex items-center space-x-2 px-4 py-2 border border-blue-300 rounded-full text-sm font-medium hover:border-blue-400 transition-colors bg-blue-50 text-blue-700"
          >
            <Sparkles className="h-4 w-4" />
            <span>Smart Filter</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Plus de filtres</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}