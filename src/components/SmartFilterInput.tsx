import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SmartFilterInputProps {
  onSmartFilter: (query: string) => void;
}

export default function SmartFilterInput({ onSmartFilter }: SmartFilterInputProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onSmartFilter(query.trim());
    setQuery('');
    setIsProcessing(false);
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-medium text-blue-900">Smart Filter</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Décrivez ce que vous cherchez… (ex : chemise lin blanche M <60€)"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isProcessing}
          />
          {isProcessing && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
            </div>
          )}
        </div>
      </form>
      
      <p className="text-xs text-gray-600 mt-2">
        Décrivez librement vos critères et nous remplirons automatiquement les filtres correspondants
      </p>
    </div>
  );
}