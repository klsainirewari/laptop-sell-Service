import React, { useState } from 'react';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Catalog', href: BUSINESS_INFO.catalogLink, external: true },
    { name: 'AI Technician', href: '#tech-support' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">{BUSINESS_INFO.name}</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wider">SALES & SERVICE</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className="text-slate-600 hover:text-brand-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call to Action (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 text-slate-600 hover:text-brand-600 font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a 
              href={BUSINESS_INFO.catalogLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Store
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-600 hover:text-brand-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                target={link.external ? "_blank" : "_self"}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 px-3">
               <a 
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-2 rounded-lg font-medium"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a 
                href={BUSINESS_INFO.catalogLink}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-brand-600 text-white py-2 rounded-lg font-medium"
              >
                <ShoppingBag className="w-4 h-4" /> View Catalog
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};