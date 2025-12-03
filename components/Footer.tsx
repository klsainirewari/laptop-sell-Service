import React from 'react';
import { BUSINESS_INFO } from '../constants';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{BUSINESS_INFO.name}</h3>
            <p className="mb-6 text-slate-400 leading-relaxed">
              {BUSINESS_INFO.tagline}. With over {BUSINESS_INFO.experience} of experience, 
              we ensure your devices are in the safest hands.
            </p>
            <div className="flex gap-4">
               <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors">
                 <MessageCircle className="w-5 h-5" />
               </a>
               <a href={`mailto:${BUSINESS_INFO.email}`} className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
                 <Mail className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-1" />
                <a 
                  href={BUSINESS_INFO.mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline text-left leading-relaxed"
                >
                  {BUSINESS_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white transition-colors">{BUSINESS_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">{BUSINESS_INFO.email}</a>
              </li>
            </ul>
          </div>

          {/* Owner Info */}
          <div>
             <h4 className="text-white font-bold text-lg mb-6">Business Hours</h4>
             <p className="mb-2">Open 6 Days a Week</p>
             <p className="text-slate-400">Monday - Saturday: 10:00 AM - 8:00 PM</p>
             <p className="text-slate-400 mb-6">Sunday: Closed</p>
             
             <div className="border-t border-slate-700 pt-6">
                 <p className="text-sm font-semibold text-white">Proprietor</p>
                 <p className="text-brand-400">{BUSINESS_INFO.owner}</p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};