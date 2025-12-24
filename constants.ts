
import { Exam, Grade, Question } from './types';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleOptions = (options: string[], correctIdx: number) => {
  const correctValue = options[correctIdx];
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  return {
    options: shuffled,
    newCorrectIdx: shuffled.indexOf(correctValue)
  };
};

// --- BỘ ĐỀ LỚP 2 (Dựa trên PDF đề số 1 - 20) ---
const getGrade2Template = (index: number): Question => {
  const templates = [
    // Dạng Tìm x (Câu 1 PDF)
    () => {
      const a = getRandomInt(5, 20);
      const res = getRandomInt(a + 5, a + 30);
      const x = res - a;
      return {
        id: '', text: `Tìm x, biết ${a} + x = ${res}:`,
        options: [`x = ${x}`, `x = ${x+2}`, `x = ${x-1}`, `x = ${res+a}`],
        correctAnswerIndex: 0
      };
    },
    // Dạng Phép tính kết quả 100 (Câu 2 PDF)
    () => {
      const a = getRandomInt(40, 70);
      const b = 100 - a;
      return {
        id: '', text: `Phép tính nào dưới đây có kết quả là 100?`,
        options: [`${a} + ${b}`, `${a} + ${b-5}`, `${a-10} + ${b}`, `${a+1} + ${b+1}`],
        correctAnswerIndex: 0
      };
    },
    // Dạng Đơn vị đo lường (Câu 4 PDF)
    () => {
      const dm = getRandomInt(1, 10);
      return {
        id: '', text: `${dm}0dm bằng bao nhiêu cm?`,
        options: [`${dm}00cm`, `${dm}0cm`, `${dm}cm`, `${dm+1}00cm`],
        correctAnswerIndex: 0
      };
    },
    // Dạng Số liền trước/sau (Câu 5 PDF)
    () => {
      const isAfter = Math.random() > 0.5;
      return {
        id: '', text: `Số liền ${isAfter ? 'sau' : 'trước'} số lớn nhất có 2 chữ số là:`,
        options: isAfter ? ["100", "99", "101", "98"] : ["98", "99", "100", "97"],
        correctAnswerIndex: 0
      };
    },
    // Dạng Đếm hình (Câu 6 PDF)
    () => ({
      id: '', text: `Hình vẽ bên có bao nhiêu hình tứ giác?`,
      options: ["3", "4", "5", "6"],
      correctAnswerIndex: 2,
      visualType: 'quadrilateral_count'
    }),
    // Dạng Xem đồng hồ (Câu 5 PDF Đề 2)
    () => {
      const h = getRandomInt(1, 12);
      const m = [0, 15, 30][getRandomInt(0, 2)];
      return {
        id: '', text: `${h} giờ ${m === 0 ? '' : m + ' phút'} còn gọi là:`,
        options: [`${h} giờ ${m === 0 ? '' : m + ' phút'}`, `${h+12} giờ ${m === 0 ? '' : m + ' phút'}`, "12 giờ", "6 giờ sáng"],
        correctAnswerIndex: 1,
        visualType: 'clock_analog',
        visualData: { hour: h, minute: m }
      };
    },
    // Toán đố (Câu 9 PDF)
    () => {
      const a = getRandomInt(30, 60);
      const b = getRandomInt(10, 25);
      return {
        id: '', text: `Mảnh vải xanh dài ${a}dm, mảnh vải tím ngắn hơn ${b}dm. Hỏi mảnh vải tím dài bao nhiêu dm?`,
        options: [`${a-b}dm`, `${a+b}dm`, `${b}dm`, `${a}dm`],
        correctAnswerIndex: 0
      };
    }
  ];

  const q = templates[index % templates.length]();
  const { options, newCorrectIdx } = shuffleOptions(q.options, q.correctAnswerIndex);
  return { ...q, options, correctAnswerIndex: newCorrectIdx } as Question;
};

// --- BỘ ĐỀ LỚP 4 (Dựa trên PDF đề số 1 - 20) ---
const getGrade4Template = (index: number): Question => {
  const templates = [
    // Chia hết cho 2 và 5 (Câu 1 PDF L4)
    () => ({
      id: '', text: "Số nào vừa chia hết cho 2 vừa chia hết cho 5?",
      options: ["5000", "1205", "3412", "2864"],
      correctAnswerIndex: 0
    }),
    // Trung bình cộng (Câu 2 PDF L4)
    () => {
      const nums = [36, 42, 57];
      const avg = Math.round(nums.reduce((a, b) => a + b) / nums.length);
      return {
        id: '', text: `Trung bình cộng của ${nums.join('; ')} là:`,
        options: [avg.toString(), (avg+5).toString(), "405", "145"],
        correctAnswerIndex: 0
      };
    },
    // Thế kỷ (Câu 3 PDF L4)
    () => {
      const year = getRandomInt(1000, 2024);
      const century = Math.ceil(year / 100);
      return {
        id: '', text: `Năm ${year} thuộc thế kỷ nào?`,
        options: [`Thế kỷ ${century}`, `Thế kỷ ${century-1}`, `Thế kỷ ${century+1}`, "Thế kỷ 21"],
        correctAnswerIndex: 0
      };
    },
    // Đơn vị khối lượng (Câu 4 PDF L4)
    () => {
      const ton = getRandomInt(2, 5);
      const kg = getRandomInt(10, 99);
      return {
        id: '', text: `${ton} tấn ${kg} kg = ....... kg. Số cần điền là:`,
        options: [`${ton}0${kg}`, `${ton}${kg}`, `${ton}00${kg}`, `${ton}50`],
        correctAnswerIndex: 0
      };
    },
    // Hình học song song (Câu 4 PDF Đề 2 L4)
    () => ({
      id: '', text: "Quan sát hình vẽ, đường thẳng AB song song với đường thẳng nào?",
      options: ["CD", "IK", "AC", "BD"],
      correctAnswerIndex: 0,
      visualType: 'geometry_lines'
    }),
    // Phân số (Câu 3 PDF Đề 12 L4)
    () => ({
      id: '', text: "Phân số chỉ phần đã tô màu trong hình dưới đây là:",
      options: ["3/8", "5/8", "3/4", "1/2"],
      correctAnswerIndex: 0,
      visualType: 'fraction_grid',
      visualData: { filled: 3, total: 8 }
    })
  ];

  const q = templates[index % templates.length]();
  const { options, newCorrectIdx } = shuffleOptions(q.options, q.correctAnswerIndex);
  return { ...q, options, correctAnswerIndex: newCorrectIdx } as Question;
};

const createExams = (grade: Grade, count: number): Exam[] => {
  return Array.from({ length: count }).map((_, i) => {
    const questions: Question[] = Array.from({ length: 10 }).map((__, j) => {
      const q = grade === Grade.Grade2 ? getGrade2Template(j + i) : getGrade4Template(j + i);
      return { ...q, id: `q-${grade}-${i}-${j}` };
    });

    return {
      id: `exam-${grade}-${i + 1}`,
      title: `Đề thi Học kỳ 1 - Đề số ${i + 1}`,
      grade: grade,
      description: `Đề kiểm tra định kỳ học kỳ 1 môn Toán lớp ${grade}. Nội dung bám sát bộ đề luyện thi của Bộ Giáo dục.`,
      questions
    };
  });
};

export const SAMPLE_EXAMS: Exam[] = [
  ...createExams(Grade.Grade2, 30),
  ...createExams(Grade.Grade4, 30)
];
