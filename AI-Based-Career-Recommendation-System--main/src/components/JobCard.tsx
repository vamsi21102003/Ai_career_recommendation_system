'use client';

import { MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';
import { Job } from '@/data/jobsData';

interface JobCardProps {
  job: Job;
  isInternship?: boolean;
}

export default function JobCard({ job, isInternship = false }: JobCardProps) {
  const cardColor = isInternship ? 'border-purple-200 bg-purple-50' : 'border-blue-200 bg-blue-50';
  const badgeColor = isInternship ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  
  return (
    <div className={`border-2 ${cardColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{job.title}</h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
          <p className="text-sm text-gray-500">{job.department}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
          {job.type}
        </span>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">{job.salary}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">Apply by: {job.applyBy}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
        Apply Now
      </button>
    </div>
  );
}