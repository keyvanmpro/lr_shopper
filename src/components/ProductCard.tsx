import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <div 
      onClick={() => onProductClick(product)}
      className="bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fadeIn relative rounded-lg overflow-hidden border border-gray-100"
    >
      {/* Heart icon */}
      <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200">
        <svg className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="p-5">
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight hover:text-red-600 transition-colors">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 text-xl">{product.price.toFixed(2)} €</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-xs text-gray-700 font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex space-x-1">
            {product.fastDelivery && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                24h
              </span>
            )}
            {!product.inStock && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full border border-red-200">
                Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}