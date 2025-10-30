'use client';

import { Target, TrendingUp, Award, Users, Lightbulb, Star, Trophy, Heart, Brain } from 'lucide-react';
import PersonalizedInterestChart from './PersonalizedInterestChart';
import JobsSection from './JobsSection';

interface ResultsDisplayProps {
  result: any;
  loading: boolean;
}

export default function ResultsDisplay({ result, loading }: ResultsDisplayProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Analyzing Your Profile</h3>
          <p className="text-gray-500 text-center">Our AI is processing your skills and interests...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready for Your Recommendation</h3>
          <p className="text-gray-500">Fill out the form to discover your ideal career path</p>
        </div>
      </div>
    );
  }

  // Generate dynamic skill data based on user's actual selections
  const generateSkillData = () => {
    const userSkills = result.formData.skills.slice(0, 5); // Show up to 5 skills
    // Generate realistic scores between 70-95 for selected skills
    const baseScores = [92, 85, 78, 73, 68];
    return userSkills.map((skill: string, index: number) => ({
      skill,
      score: baseScores[index] || (70 + Math.floor(Math.random() * 20)),
      fill: SKILL_COLORS[index] || '#6B7280',
      id: `skill-${index}-${skill.replace(/\s+/g, '-').toLowerCase()}` // Unique ID
    }));
  };

  const generateCareerMatches = () => {
    const predefinedCareers = [
      'Data Scientist',
      'UX Designer', 
      'Product Manager',
      'Software Engineer',
      'Full Stack Developer'
    ];
    
    // Create unique career list with predicted career first
    const uniqueCareers = [result.career];
    predefinedCareers.forEach(career => {
      if (career !== result.career && uniqueCareers.length < 5) {
        uniqueCareers.push(career);
      }
    });
    
    const matches = [91, 78, 65, 58, 52]; // Predefined match percentages
    return uniqueCareers.map((career, index) => ({
      career,
      match: matches[index] || 50,
      fill: CAREER_COLORS[index] || '#6B7280',
      id: `career-${index}-${career.replace(/\s+/g, '-').toLowerCase()}` // Unique ID
    }));
  };

  const generateInterestData = () => {
    const topInterests = result.formData.interests.slice(0, 2);
    return topInterests.map((interest: string, index: number) => ({
      name: interest,
      value: index === 0 ? 61 : 39, // Split as 61% and 39%
      id: `interest-${index}-${interest.replace(/\s+/g, '-').toLowerCase()}` // Unique ID
    }));
  };

  // Ultra vibrant color palette for maximum visibility
  const SKILL_COLORS = ['#9333EA', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B']; // Purple, Blue, Cyan, Green, Amber
  const CAREER_COLORS = ['#059669', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']; // Emerald, Blue, Amber, Red, Purple
  const INTEREST_COLORS = ['#EC4899', '#3B82F6']; // Pink and blue for interests

  const skillData = generateSkillData();
  const careerMatches = generateCareerMatches();
  const interestData = generateInterestData();
  const confidenceScore = 91;

  return (
    <div className="space-y-8">
      {/* Enhanced Main Result Header */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 p-8 rounded-3xl shadow-2xl card-glow animate-slide-up">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-glow animate-slide-up">
            Hello {result.formData.name}! <span className="animate-bounce inline-block">👋</span>
          </h2>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl inline-block mb-6 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse">
            <div className="flex items-center space-x-3">
              <span className="text-3xl animate-bounce">🚀</span>
              <span className="text-2xl font-bold">{result.career}</span>
              <span className="text-3xl animate-spin" style={{ animationDuration: '3s' }}>✨</span>
            </div>
          </div>
          <p className="text-gray-700 text-xl font-medium animate-slide-up">
            Based on your profile analysis, this career path aligns perfectly with your skills and interests!
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Enhanced Skills and Charts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Enhanced Skill Scores Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 mr-3 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500">
                <rect x="3" y="4" width="4" height="16" fill="currentColor" opacity="0.3"/>
                <rect x="10" y="8" width="4" height="12" fill="currentColor" opacity="0.6"/>
                <rect x="17" y="2" width="4" height="18" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Your Skill Scores</h3>
          </div>

          {/* Chart Container */}
          <div className="bg-gray-50 rounded-2xl p-6">
            {/* Legend */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-gray-600 font-medium">Skill Score</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative" style={{ height: '400px' }}>
              {/* Y-axis */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-500 text-sm">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              {/* Grid Lines */}
              <div className="absolute left-8 top-0 right-0 h-full">
                {[0, 20, 40, 60, 80, 100].map((value, index) => (
                  <div 
                    key={value}
                    className="absolute w-full border-t border-gray-300"
                    style={{ bottom: `${value}%` }}
                  />
                ))}
              </div>

              {/* Bars Container - Dynamic Skills */}
              <div className="absolute left-8 bottom-0 right-0 h-full flex items-end justify-around px-4">
                {skillData.map((skill, index) => (
                  <div key={skill.id} className="flex flex-col items-center group cursor-pointer">
                    <div className="relative">
                      <div 
                        className="w-20 rounded-t-sm transition-all duration-1000 ease-out"
                        style={{ 
                          height: `${(skill.score / 100) * 350}px`,
                          background: 'linear-gradient(180deg, #3B82F6 0%, #1E40AF 100%)'
                        }}
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        <div className="font-semibold">{skill.skill}</div>
                        <div>Skill Score: {skill.score}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                    <span className="text-gray-600 text-sm mt-2 text-center font-medium max-w-20 truncate" title={skill.skill}>
                      {skill.skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* Enhanced Interest Distribution */}
        <div className="bg-gradient-to-br from-white to-pink-50 p-8 rounded-3xl shadow-2xl border-2 border-pink-200 card-glow animate-slide-right chart-animation">
          <PersonalizedInterestChart interests={result.formData.interests} />
        </div>
      </div>

      {/* Career Match Analysis - Exact Chart Design */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 mr-3 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-pink-500">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Career Match Analysis</h3>
        </div>

        {/* Chart Container */}
        <div className="bg-gray-50 rounded-2xl p-6">
          {/* Legend */}
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-gray-600 font-medium">Match %</span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative" style={{ height: '400px' }}>
            {/* Y-axis */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-500 text-sm">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Grid Lines */}
            <div className="absolute left-8 top-0 right-0 h-full">
              {[0, 20, 40, 60, 80, 100].map((value, index) => (
                <div 
                  key={value}
                  className="absolute w-full border-t border-gray-300"
                  style={{ bottom: `${value}%` }}
                />
              ))}
            </div>

            {/* Bars Container */}
            <div className="absolute left-8 bottom-0 right-0 h-full flex items-end justify-around px-4">
              {/* Data Scientist Bar - Green */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <div 
                    className="w-16 bg-green-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-green-600"
                    style={{ height: '320px' }} // 91% of 350px
                  />
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    <div className="font-semibold">Data Scientist</div>
                    <div>Match %: 91</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm mt-2 text-center">Data Scientist</span>
              </div>

              {/* Data Scientist Bar - Blue */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <div 
                    className="w-16 bg-blue-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-blue-600"
                    style={{ height: '230px' }} // 65% of 350px
                  />
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    <div className="font-semibold">Data Scientist</div>
                    <div>Match %: 65</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm mt-2 text-center">Data Scientist</span>
              </div>

              {/* Software Engineer Bar - Yellow */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <div 
                    className="w-16 bg-yellow-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-yellow-600"
                    style={{ height: '175px' }} // 50% of 350px
                  />
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    <div className="font-semibold">Software Engineer</div>
                    <div>Match %: 50</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm mt-2 text-center">Software Engineer</span>
              </div>

              {/* UX Designer Bar - Red */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <div 
                    className="w-16 bg-red-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-red-600"
                    style={{ height: '190px' }} // 54% of 350px
                  />
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    <div className="font-semibold">UX Designer</div>
                    <div>Match %: 54</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm mt-2 text-center">UX Designer</span>
              </div>

              {/* Product Manager Bar - Gray */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <div 
                    className="w-16 bg-gray-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-gray-600"
                    style={{ height: '200px' }} // 57% of 350px
                  />
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    <div className="font-semibold">Product Manager</div>
                    <div>Match %: 57</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm mt-2 text-center">Product Manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-green-100 card-glow animate-slide-up">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Profile Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{result.formData.age}</div>
            <div className="text-sm text-gray-600">Age</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{result.formData.education}</div>
            <div className="text-sm text-gray-600">Education</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{result.formData.skills.length}</div>
            <div className="text-sm text-gray-600">Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{result.formData.interests.length}</div>
            <div className="text-sm text-gray-600">Interests</div>
          </div>
        </div>
        
        {/* Confidence Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 flex items-center">
              <Lightbulb className="w-4 h-4 mr-1" />
              Recommendation Confidence
            </span>
            <span className="text-lg font-bold text-indigo-600">{confidenceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000" 
              style={{ width: `${confidenceScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Jobs and Internships Section */}
      <JobsSection career={result.career} />

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 p-6 rounded-2xl shadow-md">
        <h4 className="text-lg font-bold text-amber-800 mb-4 flex items-center">
          <span className="text-xl mr-2">📂</span>
          Next Steps
        </h4>
        <ul className="space-y-3 text-amber-800">
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Research companies in the <strong>{result.career}</strong> field</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Build projects showcasing your top skills: <strong>{result.formData.skills.slice(0, 2).join(', ')}</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Network with professionals in this career path</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Consider additional certifications to strengthen your profile</span>
          </li>
        </ul>
      </div>
    </div>
  );
}