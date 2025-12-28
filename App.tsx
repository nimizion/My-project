
import React, { useState } from 'react';
import Header from './components/Header';
import AssessmentForm from './components/AssessmentForm';
import LoadingState from './components/LoadingState';
import ResultsDisplay from './components/ResultsDisplay';
import { AssessmentState, UserProfile } from './types';
import { getCareerRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AssessmentState>({
    step: 1, // 1: Form, 2: Loading, 3: Results
    loading: false,
    error: null,
    profile: {
      interests: '',
      skills: '',
      academicStrengths: '',
      careerGoals: '',
      preferredWorkEnvironment: 'office'
    },
    results: null
  });

  const handleFormSubmit = async (profile: UserProfile) => {
    setState(prev => ({ ...prev, profile, step: 2, loading: true, error: null }));
    
    try {
      const recommendations = await getCareerRecommendations(profile);
      setState(prev => ({ 
        ...prev, 
        results: recommendations, 
        step: 3, 
        loading: false 
      }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        error: err.message || "Something went wrong", 
        step: 1, 
        loading: false 
      }));
    }
  };

  const handleReset = () => {
    setState({
      step: 1,
      loading: false,
      error: null,
      profile: {
        interests: '',
        skills: '',
        academicStrengths: '',
        careerGoals: '',
        preferredWorkEnvironment: 'office'
      },
      results: null
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {state.step === 1 && (
          <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                Powered by Gemini AI
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                Discover the <span className="text-indigo-600">Perfect Career</span> for Your Future
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Stop guessing your future. Our AI analyzes your unique skills and interests to reveal career paths you'll actually love.
              </p>
              
              {state.error && (
                <div className="mt-8 bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl max-w-lg mx-auto flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium">{state.error}</p>
                </div>
              )}
            </div>
            <AssessmentForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {state.step === 2 && <LoadingState />}

        {state.step === 3 && state.results && (
          <ResultsDisplay 
            recommendations={state.results} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="bg-slate-800 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-800">PathFinder AI</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Helping the next generation find their purpose through the power of artificial intelligence and personalized guidance.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Contact</a>
          </div>
          <p className="text-slate-400 text-xs mt-8">
            © {new Date().getFullYear()} PathFinder AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
