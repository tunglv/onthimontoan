
import React, { useState, useEffect } from 'react';
import { Exam, UserAnswer } from '../types';
import MathVisualizer from './MathVisualizer';

interface QuizEngineProps {
  exam: Exam;
  onFinish: (answers: UserAnswer[]) => void;
  onCancel: () => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ exam, onFinish, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(exam.questions.length * 120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, onFinish]);

  const currentQuestion = exam.questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id)];
    newAnswers.push({ questionId: currentQuestion.id, selectedIndex: optionIndex });
    setAnswers(newAnswers);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLastQuestion = currentIndex === exam.questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 sticky top-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl z-10 shadow-sm border border-blue-50">
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-red-500 font-bold px-4 py-2 hover:bg-red-50 rounded-xl transition-all"
        >
          Thoát
        </button>
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Thời gian</p>
          <p className={`text-xl font-mono font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Tiến độ</p>
          <p className="text-xl font-black text-gray-800">{currentIndex + 1}/{exam.questions.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 sm:p-12 mb-8 border border-white relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-16 -mt-16 z-0"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 leading-tight">
            {currentQuestion.text}
          </h2>

          {currentQuestion.visualType && currentQuestion.visualType !== 'none' && (
            <MathVisualizer type={currentQuestion.visualType} data={currentQuestion.visualData} />
          )}

          <div className="space-y-4 mt-8">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center group ${
                  currentAnswer?.selectedIndex === idx
                    ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-50'
                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 font-black text-xl transition-colors ${
                  currentAnswer?.selectedIndex === idx ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-blue-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-lg font-bold text-gray-700">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-6">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className="px-8 py-5 bg-white border-2 border-blue-500 text-blue-500 rounded-2xl font-black hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-white transition-all flex-1 shadow-lg shadow-blue-100"
        >
          Quay lại
        </button>
        {isLastQuestion ? (
          <button
            disabled={answers.length < exam.questions.length}
            onClick={() => onFinish(answers)}
            className="px-8 py-5 bg-green-500 text-white rounded-2xl font-black hover:bg-green-600 shadow-xl shadow-green-200 transition-all flex-1 disabled:opacity-50"
          >
            Nộp bài tập
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="px-8 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex-1"
          >
            Câu tiếp theo
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;
