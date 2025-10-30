'use client';

import { useState } from 'react';
import CareerForm from '@/components/CareerForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import AnimatedParticles from '@/components/AnimatedParticles';

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Particles */}
      <AnimatedParticles />

      {/* Header Section with Enhanced Gradient */}
      <div className="gradient-bg text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-glow animate-slide-up">
            <span className="inline-block animate-pulse">🎯</span> AI Career Recommender
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto typewriter animate-slide-up">
            Discover your ideal career path using artificial intelligence
          </p>
          

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {!result ? (
            // Form Section
            <div className="bg-white rounded-3xl card-shadow card-glow p-8 md:p-12 -mt-16 relative z-10 animate-slide-up">
              <CareerForm 
                onResult={setResult} 
                loading={loading} 
                setLoading={setLoading} 
              />
            </div>
          ) : (
            // Results Section
            <div className="-mt-16 relative z-10 animate-slide-up">
              <ResultsDisplay result={result} loading={loading} />
              
              {/* Enhanced Back Button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setResult(null)}
                  className="btn-primary text-white px-10 py-4 rounded-2xl font-bold text-lg ripple hover:scale-105 transition-all duration-300 shadow-lg"
                  suppressHydrationWarning
                >
                  <span className="mr-2">←</span>
                  Try Another Recommendation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced How It Works Section - Only show when no results */}
        {!result && (
          <div className="mt-20 text-center animate-slide-up">
            <div className="bg-white rounded-3xl card-shadow card-glow p-10 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-glow">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <span className="text-4xl animate-bounce">📝</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl group-hover:text-blue-600 transition-colors">Fill Your Profile</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Enter your education, skills, and interests to build your professional profile</p>
                </div>
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <span className="text-4xl animate-pulse">🤖</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl group-hover:text-purple-600 transition-colors">AI Analysis</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Our machine learning model analyzes your profile against career patterns</p>
                </div>
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <span className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>🎯</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl group-hover:text-green-600 transition-colors">Get Recommendation</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Receive personalized career recommendations with detailed insights</p>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Floating Action Button */}
        <button className="fab flex items-center justify-center text-white font-bold" suppressHydrationWarning>
          <span className="text-2xl">✨</span>
        </button>
      </div>
    </div>
  );
}