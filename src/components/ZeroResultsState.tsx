import { RefreshCw, DollarSign, Palette } from 'lucide-react';

interface ZeroResultsStateProps {
  onAssouplirCouleur: () => void;
  onAugmenterBudget: () => void;
  onVoirTaillesProches: () => void;
}

export default function ZeroResultsState({ 
  onAssouplirCouleur, 
  onAugmenterBudget, 
  onVoirTaillesProches 
}: ZeroResultsStateProps) {
  return (
    <div className="text-center py-16 bg-white rounded-lg border border-gray-200 mx-4">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-gray-600 mb-8">
          Essayez d'assouplir vos critères pour voir plus de résultats
        </p>
      </div>

      <div className="space-y-3 max-w-sm mx-auto">
        <button
          onClick={onAssouplirCouleur}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Palette className="h-5 w-5" />
          <span>Assouplir la couleur</span>
        </button>
        
        <button
          onClick={onAugmenterBudget}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <DollarSign className="h-5 w-5" />
          <span>Augmenter le budget</span>
        </button>
        
        <button
          onClick={onVoirTaillesProches}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Voir tailles proches</span>
        </button>
      </div>
    </div>
  );
}