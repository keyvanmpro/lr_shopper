import { useState } from 'react';
import { X, HelpCircle, RotateCcw } from 'lucide-react';
import { AISearchResult, RefinementChip } from '../types/Product';

interface AISearchBannerProps {
  aiResult: AISearchResult;
  onExitAIMode: () => void;
  onApplyRefinement: (chip: RefinementChip) => void;
}

export default function AISearchBanner({ aiResult, onExitAIMode, onApplyRefinement }: AISearchBannerProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4 mb-6">
      {/* Main banner */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-medium text-red-900">Recherche IA :</span>
            <span className="text-red-800">"{aiResult.query}"</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Pourquoi ces résultats ?</span>
            </button>
            <span className="text-red-400">•</span>
            <button
              onClick={onExitAIMode}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Voir résultats classiques</span>
            </button>
          </div>
        </div>
        <button
          onClick={onExitAIMode}
          className="text-red-400 hover:text-red-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-white rounded-md p-3 mb-3 border border-red-200">
          <h4 className="font-medium text-gray-900 mb-2">Analyse de votre recherche :</h4>
          <p className="text-sm text-gray-700">{aiResult.explanation}</p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs text-gray-500">Confiance :</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${aiResult.confidence * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{Math.round(aiResult.confidence * 100)}%</span>
          </div>
        </div>
      )}

      {/* Refinement chips */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-red-700 font-medium">Affiner :</span>
        {aiResult.refinementChips.map(chip => (
          <button
            key={chip.id}
            onClick={() => onApplyRefinement(chip)}
            className="px-3 py-1 bg-white text-red-700 border border-red-300 rounded-full text-sm hover:bg-red-50 hover:border-red-400 transition-colors"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}