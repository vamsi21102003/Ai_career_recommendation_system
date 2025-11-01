'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Data Science', value: 60, color: '#FF6B9D' },
  { name: 'Technology', value: 40, color: '#4ECDC4' }
];

const COLORS = ['#FF6B9D', '#4ECDC4'];

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
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function InterestDistribution() {
  return (
    <div className="bg-white rounded-3xl card-shadow card-glow p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">💡</span>
          Interest Distribution
        </h3>
        <p className="text-gray-600 text-sm">Career interests breakdown</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-center">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-pink-50 rounded-lg p-3">
            <div className="font-semibold text-pink-700">Data Science</div>
            <div className="text-2xl font-bold text-pink-600">60%</div>
          </div>
          <div className="bg-teal-50 rounded-lg p-3">
            <div className="font-semibold text-teal-700">Technology</div>
            <div className="text-2xl font-bold text-teal-600">40%</div>
          </div>
        </div>
      </div>
    </div>
  );
}