
import React from 'react';
import { VisualType } from '../types';

interface MathVisualizerProps {
  type: VisualType;
  data?: any;
}

const MathVisualizer: React.FC<MathVisualizerProps> = ({ type, data }) => {
  if (type === 'none' || !type) return null;

  return (
    <div className="flex justify-center my-8 p-8 bg-white rounded-[2.5rem] border-4 border-blue-50 shadow-inner overflow-hidden min-h-[180px] items-center">
      {type === 'quadrilateral_count' && (
        <div className="flex flex-col items-center">
          <svg width="240" height="140" viewBox="0 0 200 120">
            {/* Hình thang chính được chia thành 2 phần để đếm được 3 hình tứ giác (2 nhỏ, 1 lớn) */}
            <path d="M40 20 L160 20 L180 100 L20 100 Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
            <line x1="100" y1="20" x2="100" y2="100" stroke="#2563eb" strokeWidth="3" />
            <text x="65" y="65" fontSize="16" fontWeight="bold" fill="#3b82f6">1</text>
            <text x="125" y="65" fontSize="16" fontWeight="bold" fill="#3b82f6">2</text>
          </svg>
          <p className="mt-4 text-xs font-bold text-blue-400">Đếm tất cả các hình tứ giác có trong hình</p>
        </div>
      )}

      {type === 'clock_analog' && (
        <div className="bg-gray-50 p-4 rounded-full shadow-lg">
          <svg width="150" height="150" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="75" fill="white" stroke="#334155" strokeWidth="4" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line 
                  key={i}
                  x1={80 + 60 * Math.sin(angle)} 
                  y1={80 - 60 * Math.cos(angle)} 
                  x2={80 + 70 * Math.sin(angle)} 
                  y2={80 - 70 * Math.cos(angle)} 
                  stroke="#334155" strokeWidth="3"
                />
              );
            })}
            {/* Kim giờ */}
            <line 
              x1="80" y1="80" 
              x2={80 + 40 * Math.sin(((data?.hour || 12) * 30 + (data?.minute || 0) * 0.5) * Math.PI / 180)} 
              y2={80 - 40 * Math.cos(((data?.hour || 12) * 30 + (data?.minute || 0) * 0.5) * Math.PI / 180)} 
              stroke="#1e293b" strokeWidth="6" strokeLinecap="round" 
            />
            {/* Kim phút */}
            <line 
              x1="80" y1="80" 
              x2={80 + 60 * Math.sin((data?.minute || 0) * 6 * Math.PI / 180)} 
              y2={80 - 60 * Math.cos((data?.minute || 0) * 6 * Math.PI / 180)} 
              stroke="#ef4444" strokeWidth="4" strokeLinecap="round" 
            />
            <circle cx="80" cy="80" r="5" fill="#1e293b" />
          </svg>
        </div>
      )}

      {type === 'geometry_lines' && (
        <div className="flex flex-col items-center">
          <svg width="280" height="160" viewBox="0 0 240 160">
            {data?.relation === 'parallel' ? (
              <>
                <line x1="30" y1="50" x2="210" y2="50" stroke="#1e293b" strokeWidth="3" />
                <line x1="30" y1="110" x2="210" y2="110" stroke="#1e293b" strokeWidth="3" />
                <text x="15" y="55" fontSize="14" fontWeight="bold" fill="#2563eb">a</text>
                <text x="15" y="115" fontSize="14" fontWeight="bold" fill="#2563eb">b</text>
                <text x="110" y="145" fontSize="12" className="italic" fill="#64748b">a // b</text>
              </>
            ) : (
              <>
                <line x1="40" y1="80" x2="200" y2="80" stroke="#1e293b" strokeWidth="3" />
                <line x1="120" y1="20" x2="120" y2="140" stroke="#1e293b" strokeWidth="3" />
                <path d="M120 70 L130 70 L130 80" fill="none" stroke="#2563eb" strokeWidth="2" />
                <text x="25" y="85" fontSize="14" fontWeight="bold" fill="#2563eb">d1</text>
                <text x="125" y="15" fontSize="14" fontWeight="bold" fill="#2563eb">d2</text>
              </>
            )}
          </svg>
        </div>
      )}
    </div>
  );
};

export default MathVisualizer;
