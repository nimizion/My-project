
import React from 'react';
import { CareerRecommendation } from '../types';

interface Props {
  recommendations: CareerRecommendation[];
  onReset: () => void;
}

const ResultsDisplay: React.FC<Props> = ({ recommendations, onReset }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Personalized Paths</h2>
          <p className="mt-2 text-lg text-slate-600">Based on our analysis, these careers align perfectly with your potential.</p>
        </div>
        <button
          onClick={onReset}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-full font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start New Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {recommendations.map((career, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col hover:border-indigo-200 transition-colors group">
            <div className="p-8 flex-grow">
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase ${
                  career.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                  career.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
                  'bg-rose-50 text-rose-700'
                }`}>
                  {career.difficulty}
                </span>
                <span className="text-slate-400 font-mono text-xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{career.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {career.description}
              </p>

              <div className="bg-indigo-50/50 rounded-2xl p-5 mb-6 border border-indigo-100/50">
                <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-3">Why this fits you</h4>
                <p className="text-indigo-800 text-sm leading-relaxed">{career.whyFits}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Core Skills Needed</h4>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map((skill, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Recommended Roadmap</h4>
                <div className="space-y-4">
                  {career.learningPath.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        {i < career.learningPath.length - 1 && <div className="w-0.5 h-full bg-indigo-100 my-1"></div>}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none">{step.stage}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 mt-auto border-t border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary Estimate</p>
                <p className="text-lg font-bold text-slate-800">{career.salaryRange}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Market Outlook</p>
                <p className="text-sm font-semibold text-emerald-600">{career.jobOutlook}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
