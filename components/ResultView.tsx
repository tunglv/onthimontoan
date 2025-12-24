
import React, { useState } from 'react';
import { Exam, UserAnswer } from '../types';
import { getExplanationFromAI } from '../services/geminiService';

interface ResultViewProps {
  exam: Exam;
  answers: UserAnswer[];
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ exam, answers, onRestart }) => {
  const [selectedExplaningId, setSelectedExplaningId] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const correctCount = exam.questions.filter((q, idx) => {
    const userAns = answers.find(a => a.questionId === q.id);
    return userAns?.selectedIndex === q.correctAnswerIndex;
  }).length;

  const score = (correctCount / exam.questions.length) * 10;

  const askAi = async (qId: string) => {
    const q = exam.questions.find(x => x.id === qId);
    if (!q) return;
    
    setSelectedExplaningId(qId);
    setAiExplanation(null);
    setIsLoadingAi(true);
    
    const explanation = await getExplanationFromAI(
      exam.grade,
      q.text,
      q.options,
      q.options[q.correctAnswerIndex]
    );
    
    setAiExplanation(explanation);
    setIsLoadingAi(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center mb-8 border-t-8 border-yellow-400">
        <div className="mb-6">
          <span className="text-6xl mb-4 block">
            {score >= 8 ? '🎉' : score >= 5 ? '👍' : '📚'}
          </span>
          <h2 className="text-4xl font-extrabold text-gray-800">Kết quả: {score.toFixed(1)} / 10</h2>
          <p className="text-gray-500 mt-2 font-medium">Bạn đúng {correctCount} trên {exam.questions.length} câu hỏi.</p>
        </div>
        
        <button 
          onClick={onRestart}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Làm đề khác
        </button>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-blue-500 w-2 h-8 rounded-full mr-3"></span>
        Chi tiết bài làm
      </h3>

      <div className="space-y-6">
        {exam.questions.map((q, idx) => {
          const userAns = answers.find(a => a.questionId === q.id);
          const isCorrect = userAns?.selectedIndex === q.correctAnswerIndex;

          return (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-800 pr-8">
                    {idx + 1}. {q.text}
                  </h4>
                  {isCorrect ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Đúng</span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Sai</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {q.options.map((opt, oIdx) => (
                    <div 
                      key={oIdx}
                      className={`p-3 rounded-xl border text-sm ${
                        oIdx === q.correctAnswerIndex 
                          ? 'bg-green-50 border-green-200 text-green-700 font-bold' 
                          : userAns?.selectedIndex === oIdx 
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : 'bg-gray-50 border-gray-100 text-gray-500'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => askAi(q.id)}
                  className="flex items-center text-sm font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM14.95 6.464a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707z" />
                  </svg>
                  Hỏi Gia sư AI giải thích
                </button>

                {selectedExplaningId === q.id && (
                  <div className="mt-4 p-5 bg-purple-50 rounded-xl border border-purple-100 text-gray-700 text-sm leading-relaxed animate-in fade-in slide-in-from-top-4">
                    {isLoadingAi ? (
                      <div className="flex items-center space-x-2 text-purple-600 font-medium">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                        <span>Gia sư AI đang viết lời giải...</span>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{aiExplanation}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultView;
