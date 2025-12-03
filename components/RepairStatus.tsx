
import React, { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export const RepairStatus: React.FC = () => {
  const [mobile, setMobile] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return;
    
    // Redirect to WhatsApp with a pre-filled message
    const message = `Hi Khusboo Electric, I want to check the repair status for mobile number: ${mobile}`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-12 bg-brand-600">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Check Repair Status</h3>
            <p className="text-slate-500">
              Submitted your laptop for repair? Enter your mobile number to get an instant status update via WhatsApp.
            </p>
          </div>
          
          <form onSubmit={handleCheck} className="flex-1 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="tel" 
                  placeholder="Enter Mobile Number" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-5 h-5" /> Check Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
