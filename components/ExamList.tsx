
import React from 'react';
import { Exam, Grade } from '../types';

interface ExamListProps {
  exams: Exam[];
  onSelect: (exam: Exam) => void;
  selectedGrade: Grade;
}

const ExamList: React.FC<ExamListProps> = ({ exams, onSelect, selectedGrade }) => {
  const filteredExams = exams.filter(e => e.grade === selectedGrade);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
      {filteredExams.map((exam, index) => (
        <div 
          key={exam.id}
          className="bg-white rounded-[2rem] shadow-xl shadow-blue-100/40 hover:shadow-2xl hover:shadow-blue-200/50 transition-all p-8 border-2 border-transparent hover:border-blue-400 cursor-pointer group relative overflow-hidden active:scale-95"
          onClick={() => onSelect(exam)}
        >
          {/* Decorative number tag */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-200 font-black text-2xl group-hover:text-blue-500 transition-colors">
            {index + 1}
          </div>

          <div className="flex justify-between items-start mb-6">
            <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
              Lớp {exam.grade}
            </span>
            <div className="flex items-center text-gray-400 text-xs font-bold">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {exam.questions.length} câu
            </div>
          </div>
          
          <h3 className="text-xl font-black text-gray-800 group-hover:text-blue-600 mb-3 transition-colors">{exam.title}</h3>
          <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">{exam.description}</p>
          
          <div className="mt-8 flex items-center text-blue-600 font-black group-hover:translate-x-3 transition-transform">
            Thử sức ngay
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
