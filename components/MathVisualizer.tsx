
import React from 'react';
import { VisualType } from '../types';

interface MathVisualizerProps {
  type: VisualType;
  data?: any;
}

const MathVisualizer: React.FC<MathVisualizerProps> = ({ type, data }) => {
  if (type === 'none' || !type) return null;

  return (
    <div className="flex justify-center my-6 p-6 bg-white rounded-3xl border-2 border-blue-50 shadow-inner overflow-hidden">
      {type === 'quadrilateral_count' && (
        <svg width="220" height="140" viewBox="0 0 200 120">
          {/* Hình thang chính bị chia bởi một đường thẳng tạo ra 1 tam giác và 1 tứ giác (hoặc 2 tứ giác) */}
          <path d="M30 20 L150 20 L180 100 L20 100 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
          <line x1="110" y1="20" x2="130" y2="100" stroke="#1e293b" strokeWidth="2" />
          <text x="60" y="65" fontSize="12" fill="#94a3b8">1</text>
          <text x="130" y="65" fontSize="12" fill="#94a3b8">2</text>
        </svg>
      )}

      {type === 'triangle_count_complex' && (
        <svg width="220" height="140" viewBox="0 0 200 120">
          {/* Một tam giác lớn có đường kẻ từ đỉnh xuống đáy */}
          <path d="M100 10 L180 110 L20 110 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
          <line x1="100" y1="10" x2="70" y2="110" stroke="#1e293b" strokeWidth="2" />
          <line x1="100" y1="10" x2="130" y2="110" stroke="#1e293b" strokeWidth="2" />
        </svg>
      )}

      {type === 'clock_analog' && (
        <svg width="150" height="150" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="75" fill="white" stroke="#334155" strokeWidth="3" />
          {[...Array(12)].map((_, i) => (
            <line 
              key={i}
              x1="80" y1="15" x2="80" y2="22" 
              stroke="#334155" strokeWidth="2"
              transform={`rotate(${i * 30}, 80, 80)`}
            />
          ))}
          <line x1="80" y1="80" x2="80" y2="45" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" transform={`rotate(${(data?.hour || 0) * 30}, 80, 80)`} />
          <line x1="80" y1="80" x2="80" y2="25" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" transform={`rotate(${(data?.minute || 0) * 6}, 80, 80)`} />
          <circle cx="80" cy="80" r="4" fill="#1e293b" />
        </svg>
      )}

      {type === 'geometry_lines' && (
        <svg width="240" height="160" viewBox="0 0 240 160">
          {data?.relation === 'parallel' ? (
            <>
              <line x1="40" y1="50" x2="200" y2="50" stroke="#1e293b" strokeWidth="2" />
              <line x1="40" y1="110" x2="200" y2="110" stroke="#1e293b" strokeWidth="2" />
              <text x="25" y="55" fontSize="12" fontWeight="bold">a</text>
              <text x="25" y="115" fontSize="12" fontWeight="bold">b</text>
            </>
          ) : (
            <>
              <line x1="40" y1="80" x2="200" y2="80" stroke="#1e293b" strokeWidth="2" />
              <line x1="120" y1="20" x2="120" y2="140" stroke="#1e293b" strokeWidth="2" />
              <rect x="120" y="72" width="8" height="8" fill="none" stroke="#2563eb" strokeWidth="1" />
              <text x="25" y="85" fontSize="12" fontWeight="bold">d1</text>
              <text x="125" y="15" fontSize="12" fontWeight="bold">d2</text>
            </>
          )}
        </svg>
      )}

      {type === 'fraction_grid' && (
        <div className="flex flex-col items-center">
           <div className="grid grid-cols-4 gap-1 border-2 border-gray-800 p-1 bg-gray-100">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 border border-gray-400 ${i < (data?.filled || 3) ? 'bg-blue-400' : 'bg-white'}`}
                />
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default MathVisualizer;
