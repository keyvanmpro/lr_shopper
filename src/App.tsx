import { useState } from 'react';
import { Product } from './types/Product';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ProductListPage from './components/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage';

type Page = 'home' | 'products' | 'product-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [aiSearchQuery, setAiSearchQuery] = useState<string>('');

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
    setAiSearchQuery('');
  };

  const handleNavigateProducts = () => {
    setCurrentPage('products');
    setSelectedProduct(null);
    setAiSearchQuery('');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleAISearch = (query: string) => {
    setAiSearchQuery(query);
    setCurrentPage('products');
    setSelectedProduct(null);
  };

  const handleExitAIMode = () => {
    setAiSearchQuery('');
    setCurrentPage('products'); // Recharger la PLP en mode classique
  };

  const handleAddToCart = (product: Product, size: string, color: string) => {
    const newItem = {
      id: `${product.id}-${size}-${color}`,
      product,
      size,
      color,
      quantity: 1
    };
    setCartItems(prev => [...prev, newItem]);
    // Show success message or redirect
    alert('Produit ajouté au panier !');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigateProducts={handleNavigateProducts} />;
      case 'products':
        return (
          <ProductListPage 
            onProductSelect={handleProductSelect}
            aiQuery={aiSearchQuery}
            onExitAIMode={handleExitAIMode}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            onBack={handleNavigateProducts}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      default:
        return <Homepage onNavigateProducts={handleNavigateProducts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigateHome={handleNavigateHome}
        onNavigateProducts={handleNavigateProducts}
        onAISearch={handleAISearch}
        cartCount={cartItems.length}
        hasActiveAISearch={!!aiSearchQuery}
        onExitAIMode={handleExitAIMode}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;