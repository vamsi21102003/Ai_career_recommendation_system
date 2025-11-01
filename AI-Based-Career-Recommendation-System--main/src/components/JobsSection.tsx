'use client';

import { useState } from 'react';
import { Briefcase, GraduationCap, Filter } from 'lucide-react';
import { getJobsForCareer } from '@/data/jobsData';
import JobCard from './JobCard';

interface JobsSectionProps {
  career: string;
}

export default function JobsSection({ career }: JobsSectionProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'internships'>('jobs');
  const jobData = getJobsForCareer(career);

  if (!jobData) {
    return null;
  }

  const { jobs, internships } = jobData;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <Briefcase className="w-8 h-8 text-indigo-600" />
          Career Opportunities
        </h3>
        <p className="text-gray-600 text-lg">
          Explore {jobs.length + internships.length} opportunities for <span className="font-semibold text-indigo-600">{career}</span>
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-2xl p-1 flex">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'jobs'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Full-time Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'internships'
                ? 'bg-white text-purple-600 shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Internships ({internships.length})
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {activeTab === 'jobs' && jobs.map((job) => (
          <JobCard key={job.id} job={job} isInternship={false} />
        ))}
        {activeTab === 'internships' && internships.map((internship) => (
          <JobCard key={internship.id} job={internship} isInternship={true} />
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{jobs.length}</div>
            <div className="text-sm text-gray-600">Full-time Jobs</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600">{internships.length}</div>
            <div className="text-sm text-gray-600">Internships</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...jobs.map(j => parseInt(j.salary.replace(/[₹L\/yr]/g, ''))))}L
            </div>
            <div className="text-sm text-gray-600">Highest Salary</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-600">
              {new Set([...jobs, ...internships].map(j => j.location.split(',')[1]?.trim())).size}
            </div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
        </div>
      </div>
    </div>
  );
}