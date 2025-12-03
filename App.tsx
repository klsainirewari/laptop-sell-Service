import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CatalogPreview } from './components/CatalogPreview';
import { VirtualTechnician } from './components/VirtualTechnician';
import { SocialFeed } from './components/SocialFeed';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <CatalogPreview />
        <SocialFeed />
        <VirtualTechnician />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
