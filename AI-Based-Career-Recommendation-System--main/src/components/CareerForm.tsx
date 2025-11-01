'use client';

import { useState } from 'react';
import axios from 'axios';
import { User, GraduationCap, Brain, Heart, Sparkles } from 'lucide-react';
import MultiSelectDropdown from './MultiSelectDropdown';

interface CareerFormProps {
  onResult: (result: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const skillOptions = [
  'Python', 'JavaScript', 'Java', 'React', 'Node.js', 'Machine Learning', 
  'Data Analysis', 'UI/UX Design', 'Project Management', 'SQL', 'AWS', 
  'Docker', 'Git', 'Agile', 'Statistics', 'Adobe Creative Suite', 
  'System Design', 'Cloud Computing', 'Graphic Design', 'Digital Marketing'
];

const interestOptions = [
  'Data Science', 'Technology', 'Software Development', 'Design', 
  'Digital Media', 'Analytics', 'Arts', 'Business', 'Innovation', 
  'Problem Solving', 'Creative Writing', 'Research', 'Leadership', 
  'Entrepreneurship', 'Education', 'Healthcare'
];

const educationOptions = ["Bachelor's", "Master's", "PhD"];

export default function CareerForm({ onResult, loading, setLoading }: CareerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    education: '',
    skills: [] as string[],
    interests: [] as string[]
  });

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.education || formData.skills.length === 0 || formData.interests.length === 0) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      onResult({ ...response.data, formData });
    } catch (error) {
      console.error('Error:', error);
      alert('Error getting recommendation. Make sure the Flask server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-10 animate-slide-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-glow">Tell us about yourself</h2>
        <p className="text-lg text-gray-600">Fill in your details to get personalized career recommendations</p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Name and Age */}
      <div className="grid md:grid-cols-2 gap-6 animate-slide-left">
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 group-hover:text-indigo-600 transition-colors">
            <User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="input-field w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
            placeholder="Enter your full name"
            suppressHydrationWarning
          />
        </div>
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 group-hover:text-indigo-600 transition-colors">
            <span className="text-lg mr-2 group-hover:scale-110 transition-transform">🎂</span>
            Age
          </label>
          <input
            type="number"
            min="16"
            max="50"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
            className="input-field w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
            suppressHydrationWarning
          />
        </div>
      </div>

      {/* Education */}
      <div className="animate-slide-right group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 group-hover:text-indigo-600 transition-colors">
          <GraduationCap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Education Level
        </label>
        <select
          value={formData.education}
          onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
          className="input-field w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 bg-white"
          suppressHydrationWarning
        >
          <option value="">🎓 Select your education level</option>
          {educationOptions.map(edu => (
            <option key={edu} value={edu}>{edu}</option>
          ))}
        </select>
      </div>

      {/* Skills Dropdown */}
      <div className="animate-slide-left">
        <MultiSelectDropdown
          label="Skills"
          icon={<Brain className="w-5 h-5 mr-2" />}
          options={skillOptions}
          selectedValues={formData.skills}
          onToggle={handleSkillToggle}
          onRemove={removeSkill}
          placeholder="🛠️ Select your skills..."
          colorScheme="blue"
        />
      </div>

      {/* Interests Dropdown */}
      <div className="animate-slide-right">
        <MultiSelectDropdown
          label="Interests"
          icon={<Heart className="w-5 h-5 mr-2" />}
          options={interestOptions}
          selectedValues={formData.interests}
          onToggle={handleInterestToggle}
          onRemove={removeInterest}
          placeholder="💡 Select your interests..."
          colorScheme="purple"
        />
      </div>

      {/* Enhanced Submit Button */}
      <div className="animate-slide-up">
        <button
          type="submit"
          disabled={loading}
          className="btn-success w-full text-white py-5 px-8 rounded-2xl font-bold text-xl ripple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-2xl"
          suppressHydrationWarning
        >
          {loading ? (
            <>
              <div className="loading-spinner rounded-full h-6 w-6 border-b-3 border-white"></div>
              <span className="animate-pulse">Analyzing your profile...</span>
            </>
          ) : (
            <>
              <span className="text-2xl animate-bounce">🚀</span>
              <span>Get My Career Recommendation</span>
              <span className="text-2xl animate-pulse">✨</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}