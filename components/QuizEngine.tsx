
import React, { useState, useEffect } from 'react';
import { Exam, UserAnswer } from '../types';

interface QuizEngineProps {
  exam: Exam;
  onFinish: (answers: UserAnswer[]) => void;
  onCancel: () => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ exam, onFinish, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(exam.questions.length * 120); // 2 mins per question

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
      <div className="flex justify-between items-center mb-6 sticky top-4 bg-blue-50/90 backdrop-blur p-4 rounded-xl z-10">
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-red-500 font-medium"
        >
          Thoát
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Thời gian còn lại</p>
          <p className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-bold">Câu hỏi</p>
          <p className="text-xl font-bold text-gray-800">{currentIndex + 1} / {exam.questions.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-b-8 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center ${
                currentAnswer?.selectedIndex === idx
                  ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100'
                  : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold text-lg ${
                currentAnswer?.selectedIndex === idx ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="text-lg font-medium text-gray-700">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className="px-8 py-4 bg-white border-2 border-blue-500 text-blue-500 rounded-2xl font-bold hover:bg-blue-50 disabled:opacity-30 transition-all flex-1"
        >
          Câu trước
        </button>
        {isLastQuestion ? (
          <button
            onClick={() => onFinish(answers)}
            className="px-8 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 shadow-lg shadow-green-200 transition-all flex-1"
          >
            Nộp bài
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all flex-1"
          >
            Tiếp theo
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;
