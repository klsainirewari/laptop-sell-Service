import React from 'react';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need for Your Laptop
          </p>
          <p className="mt-4 text-xl text-slate-500">
            From buying affordable premium business laptops to fixing complex hardware issues, we have you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors shrink-0">
                <service.icon className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              
              <p className="text-slate-500 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {service.details && (
                <ul className="space-y-3 pt-6 border-t border-slate-100">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                      <span className="leading-tight">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};