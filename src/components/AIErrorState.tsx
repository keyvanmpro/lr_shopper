import { AlertTriangle, RotateCcw, Search } from 'lucide-react';

interface AIErrorStateProps {
  type: 'error' | 'off-topic';
  onRetry?: () => void;
  onClassicSearch: () => void;
}

export default function AIErrorState({ type, onRetry, onClassicSearch }: AIErrorStateProps) {
  if (type === 'off-topic') {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-orange-900 mb-2">
              Recherche hors sujet
            </h3>
            <p className="text-orange-800 mb-4">
              Je peux vous aider à trouver des produits. Pour le reste, utilisez la recherche classique ou le service client.
            </p>
            <button
              onClick={onClassicSearch}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Recherche classique</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-red-900 mb-2">
            Erreur de compréhension
          </h3>
          <p className="text-red-800 mb-4">
            Je n'ai pas pu utiliser la recherche IA pour le moment.
          </p>
          <div className="flex space-x-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Réessayer</span>
              </button>
            )}
            <button
              onClick={onClassicSearch}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Voir résultats classiques</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}