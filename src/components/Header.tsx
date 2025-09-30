import { useState } from 'react';
import { Search, User, ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
  onAISearch: (query: string) => void;
  cartCount: number;
  hasActiveAISearch?: boolean;
  onExitAIMode?: () => void;
}

export default function Header({ 
  onNavigateHome, 
  onNavigateProducts, 
  onAISearch, 
  cartCount, 
  hasActiveAISearch = false,
  onExitAIMode 
}: HeaderProps) {
  const [isAIMode, setIsAIMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (isAIMode) {
        onAISearch(searchQuery.trim());
      } else {
        // Recherche classique (à implémenter si nécessaire)
        onNavigateProducts();
      }
      setIsSearchExpanded(false);
    }
  };

  const handleToggleAI = () => {
    if (isAIMode && hasActiveAISearch) {
      // Si l'IA est active et qu'il y a une recherche en cours, demander confirmation
      setShowExitConfirm(true);
    } else {
      // Sinon, basculer directement
      setIsAIMode(!isAIMode);
    }
  };

  const confirmExitAI = () => {
    setIsAIMode(false);
    setShowExitConfirm(false);
    if (onExitAIMode) {
      onExitAIMode();
    }
  };

  const cancelExitAI = () => {
    setShowExitConfirm(false);
    // Le toggle reste activé
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={`flex items-center transition-all duration-300 ${isSearchExpanded ? 'md:flex hidden' : 'flex'}`}>
            <button 
              onClick={onNavigateHome}
              className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              LaRedoute
            </button>
          </div>

          {/* Navigation */}
          <nav className={`hidden md:flex space-x-8 transition-all duration-300 ${isSearchExpanded ? 'lg:flex hidden' : 'md:flex'}`}>
            <button 
              onClick={onNavigateHome}
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Accueil
            </button>
            <button 
              onClick={onNavigateProducts}
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Femme
            </button>
            <button 
              onClick={onNavigateProducts}
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Homme
            </button>
            <button 
              onClick={onNavigateProducts}
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Chaussures
            </button>
          </nav>

          {/* Search Bar */}
          <div className={`transition-all duration-300 ${
            isSearchExpanded 
              ? 'fixed inset-x-4 top-4 z-50 bg-white rounded-lg shadow-lg p-2' 
              : 'flex-1 max-w-lg mx-2 sm:mx-8'
          }`}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder={
                    isAIMode 
                      ? "Décrivez ce que vous cherchez (ex. jean Levi's 501 blanc, T42)"
                      : "Recherchez un produit…"
                  }
                  className={`w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${
                    isAIMode ? 'border-red-300 bg-red-50' : ''
                  } ${
                    isSearchExpanded ? 'text-base' : 'text-sm sm:text-base'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleToggleAI}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                    isAIMode 
                      ? 'text-red-600' 
                      : 'text-gray-400 hover:text-red-600'
                  }`}
                  title={isAIMode ? 'Désactiver la recherche IA' : 'Activer la recherche IA'}
                >
                  <Sparkles className={`h-4 w-4 transition-all ${isAIMode ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </form>
            {/* Overlay pour fermer la recherche étendue */}
            {isSearchExpanded && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-20 -z-10"
                onClick={() => setIsSearchExpanded(false)}
              />
            )}
          </div>

          {/* Icons */}
          <div className={`flex items-center space-x-2 sm:space-x-4 transition-all duration-300 ${isSearchExpanded ? 'md:flex hidden' : 'flex'}`}>
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors relative">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showExitConfirm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quitter la recherche IA ?
              </h3>
              <p className="text-gray-600 mb-6">
                Vous allez quitter la recherche IA et perdre vos résultats personnalisés.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={confirmExitAI}
                  className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Oui, revenir
                </button>
                <button
                  onClick={cancelExitAI}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}