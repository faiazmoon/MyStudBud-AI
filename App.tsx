import React, { useState } from 'react';
import { UserProfile, PathType, SubPath, ThemeMode, Language } from './types';
import { PATH_THEME_MAP } from './constants';
import LayoutWrapper from './components/LayoutWrapper';
import Dashboard from './components/Dashboard';
import { GraduationCap, Briefcase, CheckCircle2, Globe, ArrowRight } from 'lucide-react';

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [step, setStep] = useState<number>(0); // 0: Entry, 1: Details
  
  // Temporary form state
  const [tempPath, setTempPath] = useState<PathType | null>(null);
  const [tempSubPath, setTempSubPath] = useState<SubPath | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempLang, setTempLang] = useState<Language>('en');

  const handleEntrySelect = (path: PathType) => {
    setTempPath(path);
    setStep(1);
  };

  const handleFinalize = () => {
    if (tempPath && tempSubPath && tempName) {
      setUser({
        name: tempName,
        language: tempLang,
        pathType: tempPath,
        subPath: tempSubPath,
        details: {
            goal: 'General Improvement' // simplified for demo
        }
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setStep(0);
    setTempPath(null);
    setTempSubPath(null);
    setTempName('');
  };

  // 1. Authenticated / Dashboard View
  if (user && user.subPath) {
    const theme = PATH_THEME_MAP[user.subPath] || ThemeMode.STUDY;
    return (
      <LayoutWrapper theme={theme}>
        <Dashboard user={user} logout={handleLogout} />
      </LayoutWrapper>
    );
  }

  // 2. Onboarding Flow
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">MYSTUDBUD</div>
        <button 
            onClick={() => setTempLang(tempLang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:shadow-md transition-all text-sm font-medium"
        >
            <Globe size={16} />
            {tempLang === 'en' ? 'English' : 'বাংলা'}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight">
                {tempLang === 'en' ? 'Choose Your Path' : 'আপনার পথ বেছে নিন'}
            </h1>
            <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
                {tempLang === 'en' 
                    ? 'One platform. Tailored experiences. Are you here to learn or to build a career?' 
                    : 'একটি প্ল্যাটফর্ম। কাস্টম অভিজ্ঞতা। আপনি কি শিখতে চান নাকি ক্যারিয়ার গড়তে চান?'}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Academic Card */}
              <button 
                onClick={() => handleEntrySelect(PathType.ACADEMIC)}
                className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                        🎓
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {tempLang === 'en' ? 'Academic Support' : 'একাডেমিক সহায়তা'}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                        {tempLang === 'en' 
                            ? 'Kindergarten to University Admission. AI tutors, gamified learning, and exam prep.'
                            : 'কিন্ডারগার্টেন থেকে বিশ্ববিদ্যালয় ভর্তি। এআই টিউটর, গেমের মাধ্যমে শিক্ষা এবং পরীক্ষার প্রস্তুতি।'}
                    </p>
                </div>
              </button>

              {/* Job Prep Card */}
              <button 
                onClick={() => handleEntrySelect(PathType.JOB_PREP)}
                className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                        💼
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                        {tempLang === 'en' ? 'Job Preparation' : 'চাকরি প্রস্তুতি'}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                         {tempLang === 'en' 
                            ? 'BCS, Bank, Corporate, & Skills. Strategy mentors, resume builders, and mock tests.'
                            : 'বিসিএস, ব্যাংক, কর্পোরেট এবং স্কিলস। স্ট্র্যাটেজি মেন্টর, সিভি বিল্ডার এবং মক টেস্ট।'}
                    </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-in zoom-in-95 duration-300">
            <button 
                onClick={() => setStep(0)} 
                className="text-sm text-gray-400 hover:text-gray-900 mb-6 font-medium"
            >
                ← Back
            </button>
            
            <h2 className="text-2xl font-bold mb-8">
                {tempLang === 'en' ? 'Setup Profile' : 'প্রোফাইল সেটআপ'}
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input 
                        type="text" 
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Level / Sector</label>
                    <div className="grid grid-cols-1 gap-3">
                        {tempPath === PathType.ACADEMIC ? (
                            <>
                                {[
                                    { id: SubPath.KINDERGARTEN, label: 'Kindergarten 🧸' },
                                    { id: SubPath.PRIMARY, label: 'Primary (Class 1-5) 📚' },
                                    { id: SubPath.SECONDARY, label: 'Secondary (Class 6-10) 🎒' },
                                    { id: SubPath.SSC_HSC, label: 'SSC / HSC Exam 📝' },
                                    { id: SubPath.ADMISSION, label: 'University Admission 🏛️' },
                                    { id: SubPath.MADRASA, label: 'Madrasa Education 🕌' },
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setTempSubPath(opt.id)}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            tempSubPath === opt.id 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold ring-1 ring-blue-500' 
                                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </>
                        ) : (
                             <>
                                {[
                                    { id: SubPath.BCS_PUBLIC, label: 'BCS / Govt Jobs 🇧🇩' },
                                    { id: SubPath.PRIVATE_JOB, label: 'Private / Corporate Jobs 🏢' },
                                    { id: SubPath.MILITARY, label: 'Military / Defense 🎖️' },
                                    { id: SubPath.SKILL_ABROAD, label: 'Skills & Abroad ✈️' },
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setTempSubPath(opt.id)}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            tempSubPath === opt.id 
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold ring-1 ring-emerald-500' 
                                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <button 
                    onClick={handleFinalize}
                    disabled={!tempName || !tempSubPath}
                    className="w-full py-4 mt-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Start Journey <ArrowRight size={20} />
                </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
