
import React from 'react';
import { VisualType } from '../types';

interface MathVisualizerProps {
  type: VisualType;
  data?: any;
}

const MathVisualizer: React.FC<MathVisualizerProps> = ({ type, data }) => {
  if (type === 'none' || !type) return null;

  return (
    <div className="flex justify-center my-6 p-6 bg-white rounded-3xl border-2 border-blue-50 shadow-inner">
      {type === 'triangle_count_complex' && (
        <svg width="220" height="140" viewBox="0 0 200 120">
          <path d="M100 10 L20 110 L180 110 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
          <line x1="100" y1="10" x2="100" y2="110" stroke="#1e293b" strokeWidth="2" />
          <line x1="60" y1="60" x2="140" y2="60" stroke="#1e293b" strokeWidth="2" />
        </svg>
      )}

      {type === 'quadrilateral_count' && (
        <svg width="220" height="140" viewBox="0 0 200 120">
          <path d="M40 20 L160 20 L180 100 L20 100 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="4" />
          <line x1="100" y1="20" x2="180" y2="100" stroke="#1e293b" strokeWidth="1.5" />
        </svg>
      )}

      {type === 'clock_analog' && (
        <svg width="150" height="150" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="75" fill="white" stroke="#334155" strokeWidth="3" />
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => (
            <line 
              key={i}
              x1="80" y1="15" x2="80" y2="22" 
              stroke="#334155" strokeWidth="2"
              transform={`rotate(${i * 30}, 80, 80)`}
            />
          ))}
          <line x1="80" y1="80" x2="80" y2="40" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" transform={`rotate(${data?.hour * 30 + (data?.minute || 0) / 2}, 80, 80)`} />
          <line x1="80" y1="80" x2="80" y2="25" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" transform={`rotate(${(data?.minute || 0) * 6}, 80, 80)`} />
          <circle cx="80" cy="80" r="4" fill="#1e293b" />
        </svg>
      )}

      {type === 'geometry_lines' && (
        <svg width="240" height="160" viewBox="0 0 240 160">
          <line x1="40" y1="40" x2="200" y2="40" stroke="#1e293b" strokeWidth="2" />
          <line x1="40" y1="120" x2="200" y2="120" stroke="#1e293b" strokeWidth="2" />
          <line x1="120" y1="20" x2="120" y2="140" stroke="#2563eb" strokeWidth="2" />
          <text x="30" y="45" fontSize="14" fontWeight="bold">A</text>
          <text x="210" y="45" fontSize="14" fontWeight="bold">B</text>
          <text x="30" y="125" fontSize="14" fontWeight="bold">C</text>
          <text x="210" y="125" fontSize="14" fontWeight="bold">D</text>
          <text x="125" y="15" fontSize="14" fontWeight="bold" fill="#2563eb">I</text>
          <text x="125" y="155" fontSize="14" fontWeight="bold" fill="#2563eb">K</text>
        </svg>
      )}

      {type === 'measurement_ruler' && (
        <div className="flex flex-col items-center w-full">
           <div className="relative w-64 h-12 bg-yellow-50 border-2 border-yellow-200 rounded flex items-end px-2">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="h-4 w-0.5 bg-yellow-600"></div>
                  <span className="text-[10px] font-bold text-yellow-800">{i}</span>
                </div>
              ))}
              <div 
                className="absolute left-2 bottom-6 h-3 bg-blue-500 rounded-full shadow-sm"
                style={{ width: `${(data?.length || 5) * 10}%` }}
              ></div>
           </div>
           <p className="mt-2 text-xs font-bold text-gray-400">Đơn vị: cm</p>
        </div>
      )}

      {type === 'fraction_grid' && (
        <div className="grid grid-cols-4 gap-1 border-2 border-gray-800 p-1 bg-gray-100">
           {[...Array(8)].map((_, i) => (
             <div 
               key={i} 
               className={`w-10 h-10 border border-gray-400 ${i < (data?.filled || 3) ? 'bg-blue-400 shadow-inner' : 'bg-white'}`}
             />
           ))}
        </div>
      )}
    </div>
  );
};

export default MathVisualizer;
