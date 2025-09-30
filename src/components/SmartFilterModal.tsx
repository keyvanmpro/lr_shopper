import { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';

interface SmartFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (query: string) => void;
}

export default function SmartFilterModal({ isOpen, onClose, onApplyFilter }: SmartFilterModalProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onApplyFilter(query.trim());
    setQuery('');
    setIsProcessing(false);
    onClose();
  };

  const suggestions = [
    "chemise lin blanche M <60€",
    "jean bleu T40 livraison rapide",
    "robe rouge Anne Weyburn",
    "chaussures noires 38-40",
    "pull gris moins de 80€",
    "veste marine taille L"
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Smart Filter</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              Décrivez ce que vous cherchez et nous appliquerons automatiquement les filtres correspondants.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: chemise lin blanche M <60€, jean bleu livraison rapide..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  disabled={isProcessing}
                />
              </div>
              
              <button
                type="submit"
                disabled={!query.trim() || isProcessing}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                  !query.trim() || isProcessing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Analyse en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Appliquer les filtres</span>
                  </>
                )}
              </button>
            </form>

            {/* Suggestions */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Exemples :</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="block w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    disabled={isProcessing}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}