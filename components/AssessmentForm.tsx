
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

const AssessmentForm: React.FC<Props> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    interests: '',
    skills: '',
    academicStrengths: '',
    careerGoals: '',
    preferredWorkEnvironment: 'office'
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
        <p className="text-slate-500">The more detailed you are, the better our AI can tailor your career paths.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            What are your main interests?
          </label>
          <textarea
            name="interests"
            required
            placeholder="e.g., I love solving puzzles, coding, painting, and helping people."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
            value={profile.interests}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            What skills do you currently have?
          </label>
          <textarea
            name="skills"
            required
            placeholder="e.g., Basic Python, Graphic Design, Public Speaking, Writing"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
            value={profile.skills}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            What are your academic strengths?
          </label>
          <input
            type="text"
            name="academicStrengths"
            required
            placeholder="e.g., Mathematics, Physics, English Literature"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={profile.academicStrengths}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your career goals or aspirations?
          </label>
          <input
            type="text"
            name="careerGoals"
            required
            placeholder="e.g., Start my own business, contribute to climate change solutions"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={profile.careerGoals}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Preferred Work Environment
          </label>
          <select
            name="preferredWorkEnvironment"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            value={profile.preferredWorkEnvironment}
            onChange={handleChange}
          >
            <option value="office">Traditional Office</option>
            <option value="remote">Remote / Work from Home</option>
            <option value="field">Field Work / On-site</option>
            <option value="flexible">Flexible / Hybrid</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
        >
          Discover My Paths
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AssessmentForm;
