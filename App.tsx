
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CatalogPreview } from './components/CatalogPreview';
import { Testimonials } from './components/Testimonials';
import { VirtualTechnician } from './components/VirtualTechnician';
import { SocialFeed } from './components/SocialFeed';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RepairStatus } from './components/RepairStatus';
import { FAQ } from './components/FAQ';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <RepairStatus />
        <CatalogPreview />
        <VirtualTechnician />
        <FAQ />
        <Testimonials />
        <SocialFeed />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
