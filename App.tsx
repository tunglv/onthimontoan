
import React, { useState } from 'react';
import { Grade, Exam, UserAnswer } from './types';
import { SAMPLE_EXAMS } from './constants';
import ExamList from './components/ExamList';
import QuizEngine from './components/QuizEngine';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(Grade.Grade2);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examState, setExamState] = useState<'idle' | 'testing' | 'result'>('idle');
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setExamState('testing');
    setUserAnswers([]);
  };

  const handleFinishExam = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setExamState('result');
  };

  const reset = () => {
    setActiveExam(null);
    setExamState('idle');
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={reset}>
            <div className="bg-blue-500 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200">
              Σ
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-800 tracking-tight">VUI HỌC TOÁN</h1>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Học kỳ 1 • Lớp 2 & 4</p>
            </div>
          </div>

          {examState === 'idle' && (
            <div className="bg-gray-100 p-1 rounded-xl hidden sm:flex">
              <button 
                onClick={() => setSelectedGrade(Grade.Grade2)}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${selectedGrade === Grade.Grade2 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Lớp 2
              </button>
              <button 
                onClick={() => setSelectedGrade(Grade.Grade4)}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${selectedGrade === Grade.Grade4 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Lớp 4
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {examState === 'idle' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Luyện thi Toán <br/><span className="text-blue-600">Điểm cao không khó!</span>
              </h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                Hàng trăm bộ đề bám sát chương trình của Bộ Giáo dục. 
                Sử dụng trí tuệ nhân tạo để giải đáp thắc mắc ngay lập tức.
              </p>

              {/* Mobile Grade Selector */}
              <div className="flex justify-center mt-8 sm:hidden">
                <div className="bg-gray-100 p-1 rounded-xl flex">
                  <button 
                    onClick={() => setSelectedGrade(Grade.Grade2)}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${selectedGrade === Grade.Grade2 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    Lớp 2
                  </button>
                  <button 
                    onClick={() => setSelectedGrade(Grade.Grade4)}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${selectedGrade === Grade.Grade4 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    Lớp 4
                  </button>
                </div>
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Danh sách đề thi lớp {selectedGrade}</h3>
                <div className="h-px flex-1 bg-gray-200 mx-6 hidden md:block"></div>
              </div>
              <ExamList 
                exams={SAMPLE_EXAMS} 
                selectedGrade={selectedGrade}
                onSelect={handleStartExam} 
              />
            </section>
          </div>
        )}

        {examState === 'testing' && activeExam && (
          <QuizEngine 
            exam={activeExam} 
            onFinish={handleFinishExam}
            onCancel={reset}
          />
        )}

        {examState === 'result' && activeExam && (
          <ResultView 
            exam={activeExam} 
            answers={userAnswers}
            onRestart={reset}
          />
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="mt-20 py-10 text-center text-gray-400 border-t border-gray-100">
        <p className="text-sm">Thiết kế cho học sinh Việt Nam • Hỗ trợ bởi Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
