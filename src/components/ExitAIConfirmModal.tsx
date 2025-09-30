interface ExitAIConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitAIConfirmModal({ onConfirm, onCancel }: ExitAIConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quitter la recherche IA ?
        </h3>
        <p className="text-gray-600 mb-6">
          Vous allez quitter la recherche IA et perdre les résultats personnalisés.
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Oui, revenir
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}