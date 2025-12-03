import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CatalogPreview } from './components/CatalogPreview';
import { VirtualTechnician } from './components/VirtualTechnician';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <CatalogPreview />
        <VirtualTechnician />
      </main>
      <Footer />
    </div>
  );
};

export default App;