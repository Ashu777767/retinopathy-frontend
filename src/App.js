import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Camera, 
  Upload, 
  ShieldCheck, 
  AlertCircle, 
  Activity, 
  Eye, 
  ChevronRight, 
  RefreshCw, 
  Stethoscope,
  VideoOff
} from 'lucide-react';

// --- Constants & Configuration ---
const API_ENDPOINT = "https://ashutoh12-retinopathy-backend.hf.space/predict";
const STAGES = [
  { id: 'No_DR', label: 'No Diabetic Retinopathy', color: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', risk: 'Low', desc: 'No clinical signs of retinopathy detected in the retina.', action: 'Annual routine screening recommended.' },
  { id: 'Mild', label: 'Mild NPDR', color: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-200', risk: 'Moderate', desc: 'Microaneurysms only. Small areas of swelling in blood vessels.', action: 'Monitor blood sugar and regular check-ups.' },
  { id: 'Moderate', label: 'Moderate NPDR', color: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', risk: 'Elevated', desc: 'Blood vessels that nourish the retina may swell and distort.', action: 'Consult an ophthalmologist within 3-6 months.' },
  { id: 'Severe', label: 'Severe NPDR', color: 'bg-red-500', text: 'text-red-600', border: 'border-red-200', risk: 'High', desc: 'Many blood vessels are blocked, depriving retina of blood supply.', action: 'Immediate specialist consultation required.' },
  { id: 'Proliferative_DR', label: 'Proliferative DR', color: 'bg-red-900', text: 'text-red-900', border: 'border-red-400', risk: 'Critical', desc: 'Advanced stage where new, fragile blood vessels grow in the retina.', action: 'Urgent medical intervention to prevent vision loss.' }
];

const getStageInfo = (id) => STAGES.find(s => s.id === id) || STAGES[0];

// --- Sub-Components ---

const HeroSection = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 py-16 px-6 text-white text-center rounded-b-[3rem] shadow-2xl mb-12">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
    </div>
    <div className="relative z-10 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
          <Activity size={48} className="text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
        AI Diabetic Retinopathy Detection
      </h1>
      <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light">
        Advanced deep learning-based retinal image classification to identify severity stages in real-time.
      </p>
    </div>
  </div>
);

const ResultCard = ({ result, loading }) => {
  if (loading) return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-lg border border-blue-100 flex flex-col items-center animate-pulse mt-8">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-64 bg-gray-100 rounded mb-8"></div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 w-1/2"></div>
      </div>
    </div>
  );

  if (!result) return null;

  const stage = getStageInfo(result.class);
  const confidence = (result.confidence * 100).toFixed(2);

  return (
    <div className={`w-full max-w-xl mx-auto p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-xl border-2 ${stage.border} transform transition-all hover:scale-[1.02] duration-300 mt-8`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Analysis Result</span>
          <h3 className={`text-3xl font-bold ${stage.text} mt-1`}>{stage.label}</h3>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Confidence</span>
          <p className="text-3xl font-mono font-bold text-blue-600 mt-1">{confidence}%</p>
        </div>
      </div>

      <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-6 shadow-inner">
        <div 
          className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${stage.color}`}
          style={{ width: `${confidence}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 uppercase mb-1">Risk Level</p>
          <p className={`font-bold ${stage.text}`}>{stage.risk}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 uppercase mb-1">Recommendation</p>
          <p className="text-sm text-gray-700 leading-tight">{stage.action}</p>
        </div>
      </div>
    </div>
  );
};

const UploadSection = ({ onPredict, loading, result, onClear }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = () => {
    if (file) onPredict(file);
  };

  const clearInput = () => {
    setFile(null);
    setPreview(null);
    onClear();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100 mb-8">
        <label className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-200 rounded-2xl cursor-pointer bg-blue-50/30 hover:bg-blue-50 transition-all duration-300">
          {preview ? (
            <img src={preview} alt="Retinal Preview" className="h-full w-full object-cover rounded-2xl p-2" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">High Resolution Fundus Image (PNG, JPG)</p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className={`w-full mt-6 py-4 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
            !file || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {loading ? <RefreshCw className="animate-spin" /> : <><Activity size={20} /> Run Analysis</>}
        </button>

        {preview && (
          <button
            onClick={clearInput}
            className="w-full mt-4 py-3 rounded-2xl font-semibold bg-gray-200 hover:bg-gray-300 transition"
          >
            Clear and Try Another
          </button>
        )}
      </div>
      
      <ResultCard result={result} loading={loading} />
      
      {result && !loading && (
        <div className="max-w-xl mx-auto flex gap-4 mt-6">
          <button
            onClick={clearInput}
            className="flex-1 py-3 rounded-2xl font-semibold bg-red-500 text-white hover:bg-red-600 transition shadow-lg"
          >
            Clear Report
          </button>
        </div>
      )}
    </div>
  );
};

const LiveCameraSection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [result, setResult] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const isPredictingRef = useRef(false);

  // Robust Camera Lifecycle
  useEffect(() => {
    let activeStream = null;

    const startCamera = async () => {
      if (!isCameraOn) return;
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        activeStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  // Automated Frame Analysis Interval
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current || isPredictingRef.current || !stream || !isCameraOn) return;

      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        isPredictingRef.current = true;
        setIsCapturing(true);
        
        try {
          const formData = new FormData();
          formData.append('file', blob, 'frame.jpg');
          const response = await axios.post(API_ENDPOINT, formData);
          
          setResult({
            class: response.data.prediction,
            confidence: response.data.confidence / 100
          });
        } catch (error) {
          console.error("Frame prediction error", error);
        } finally {
          isPredictingRef.current = false;
          setIsCapturing(false);
        }
      }, 'image/jpeg', 0.8);
    }, 1500);

    return () => clearInterval(interval);
  }, [stream, isCameraOn]);

  const toggleCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
  }

  setIsCameraOn(prev => !prev);
};


  const stage = result ? getStageInfo(result.class) : null;
  const confidence = result ? (result.confidence * 100).toFixed(1) : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
      <div className="relative w-full max-w-2xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20 flex items-center justify-center">
        {isCameraOn ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <VideoOff size={64} className="mb-4 opacity-20" />
            <p className="font-semibold">Camera is Turned Off</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />

        {result && isCameraOn && (
          <div className="absolute top-6 left-6 right-6">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${stage.color}`} />
                  <span className={`font-bold text-lg ${stage.text}`}>{stage.label}</span>
                </div>
                <span className="text-blue-600 font-mono font-bold">{confidence}%</span>
              </div>
            </div>
          </div>
        )}

        {isCameraOn && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <div className={`w-2 h-2 rounded-full ${isCapturing ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`} />
            <span className="text-[10px] text-white/80 font-semibold tracking-tighter uppercase">AI Pulse</span>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl mt-8 flex flex-col gap-4 px-4">
        {/* Confidence Bar */}
        {result && isCameraOn && (
          <div className="animate-in fade-in duration-300">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-700 ease-out ${stage.color}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm font-medium text-gray-500">Live Prediction Confidence</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <button
            onClick={toggleCamera}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition shadow-lg ${
              isCameraOn 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCameraOn ? <><VideoOff size={20} /> Stop Camera</> : <><Camera size={20} /> Start Camera</>}
          </button>

          <button
            onClick={() => setResult(null)}
            disabled={!result}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition shadow-lg ${
              !result ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Clear Report
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center px-6">
        <p className="text-gray-400 text-xs italic">
          Tip: You can manually stop the camera to save power, or it will stop automatically when switching tabs.
        </p>
      </div>
    </div>
  );
};

const InfoSection = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding the 5 Stages</h2>
      <p className="text-gray-500">Classification according to the International Clinical Diabetic Retinopathy Disease Severity Scale.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {STAGES.map((stage) => (
        <div key={stage.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className={`w-12 h-12 ${stage.color} rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg`}>
            <Eye size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.label}</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{stage.desc}</p>
          <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span className="text-gray-400">Risk Level:</span>
              <span className={stage.text}>{stage.risk}</span>
            </div>
            <div className="flex gap-2 items-start">
              <ShieldCheck size={14} className="text-blue-500 mt-0.5" />
              <p className="text-xs text-gray-500">{stage.action}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const AdviceSection = () => (
  <section className="bg-blue-50/50 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Preventative Care & Recommendations</h2>
        <div className="space-y-6">
          {[
            { title: "Blood Sugar Management", desc: "Maintaining stable glucose levels is critical to prevent vessel damage in the retina.", icon: <Activity className="text-blue-500" /> },
            { title: "Regular Eye Screenings", desc: "Early detection of retinopathy can reduce the risk of vision loss by up to 95%.", icon: <Eye className="text-blue-500" /> },
            { title: "Healthy Lifestyle", desc: "Controlled blood pressure and cholesterol levels support overall ocular health.", icon: <Stethoscope className="text-blue-500" /> }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="mt-1">{item.icon}</div>
              <div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-blue-100">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle size={24} />
          <h3 className="font-bold text-xl">Consultation Guidance</h3>
        </div>
        <p className="text-gray-600 mb-6 italic">"This system provides immediate screening insights. If you notice blurry vision, floaters, or dark areas, contact an eye specialist immediately."</p>
        <ul className="space-y-3">
          {["Bring current blood work reports", "Mention any sudden changes in vision", "Request a dilated eye exam"].map((li, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <ChevronRight size={16} className="text-blue-500" /> {li}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2 text-white font-bold text-xl">
        <Activity className="text-blue-500" />
        <span>RetinaAI</span>
      </div>
      <div className="text-center md:text-right max-w-md">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Disclaimer</p>
        <p className="text-[10px] leading-relaxed">
          This AI system is intended for educational and screening purposes only and does not replace professional medical diagnosis, 
          advice, or treatment. Always seek the advice of your physician or other qualified health provider with any questions 
          regarding a medical condition.
        </p>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
      &copy; {new Date().getFullYear()} AI-Retina Healthcare Systems. All Rights Reserved.
    </div>
  </footer>
);

export default function App() {
  const [mode, setMode] = useState('upload'); // 'upload' or 'camera'
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  const handlePredict = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(API_ENDPOINT, formData);
      setResult({
        class: response.data.prediction,
        confidence: response.data.confidence / 100
      });
    } catch (err) {
      setError("Failed to process image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <HeroSection />

      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="flex justify-center mb-12">
          <div className="p-1.5 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl flex border border-white/50">
            <button
              onClick={() => { setMode('upload'); handleClear(); }}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                mode === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Upload size={18} /> Upload Image
            </button>
            <button
              onClick={() => { setMode('camera'); handleClear(); }}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                mode === 'camera' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Camera size={18} /> Live Camera
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="min-h-[500px]">
          {mode === 'upload' ? (
            <UploadSection 
              onPredict={handlePredict} 
              loading={loading} 
              result={result}
              onClear={handleClear}
            />
          ) : (
            <LiveCameraSection />
          )}
        </div>
      </main>

      <InfoSection />
      <AdviceSection />
      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}