import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Customizer } from './pages/Customizer';
import { Store } from './pages/Store';
import { ProductDetails } from './pages/ProductDetails';
import { FAQ } from './pages/FAQ';
import { DesignHub } from './pages/DesignHub';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Warranty } from './pages/Warranty';
import { CartSidebar } from './components/CartSidebar';
import { CartItem } from './types';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleViewProduct = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product-details');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} onViewProduct={handleViewProduct} />;
      case 'customizer':
        return <Customizer onAddToCart={addToCart} />;
      case 'design-hub':
        return <DesignHub onAddToCart={addToCart} />;
      case 'store':
        return <Store onAddToCart={addToCart} onViewProduct={handleViewProduct} />;
      case 'faq':
        return <FAQ />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      case 'warranty':
        return <Warranty />;
      case 'product-details':
        return (
          <ProductDetails 
            productId={selectedProductId || ''} 
            onAddToCart={addToCart} 
            onBack={() => setActivePage('store')} 
          />
        );
      default:
        return <Home onNavigate={setActivePage} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <Layout 
      activePage={activePage} 
      onNavigate={(page) => {
        setActivePage(page);
        window.scrollTo(0, 0);
      }} 
      cart={cart} 
      setIsCartOpen={setIsCartOpen}
    >
      {renderPage()}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />
    </Layout>
  );
}

export default App;