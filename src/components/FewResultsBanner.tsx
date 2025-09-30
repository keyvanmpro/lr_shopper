import { TrendingUp, Palette } from 'lucide-react';

interface FewResultsBannerProps {
  count: number;
  onElargiCouleurs: () => void;
  onAugmenteBudget: () => void;
}

export default function FewResultsBanner({ count, onElargiCouleurs, onAugmenteBudget }: FewResultsBannerProps) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-900">
            Seulement {count} produit{count > 1 ? 's' : ''} trouvé{count > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onElargiCouleurs}
            className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors"
          >
            <Palette className="h-3 w-3" />
            <span>Couleurs voisines</span>
          </button>
          <button
            onClick={onAugmenteBudget}
            className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors"
          >
            <TrendingUp className="h-3 w-3" />
            <span>Budget +20%</span>
          </button>
        </div>
      </div>
    </div>
  );
}