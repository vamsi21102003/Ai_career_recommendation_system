'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface MultiSelectDropdownProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  onRemove: (value: string) => void;
  placeholder: string;
  colorScheme: 'blue' | 'purple';
}

export default function MultiSelectDropdown({
  label,
  icon,
  options,
  selectedValues,
  onToggle,
  onRemove,
  placeholder,
  colorScheme
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const colorClasses = {
    blue: {
      tag: 'bg-blue-100 text-blue-800',
      hover: 'hover:text-blue-600',
      border: 'hover:border-blue-500 focus:ring-blue-500',
      item: 'hover:bg-blue-50'
    },
    purple: {
      tag: 'bg-purple-100 text-purple-800',
      hover: 'hover:text-purple-600',
      border: 'hover:border-purple-500 focus:ring-purple-500',
      item: 'hover:bg-purple-50'
    }
  };

  const colors = colorClasses[colorScheme];
  
  // Filter out already selected options
  const availableOptions = options.filter(option => !selectedValues.includes(option));

  return (
    <div className="relative group" ref={dropdownRef}>
      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 group-hover:text-indigo-600 transition-colors">
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        {label} ({selectedValues.length} selected)
      </label>
      
      {/* Selected Items Tags */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4 animate-slide-up">
          {selectedValues.map((value, index) => (
            <span
              key={value}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${colors.tag} transform hover:scale-105 transition-all duration-200 shadow-md animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {value}
              <button
                type="button"
                onClick={() => onRemove(value)}
                className={`ml-2 ${colors.hover} hover:scale-125 transition-transform rounded-full p-1`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`input-field w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-white text-left flex items-center justify-between ${colors.border} focus:ring-4 focus:border-transparent transition-all duration-300 hover:border-indigo-300 hover:shadow-lg`}
        suppressHydrationWarning
      >
        <span className={`${selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
          {selectedValues.length === 0 ? placeholder : `${selectedValues.length} items selected`}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto dropdown-enter-active">
          <div className="p-2">
            {availableOptions.length > 0 ? (
              availableOptions.map((option, index) => (
                <div
                  key={option}
                  onClick={() => {
                    onToggle(option);
                    // Keep dropdown open for multiple selections
                  }}
                  className={`p-3 ${colors.item} rounded-xl cursor-pointer transition-all duration-200 group animate-slide-up hover:shadow-md`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 group-hover:font-medium transition-all">{option}</span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                All options selected
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}