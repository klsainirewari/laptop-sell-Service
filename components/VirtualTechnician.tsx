import React, { useState, useRef } from 'react';
import { diagnoseDeviceProblem, recommendLaptop, estimateExchangeValue } from '../services/geminiService';
import { DeviceType, DiagnosisResponse, ShoppingResponse, ExchangeResponse, AIMode } from '../types';
import { BUSINESS_INFO } from '../constants';
import { Bot, AlertTriangle, CheckCircle, Wrench, Loader2, Camera, Mic, X, Image as ImageIcon, ShoppingBag, Send, RefreshCcw, Banknote } from 'lucide-react';

export const VirtualTechnician: React.FC = () => {
  const [mode, setMode] = useState<AIMode>(AIMode.DIAGNOSIS);
  const [device, setDevice] = useState<DeviceType>(DeviceType.LAPTOP);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Results
  const [diagResult, setDiagResult] = useState<DiagnosisResponse | null>(null);
  const [shopResult, setShopResult] = useState<ShoppingResponse | null>(null);
  const [exchangeResult, setExchangeResult] = useState<ExchangeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setDescription('');
    setImage(null);
    setDiagResult(null);
    setShopResult(null);
    setExchangeResult(null);
    setError(null);
  };

  const handleModeSwitch = (newMode: AIMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setDescription((prev) => prev + " " + transcript);
      };
      recognition.start();
    } else {
      alert("Browser does not support voice input.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setDiagResult(null);
    setShopResult(null);
    setExchangeResult(null);

    try {
      if (mode === AIMode.DIAGNOSIS) {
        const data = await diagnoseDeviceProblem(device, description, image || undefined);
        setDiagResult(data);
      } else if (mode === AIMode.SHOPPING) {
        const data = await recommendLaptop(description);
        setShopResult(data);
      } else if (mode === AIMode.EXCHANGE) {
        const data = await estimateExchangeValue(description);
        setExchangeResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    let message = "";
    if (mode === AIMode.DIAGNOSIS && diagResult) {
      message = `*Hi Khusboo Electric, Need Repair Help*%0A%0A*Problem:* ${description}%0A*AI Analysis:* ${diagResult.analysis}%0A*Likely Cause:* ${diagResult.potentialCauses.join(', ')}%0A*Severity:* ${diagResult.estimatedSeverity}`;
    } else if (mode === AIMode.SHOPPING && shopResult) {
      message = `*Hi Khusboo Electric, I want to buy a Laptop*%0A%0A*My Usage:* ${description}%0A*AI Recommended:* ${shopResult.recommendedModel}%0A*Budget:* ${shopResult.estimatedBudget}%0A*Please share photos/details.*`;
    } else if (mode === AIMode.EXCHANGE && exchangeResult) {
      message = `*Hi Khusboo Electric, I want to Sell my Old Laptop*%0A%0A*My Laptop:* ${description}%0A*AI Valuation:* ${exchangeResult.estimatedValueRange}%0A*I want to schedule a physical check.*`;
    }
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="tech-support" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-brand-600 rounded-full mb-4 shadow-lg shadow-brand-500/30">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">AI Smart Assistant</h2>
            <p className="text-slate-300">
              {mode === AIMode.DIAGNOSIS && "Describe your fault or upload a photo for instant analysis."}
              {mode === AIMode.SHOPPING && "Tell us your needs, and we'll suggest the best laptop."}
              {mode === AIMode.EXCHANGE && "Get an instant price estimate for your old laptop."}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex whitespace-nowrap">
              <button
                onClick={() => handleModeSwitch(AIMode.DIAGNOSIS)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium transition-all ${
                  mode === AIMode.DIAGNOSIS 
                  ? 'bg-brand-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4" /> Repair
              </button>
              <button
                onClick={() => handleModeSwitch(AIMode.SHOPPING)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium transition-all ${
                  mode === AIMode.SHOPPING 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Buy
              </button>
              <button
                onClick={() => handleModeSwitch(AIMode.EXCHANGE)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium transition-all ${
                  mode === AIMode.EXCHANGE 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                <Banknote className="w-4 h-4" /> Sell Old
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === AIMode.DIAGNOSIS && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Device</label>
                    <select 
                      value={device}
                      onChange={(e) => setDevice(e.target.value as DeviceType)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    >
                      {Object.values(DeviceType).map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {mode === AIMode.DIAGNOSIS && "Describe Problem"}
                    {mode === AIMode.SHOPPING && "Describe Your Needs"}
                    {mode === AIMode.EXCHANGE && "Laptop Details (Model, Specs, Condition)"}
                  </label>
                  <div className="relative">
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={
                        mode === AIMode.DIAGNOSIS ? "e.g., Screen flickering, battery not charging..." :
                        mode === AIMode.SHOPPING ? "e.g., Student needs laptop under 20k for coding..." :
                        "e.g., Dell Latitude i5 6th gen, 8GB RAM, Battery gives 1hr backup, slight scratch on lid..."
                      }
                      className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-brand-500 resize-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                        isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    >
                      <Mic className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Image Upload (Only for Diagnosis) */}
                {mode === AIMode.DIAGNOSIS && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Photo (Optional)</label>
                    {!image ? (
                      <div className="flex items-center gap-3">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm w-full border border-slate-600 border-dashed transition-colors"
                        >
                          <Camera className="w-4 h-4 text-brand-400" /> Upload
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full h-32 bg-slate-900 rounded-lg overflow-hidden border border-brand-500/50">
                        <img src={image} alt="Preview" className="w-full h-full object-contain" />
                        <button 
                          type="button" onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 rounded-full text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading || !description}
                  className={`w-full text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4 ${
                    mode === AIMode.DIAGNOSIS ? 'bg-brand-600 hover:bg-brand-700' : 
                    mode === AIMode.SHOPPING ? 'bg-green-600 hover:bg-green-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> AI Thinking...</>
                  ) : (
                    mode === AIMode.DIAGNOSIS ? <><Wrench className="w-5 h-5" /> Diagnose Issue</> : 
                    mode === AIMode.SHOPPING ? <><ShoppingBag className="w-5 h-5" /> Find Best Laptop</> :
                    <><Banknote className="w-5 h-5" /> Get Price Estimate</>
                  )}
                </button>
              </form>
            </div>

            {/* Output Display */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 min-h-[300px] flex flex-col">
              {!diagResult && !shopResult && !exchangeResult && !loading && !error && (
                <div className="flex-grow flex flex-col items-center justify-center text-slate-500 text-center">
                  {mode === AIMode.DIAGNOSIS && <Wrench className="w-16 h-16 mb-4 opacity-20" />}
                  {mode === AIMode.SHOPPING && <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />}
                  {mode === AIMode.EXCHANGE && <Banknote className="w-16 h-16 mb-4 opacity-20" />}
                  <p>Results will appear here...</p>
                </div>
              )}

              {loading && (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                  <div className="animate-pulse space-y-3 w-full">
                    <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
                  </div>
                  <p className="text-brand-400 text-sm">Consulting AI Expert...</p>
                </div>
              )}

              {error && (
                <div className="flex-grow flex flex-col items-center justify-center text-center text-red-400 p-4">
                  <AlertTriangle className="w-10 h-10 mb-3 text-red-500" />
                  <p className="font-bold">Error</p>
                  <p className="text-sm">{error}</p>
                  <button onClick={resetForm} className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                    <RefreshCcw className="w-3 h-3" /> Try Again
                  </button>
                </div>
              )}

              {/* Diagnosis Result */}
              {diagResult && mode === AIMode.DIAGNOSIS && (
                <div className="animate-fade-in space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-bold text-xl text-white">Diagnosis Report</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      diagResult.estimatedSeverity === 'High' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                    }`}>
                      {diagResult.estimatedSeverity} Severity
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{diagResult.analysis}</p>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <h4 className="text-brand-400 text-xs font-bold uppercase mb-2">Recommended Action</h4>
                    <p className="text-white text-sm">{diagResult.recommendation}</p>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <button 
                      onClick={sendToWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20"
                    >
                      <Send className="w-5 h-5" /> Send to Technician on WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {/* Shopping Result */}
              {shopResult && mode === AIMode.SHOPPING && (
                <div className="animate-fade-in space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-bold text-xl text-white">Top Recommendation</h3>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  
                  <div className="text-center py-2">
                    <h2 className="text-2xl font-bold text-brand-400">{shopResult.recommendedModel}</h2>
                    <p className="text-slate-400 text-sm mt-1">{shopResult.estimatedBudget}</p>
                  </div>

                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <h4 className="text-green-400 text-xs font-bold uppercase mb-2">Why this model?</h4>
                    <p className="text-white text-sm leading-relaxed">{shopResult.reason}</p>
                  </div>

                  <div>
                     <h4 className="text-slate-400 text-xs font-bold uppercase mb-1">Key Specs for You:</h4>
                     <div className="flex flex-wrap gap-2">
                        {shopResult.technicalSpecsNeeded.map((spec, i) => (
                           <span key={i} className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-200">{spec}</span>
                        ))}
                     </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <button 
                      onClick={sendToWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20"
                    >
                      <Send className="w-5 h-5" /> Buy / Inquiry on WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {/* Exchange Result (NEW) */}
              {exchangeResult && mode === AIMode.EXCHANGE && (
                <div className="animate-fade-in space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-bold text-xl text-white">Valuation Estimate</h3>
                    <Banknote className="w-5 h-5 text-purple-400" />
                  </div>
                  
                  <div className="text-center py-4 bg-slate-900 rounded-lg border border-purple-500/30">
                    <p className="text-xs text-purple-300 uppercase mb-1">Estimated Value</p>
                    <h2 className="text-3xl font-bold text-white">{exchangeResult.estimatedValueRange}</h2>
                  </div>

                  <p className="text-slate-300 text-sm">{exchangeResult.marketAnalysis}</p>

                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <h4 className="text-red-400 text-xs font-bold uppercase mb-2">Potential Deductions</h4>
                    <ul className="list-disc list-inside text-sm text-slate-300">
                      {exchangeResult.deductionFactors.map((factor, i) => (
                        <li key={i}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4">
                    <button 
                      onClick={sendToWhatsApp}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-900/20"
                    >
                      <Send className="w-5 h-5" /> Sell Now via WhatsApp
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-2">Subject to physical verification</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
