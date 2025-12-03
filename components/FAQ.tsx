
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start max-w-5xl mx-auto">
          
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 mb-6">
              Find answers to common questions about our services, warranty, and repair process.
            </p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <HelpCircle className="w-8 h-8 text-brand-500 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Still have questions?</h4>
              <p className="text-sm text-slate-500 mb-4">Can't find the answer you're looking for? Chat with us.</p>
              <a href="#contact" className="text-brand-600 font-bold text-sm hover:underline">Contact Support</a>
            </div>
          </div>

          <div className="md:w-2/3 w-full space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-xl border transition-all ${openIndex === idx ? 'border-brand-500 shadow-md' : 'border-slate-200'}`}
              >
                <button 
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                >
                  <span className={`font-bold ${openIndex === idx ? 'text-brand-700' : 'text-slate-700'}`}>
                    {faq.question}
                  </span>
                  {openIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-brand-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                
                {openIndex === idx && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
