import { useState } from 'react';
import { ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductDetailPage({ product, onBack, onAddToCart }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      onAddToCart(product, selectedSize, selectedColor);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-red-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux produits
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toFixed(2)} €
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} avis)</span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Couleur: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-red-600 text-red-600 bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Taille</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-red-600 text-red-600 bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quantité</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:border-gray-400"
                >
                  -
                </button>
                <span className="px-4 py-1 border border-gray-300 rounded-md min-w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !product.inStock}
              className={`w-full py-3 px-6 rounded-md font-semibold transition-colors ${
                !selectedSize || !product.inStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {!product.inStock 
                ? 'Rupture de stock' 
                : !selectedSize 
                  ? 'Sélectionnez une taille'
                  : 'Ajouter au panier'
              }
            </button>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Livraison</p>
                <p className="text-xs text-gray-600">
                  {product.fastDelivery ? '24h chrono' : 'Standard'}
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Retours</p>
                <p className="text-xs text-gray-600">30 jours gratuits</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Garantie</p>
                <p className="text-xs text-gray-600">Qualité assurée</p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t">
              <h3 className="font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}