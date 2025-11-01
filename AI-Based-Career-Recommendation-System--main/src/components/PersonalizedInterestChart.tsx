'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PersonalizedInterestChartProps {
  interests: string[];
}

const COLORS = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-sm text-gray-600">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function PersonalizedInterestChart({ interests }: PersonalizedInterestChartProps) {
  // Generate data based on user's interests
  const generateInterestData = () => {
    if (interests.length === 0) return [];
    
    // Create percentage distribution based on number of interests
    const basePercentage = Math.floor(100 / interests.length);
    const remainder = 100 - (basePercentage * interests.length);
    
    return interests.map((interest, index) => ({
      name: interest,
      value: index === 0 ? basePercentage + remainder : basePercentage,
      color: COLORS[index % COLORS.length]
    }));
  };

  const data = generateInterestData();

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center">
        <p className="text-gray-500">No interests data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="text-center mb-4">
        <h4 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <span className="text-xl">💡</span>
          Your Interest Distribution
        </h4>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-2 rounded-lg"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <span className="font-medium text-gray-700">{item.name}</span>
            <span 
              className="font-bold"
              style={{ color: item.color }}
            >
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}