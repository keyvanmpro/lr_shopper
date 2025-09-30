import { AmbiguityChoice } from '../types/Product';

interface AmbiguityModalProps {
  query: string;
  choices: AmbiguityChoice[];
  onChoiceSelect: (choice: AmbiguityChoice) => void;
  onClose: () => void;
}

export default function AmbiguityModal({ query, choices, onChoiceSelect, onClose }: AmbiguityModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Précisez votre recherche
        </h3>
        <p className="text-gray-600 mb-6">
          Votre recherche "<span className="font-medium">{query}</span>" peut correspondre à plusieurs catégories. 
          Que cherchez-vous exactement ?
        </p>
        
        <div className="space-y-3">
          {choices.map(choice => (
            <button
              key={choice.id}
              onClick={() => onChoiceSelect(choice)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">{choice.label}</div>
              <div className="text-sm text-gray-600">{choice.description}</div>
            </button>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}