
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExams.map((exam) => (
        <div 
          key={exam.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-400 cursor-pointer group"
          onClick={() => onSelect(exam)}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="bg-blue-100 text-blue-600 text-sm font-bold px-3 py-1 rounded-full">
              Toán Lớp {exam.grade}
            </span>
            <span className="text-gray-400 text-sm">{exam.questions.length} câu hỏi</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">{exam.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{exam.description}</p>
          <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
            Bắt đầu làm bài
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
