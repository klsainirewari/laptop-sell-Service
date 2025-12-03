import React, { useState, useRef } from 'react';
import { diagnoseDeviceProblem } from '../services/geminiService';
import { DeviceType, DiagnosisResponse } from '../types';
import { Bot, AlertTriangle, CheckCircle, Wrench, Loader2, Camera, Mic, X, Image as ImageIcon } from 'lucide-react';

export const VirtualTechnician: React.FC = () => {
  const [device, setDevice] = useState<DeviceType>(DeviceType.LAPTOP);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null); // Base64 string
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle Voice Input (Web Speech API)
  const toggleListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US'; // Or 'hi-IN' for Hindi mix
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
      alert("Your browser does not support voice input. Please type your problem.");
    }
  };

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Pass image if available
      const data = await diagnoseDeviceProblem(device, description, image || undefined);
      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Connection failed. Please check your internet.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-brand-600 rounded-full mb-4 shadow-lg shadow-brand-500/30">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Virtual Engineer</h2>
            <p className="text-slate-300 text-lg">
              Upload a photo of the error or describe it below. Our AI engineer will analyze it instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
              <form onSubmit={handleDiagnose} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Device Type</label>
                  <select 
                    value={device}
                    onChange={(e) => setDevice(e.target.value as DeviceType)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  >
                    {Object.values(DeviceType).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Problem Description</label>
                  <div className="relative">
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Type here or use the mic button to speak..."
                      className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                        isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      title="Speak to type"
                    >
                      <Mic className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Upload Photo (Optional)</label>
                  
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
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors w-full border border-slate-600 border-dashed"
                      >
                        <Camera className="w-4 h-4 text-brand-400" />
                        Click to Upload Error Photo
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-32 bg-slate-900 rounded-lg overflow-hidden border border-brand-500/50">
                      <img src={image} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors backdrop-blur-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-xs text-brand-200 backdrop-blur-sm">
                        <ImageIcon className="w-3 h-3" /> Image attached
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !description}
                  className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-5 h-5" /> Get AI Diagnosis
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 min-h-[300px] flex flex-col justify-center">
              {!result && !loading && !error && (
                <div className="text-center text-slate-500">
                  <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Upload a photo or describe the issue to start...</p>
                </div>
              )}

              {loading && (
                <div className="text-center space-y-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6 mx-auto"></div>
                  </div>
                  <p className="text-brand-400 text-sm">Processing image & symptoms...</p>
                </div>
              )}

              {error && (
                <div className="text-center text-red-400 animate-fade-in p-4 bg-red-900/20 rounded-xl border border-red-900/50">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-red-500" />
                  <p className="text-lg font-bold mb-1 text-red-200">Diagnosis Failed</p>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {result && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-bold text-xl text-white">Analysis Report</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      result.estimatedSeverity === 'High' ? 'bg-red-500/20 text-red-300' :
                      result.estimatedSeverity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      Severity: {result.estimatedSeverity}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-brand-400 font-semibold mb-1">Issue Overview</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{result.analysis}</p>
                  </div>

                  <div>
                    <h4 className="text-brand-400 font-semibold mb-1">Potential Causes</h4>
                    <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                      {result.potentialCauses.map((cause, i) => (
                        <li key={i}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-900/30 border border-brand-500/30 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-brand-400 font-semibold text-sm">Expert Recommendation</h4>
                        <p className="text-slate-200 text-sm mt-1">{result.recommendation}</p>
                      </div>
                    </div>
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
