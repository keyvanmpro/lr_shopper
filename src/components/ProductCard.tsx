import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <div 
      onClick={() => onProductClick(product)}
      className="bg-white hover:shadow-lg transition-all cursor-pointer group animate-fadeIn relative"
    >
      {/* Heart icon */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all">
        <svg className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 text-lg">{product.price.toFixed(2)} €</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-xs text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex space-x-1">
            {product.fastDelivery && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                24h
              </span>
            )}
            {!product.inStock && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}