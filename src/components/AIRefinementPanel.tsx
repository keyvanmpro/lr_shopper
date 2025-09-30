import { useState } from 'react';
import { X, Sparkles, RotateCcw, Send, AlertCircle } from 'lucide-react';

interface ConversationEntry {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  hasResults?: boolean;
  actionChips?: Array<{
    id: string;
    label: string;
    action: () => void;
  }>;
}

interface AIRefinementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRefinement: (query: string) => void;
  onResetRefinement: () => void;
  resultCount?: number;
}

export default function AIRefinementPanel({ 
  isOpen, 
  onClose, 
  onApplyRefinement, 
  onResetRefinement,
  resultCount = 0
}: AIRefinementPanelProps) {
  const [refinementQuery, setRefinementQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementQuery.trim() || isProcessing) return;

    const userMessage = refinementQuery.trim();
    setIsProcessing(true);

    // Ajouter le message utilisateur
    const userEntry: ConversationEntry = {
      id: `user-${Date.now()}`,
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userEntry]);
    setRefinementQuery('');

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Appliquer les filtres
    onApplyRefinement(userMessage);

    // Attendre un peu pour que les filtres soient appliqués et le count mis à jour
    setTimeout(() => {
      // Simuler une réponse IA basée sur la requête
      const aiResponse = generateAIResponse(userMessage, resultCount);
      const aiEntry: ConversationEntry = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        hasResults: aiResponse.hasResults,
        actionChips: aiResponse.hasResults ? undefined : [
          {
            id: 'expand-colors',
            label: 'Élargir les couleurs',
            action: () => handleActionChip('couleurs similaires')
          },
          {
            id: 'increase-budget',
            label: 'Augmenter le budget',
            action: () => handleActionChip('budget plus élevé')
          },
          {
            id: 'remove-size',
            label: 'Assouplir la taille',
            action: () => handleActionChip('toutes les tailles')
          }
        ]
      };

      setConversation(prev => [...prev, aiEntry]);
      
      // Fermer le panneau automatiquement si des résultats sont trouvés
      if (aiResponse.hasResults) {
        setTimeout(() => {
          onClose();
        }, 1500); // Laisser le temps de lire la réponse
      }
    }, 500);
    
    setIsProcessing(false);
  };

  const handleActionChip = (action: string) => {
    setRefinementQuery(action);
  };

  const handleResetConversation = () => {
    setConversation([]);
    onResetRefinement();
  };

  const generateAIResponse = (query: string, count: number) => {
    const lowerQuery = query.toLowerCase();
    
    if (count === 0) {
      return {
        message: `Je n'ai trouvé aucun produit correspondant à "${query}". Essayons d'assouplir les critères :`,
        hasResults: false
      };
    } else if (count < 5) {
      return {
        message: `J'ai trouvé ${count} produit${count > 1 ? 's' : ''} pour "${query}". C'est peu, voulez-vous élargir la recherche ?`,
        hasResults: true
      };
    } else {
      return {
        message: `Parfait ! J'ai trouvé ${count} produits correspondant à "${query}". Les filtres ont été appliqués.`,
        hasResults: true
      };
    }
  };

  const suggestions = [
    "en bleu",
    "moins cher",
    "plus long",
    "avec capuche",
    "taille plus grande",
    "livraison rapide",
    "en coton",
    "style décontracté"
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-red-600" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Assistant IA</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetConversation}
                className="text-gray-400 hover:text-red-600 transition-colors text-xs sm:text-sm flex items-center space-x-1"
                title="Réinitialiser la conversation"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {conversation.length === 0 ? (
              <div className="text-center text-gray-500 py-4 sm:py-8">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Décrivez comment affiner votre recherche</p>
                <p className="text-xs text-gray-400 mt-1 px-2">Ex: "en bleu", "moins cher", "plus long"</p>
              </div>
            ) : (
              conversation.map(entry => (
                <div key={entry.id} className="space-y-2">
                  {entry.type === 'user' ? (
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Vous :</span>
                      <span className="ml-2 text-gray-700 break-words">{entry.message}</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3">
                        <div className="text-sm">
                          <span className="font-medium text-red-600 flex items-center space-x-1">
                            <Sparkles className="h-3 w-3" />
                            <span>IA :</span>
                          </span>
                          <p className="mt-1 text-gray-700 leading-relaxed break-words">{entry.message}</p>
                        </div>
                      </div>
                      
                      {/* Action Chips pour les cas sans résultats */}
                      {entry.actionChips && (
                        <div className="flex flex-wrap gap-2 pl-2 sm:pl-4">
                          {entry.actionChips.map(chip => (
                            <button
                              key={chip.id}
                              onClick={chip.action}
                              className="px-2 sm:px-3 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-full hover:bg-red-100 transition-colors"
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Processing indicator */}
            {isProcessing && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-600 border-t-transparent" />
                  <span>L'IA analyse votre demande...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="border-t border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Quick Suggestions */}
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setRefinementQuery(suggestion)}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors break-words"
                    disabled={isProcessing}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  value={refinementQuery}
                  onChange={(e) => setRefinementQuery(e.target.value)}
                  placeholder="Décrivez votre ajustement..."
                  className="w-full p-2 sm:p-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none text-sm"
                  rows={2}
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={!refinementQuery.trim() || isProcessing}
                  className={`absolute bottom-1 sm:bottom-2 right-1 sm:right-2 p-1 sm:p-1.5 rounded-md transition-colors ${
                    !refinementQuery.trim() || isProcessing
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}