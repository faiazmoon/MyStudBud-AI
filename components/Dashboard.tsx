import React from 'react';
import { UserProfile, PathType, SubPath, ThemeMode } from '../types';
import ChatInterface from './ChatInterface';
import { BookOpen, Target, Calendar, Award, Briefcase, Calculator, Brain } from 'lucide-react';
import { MARKETPLACE_DATA, PATH_THEME_MAP } from '../constants';

interface DashboardProps {
  user: UserProfile;
  logout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, logout }) => {
  const theme = user.subPath ? PATH_THEME_MAP[user.subPath] : ThemeMode.STUDY;

  // Filter marketplace for relevance
  const recommendedItems = MARKETPLACE_DATA.filter(item => 
    user.subPath && (item.tags as any).includes(user.subPath)
  );

  const renderStats = () => {
    if (user.pathType === PathType.ACADEMIC) {
      if (user.subPath === SubPath.KINDERGARTEN) {
        return (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-3xl border-b-4 border-yellow-200 text-center">
              <span className="text-4xl">🌟</span>
              <p className="font-comic font-bold text-yellow-600 mt-2">12 Stars</p>
            </div>
            <div className="bg-white p-4 rounded-3xl border-b-4 border-pink-200 text-center">
              <span className="text-4xl">🎨</span>
              <p className="font-comic font-bold text-pink-600 mt-2">3 Drawings</p>
            </div>
          </div>
        );
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><BookOpen size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Topics Mastered</p>
              <p className="text-xl font-bold">14/20</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
             <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Target size={24} /></div>
             <div>
               <p className="text-sm text-gray-500">Weekly Goal</p>
               <p className="text-xl font-bold">85%</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
             <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Brain size={24} /></div>
             <div>
               <p className="text-sm text-gray-500">Knowledge Score</p>
               <p className="text-xl font-bold">720</p>
             </div>
          </div>
        </div>
      );
    } else {
       // Job Prep Stats
       return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 flex items-center gap-4">
            <div className="p-3 bg-zinc-100 text-zinc-600 rounded"><Calendar size={24} /></div>
            <div>
              <p className="text-sm text-zinc-500">Days to Exam</p>
              <p className="text-xl font-bold">42</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 flex items-center gap-4">
             <div className="p-3 bg-zinc-100 text-zinc-600 rounded"><Briefcase size={24} /></div>
             <div>
               <p className="text-sm text-zinc-500">Mock Tests</p>
               <p className="text-xl font-bold">5 Taken</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 flex items-center gap-4">
             <div className="p-3 bg-zinc-100 text-zinc-600 rounded"><Calculator size={24} /></div>
             <div>
               <p className="text-sm text-zinc-500">Avg. Score</p>
               <p className="text-xl font-bold">68%</p>
             </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold mb-1 ${theme === ThemeMode.FUN ? 'font-comic text-purple-600' : ''}`}>
             MYSTUDBUD
          </h1>
          <p className="opacity-70">Welcome back, {user.name}</p>
        </div>
        <button 
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 hover:bg-red-50 rounded transition-colors"
        >
          Exit Path
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Interface (Left 2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {renderStats()}
          <ChatInterface 
            subPath={user.subPath!} 
            theme={theme} 
            userName={user.name} 
          />
        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className={`p-6 ${
              theme === ThemeMode.FUN ? 'bg-white rounded-3xl border-4 border-yellow-300' : 
              theme === ThemeMode.EXAM ? 'bg-slate-800 text-white rounded-none' : 
              'bg-white rounded-xl shadow-sm border border-gray-100'
            }`}>
            <h3 className={`font-bold mb-4 ${theme === ThemeMode.FUN ? 'font-comic text-xl text-yellow-600' : 'text-lg'}`}>
              {theme === ThemeMode.FUN ? 'Play Time!' : 'Quick Actions'}
            </h3>
            <div className="space-y-3">
              {[
                { label: user.pathType === PathType.ACADEMIC ? 'Start Quiz' : 'Daily Mock', icon: '📝' },
                { label: user.pathType === PathType.ACADEMIC ? 'Homework Help' : 'Review Mistakes', icon: '💡' },
                { label: 'Progress Report', icon: '📊' }
              ].map((action, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                    theme === ThemeMode.FUN ? 'hover:bg-yellow-50 text-purple-800 font-bold' :
                    theme === ThemeMode.EXAM ? 'hover:bg-slate-700' :
                    'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Marketplace / Recommendations */}
          {recommendedItems.length > 0 && (
             <div className={`p-6 ${
              theme === ThemeMode.FUN ? 'bg-white rounded-3xl border-4 border-pink-300' : 
              'bg-white rounded-xl shadow-sm border border-gray-100'
            }`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${theme === ThemeMode.FUN ? 'font-comic text-xl text-pink-500' : 'text-lg'}`}>
                <Award size={20} />
                {theme === ThemeMode.FUN ? 'Cool Stuff!' : 'Recommended Resources'}
              </h3>
              <div className="space-y-4">
                {recommendedItems.map(item => (
                  <div key={item.id} className="flex gap-3 group cursor-pointer">
                    <img src={item.image} alt={item.title} className={`w-16 h-16 object-cover ${theme === ThemeMode.FUN ? 'rounded-2xl' : 'rounded-md'}`} />
                    <div>
                      <h4 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                      <p className="text-sm font-bold mt-1 text-green-600">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
