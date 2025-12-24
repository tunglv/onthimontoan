
import React, { useState } from 'react';
import { Grade, Exam, UserAnswer } from './types';
import { SAMPLE_EXAMS } from './constants';
import ExamList from './components/ExamList';
import QuizEngine from './components/QuizEngine';
import ResultView from './components/ResultView';
import { generateNewExam } from './services/geminiService';

const App: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(Grade.Grade2);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examState, setExamState] = useState<'idle' | 'testing' | 'result'>('idle');
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [dynamicExams, setDynamicExams] = useState<Exam[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setExamState('testing');
    setUserAnswers([]);
  };

  const handleFinishExam = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setExamState('result');
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const questions = await generateNewExam(selectedGrade);
    if (questions) {
      const newExam: Exam = {
        id: `ai-${Date.now()}`,
        title: `Đề AI tạo - Lớp ${selectedGrade}`,
        grade: selectedGrade,
        description: 'Đề thi được tạo ngẫu nhiên bởi trí tuệ nhân tạo Gemini.',
        questions: questions.map((q: any, i: number) => ({
          ...q,
          id: `ai-q-${i}`
        })),
        isAI: true
      };
      setDynamicExams([newExam, ...dynamicExams]);
      handleStartExam(newExam);
    }
    setIsGenerating(false);
  };

  const reset = () => {
    setActiveExam(null);
    setExamState('idle');
    setUserAnswers([]);
  };

  const allExams = [...dynamicExams, ...SAMPLE_EXAMS];

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={reset}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform">
              Σ
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-800 tracking-tight">VUI HỌC TOÁN</h1>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">Học kỳ 1 • Tiểu học</p>
            </div>
          </div>

          {examState === 'idle' && (
            <div className="bg-gray-100 p-1.5 rounded-2xl hidden md:flex border border-gray-200">
              <button 
                onClick={() => setSelectedGrade(Grade.Grade2)}
                className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${selectedGrade === Grade.Grade2 ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Lớp 2
              </button>
              <button 
                onClick={() => setSelectedGrade(Grade.Grade4)}
                className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${selectedGrade === Grade.Grade4 ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Lớp 4
              </button>
            </div>
          )}
          
          <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
             <span className="text-xl">🎓</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {examState === 'idle' && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Chương trình chuẩn Bộ Giáo Dục
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                Học Toán thật <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">thông minh & vui vẻ</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <button 
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-purple-200 hover:scale-105 transition-all flex items-center justify-center disabled:opacity-70 group"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Đang soạn đề...
                    </>
                  ) : (
                    <>
                      <span className="mr-3 text-2xl group-hover:rotate-12 transition-transform">✨</span>
                      Tạo đề mới bằng AI
                    </>
                  )}
                </button>
                <p className="text-gray-400 font-bold hidden sm:block">hoặc chọn đề dưới đây</p>
              </div>

              {/* Mobile Grade Selector */}
              <div className="flex justify-center mt-12 md:hidden">
                <div className="bg-gray-100 p-1.5 rounded-2xl flex border border-gray-200">
                  <button 
                    onClick={() => setSelectedGrade(Grade.Grade2)}
                    className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${selectedGrade === Grade.Grade2 ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400'}`}
                  >
                    Lớp 2
                  </button>
                  <button 
                    onClick={() => setSelectedGrade(Grade.Grade4)}
                    className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${selectedGrade === Grade.Grade4 ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400'}`}
                  >
                    Lớp 4
                  </button>
                </div>
              </div>
            </div>

            <section className="relative">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-gray-800 flex items-center">
                  <span className="bg-yellow-400 w-3 h-10 rounded-full mr-4 shadow-lg shadow-yellow-100"></span>
                  Bộ đề lớp {selectedGrade}
                </h3>
                <span className="text-sm font-bold text-gray-400">{allExams.filter(e => e.grade === selectedGrade).length} Đề thi có sẵn</span>
              </div>
              
              <ExamList 
                exams={allExams} 
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

      <footer className="mt-32 py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="text-4xl">🌟</span>
          </div>
          <p className="text-xl font-black mb-2">VUI HỌC TOÁN AI</p>
          <p className="text-gray-400 font-medium">Đồng hành cùng học sinh Việt Nam chinh phục kiến thức.</p>
          <div className="mt-12 text-[10px] text-gray-500 uppercase tracking-widest">
            &copy; 2024 • Được thiết kế với tâm huyết
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
