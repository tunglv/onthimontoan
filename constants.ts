
import { Exam, Grade, Question } from './types';

// Helper: Seeded Random để đảm bảo Đề số 1 luôn là Đề số 1 nhưng khác Đề số 2
const getSeededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Hàm xáo trộn mảng
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ensureUniqueOptions = (correctValue: string | number, distractors: (string | number)[]): string[] => {
  const finalOptions = new Set<string>();
  finalOptions.add(String(correctValue));

  distractors.forEach(d => {
    if (String(d) !== String(correctValue)) finalOptions.add(String(d));
  });

  let offset = 1;
  while (finalOptions.size < 4) {
    const numericCorrect = typeof correctValue === 'number' ? correctValue : parseInt(String(correctValue));
    const val = !isNaN(numericCorrect) 
      ? numericCorrect + (offset * (offset % 2 === 0 ? 1 : -1))
      : `Lựa chọn ${finalOptions.size + 1}`;
    finalOptions.add(String(val));
    offset++;
  }

  return shuffleArray(Array.from(finalOptions));
};

const createQ = (text: string, correct: string | number, dists: (string | number)[], vType: any = 'none', vData: any = null): Question => {
  const options = ensureUniqueOptions(correct, dists);
  return {
    id: Math.random().toString(36).substr(2, 9),
    text,
    options,
    correctAnswerIndex: options.indexOf(String(correct)),
    visualType: vType,
    visualData: vData
  };
};

// --- NGÂN HÀNG MẪU CÂU HỎI LỚP 2 ---
const g2Templates = [
  (s: number) => {
    const a = 20 + (s % 30), b = 15 + (s % 20);
    return createQ(`Kết quả của phép tính ${a} + ${b} là:`, a + b, [a + b - 1, a + b + 10, a + b - 10]);
  },
  (s: number) => {
    const a = 50 + (s % 20), b = 10 + (s % 15);
    return createQ(`Kết quả của phép tính ${a} - ${b} là:`, a - b, [a - b + 1, a - b - 5, 40]);
  },
  (s: number) => createQ(`Số chẵn lớn nhất có hai chữ số là:`, 98, [99, 100, 90]),
  (s: number) => createQ(`Số lẻ nhỏ nhất có hai chữ số là:`, 11, [10, 13, 15]),
  (s: number) => {
    const dm = 2 + (s % 5);
    return createQ(`${dm}dm bằng bao nhiêu cm?`, dm * 10, [dm, dm + 10, 100]);
  },
  (s: number) => {
    const h = (s % 11) + 1;
    return createQ(`Đồng hồ chỉ mấy giờ?`, `${h} giờ`, [`${h+1} giờ`, `12 giờ`, `6 giờ`], 'clock_analog', { hour: h, minute: 0 });
  },
  (s: number) => createQ(`Hình vẽ sau có bao nhiêu hình tứ giác?`, '3 hình', ['1 hình', '2 hình', '4 hình'], 'quadrilateral_count'),
  (s: number) => {
    const x = 10 + (s % 20), hieu = 5 + (s % 10);
    return createQ(`Tìm x, biết: x - ${x} = ${hieu}`, x + hieu, [x - hieu, x, hieu]);
  },
  (s: number) => {
    const ten = ['Lan', 'Mai', 'Minh', 'Hùng'][s % 4];
    const n1 = 15 + (s % 10), n2 = 5 + (s % 5);
    return createQ(`${ten} có ${n1} viên bi, ${ten} cho bạn ${n2} viên. Hỏi ${ten} còn lại bao nhiêu viên bi?`, n1 - n2, [n1 + n2, n1, 20]);
  },
  (s: number) => createQ(`Số gồm 7 chục và 5 đơn vị là:`, 75, [57, 70, 50]),
  (s: number) => createQ(`Ngày 20 tháng 11 là ngày thứ mấy nếu ngày 18 là thứ Hai?`, 'Thứ Tư', ['Thứ Ba', 'Thứ Năm', 'Thứ Sáu']),
  (s: number) => createQ(`Số liền sau của số 99 là:`, 100, [98, 90, 101]),
  (s: number) => createQ(`Số nào sau đây là số tròn chục:`, 40, [41, 39, 45]),
  (s: number) => createQ(`Đơn vị nào dùng để đo khối lượng?`, 'kg', ['dm', 'cm', 'l']),
  (s: number) => {
    const a = 12 + (s % 5), b = 8 + (s % 5);
    return createQ(`Một hình chữ nhật có các cạnh lần lượt là ${a}cm và ${b}cm. Chu vi hình đó là:`, (a + b) * 2, [a + b, a * b, 40]);
  }
];

// --- NGÂN HÀNG MẪU CÂU HỎI LỚP 4 ---
const g4Templates = [
  (s: number) => createQ(`Số "Bảy mươi triệu" viết là:`, '70 000 000', ['7 000 000', '700 000', '700 000 000']),
  (s: number) => createQ(`Giá trị của chữ số 5 trong số 352 100 là:`, '50 000', ['5 000', '500', '500 000']),
  (s: number) => {
    const a = 10 + (s % 10), b = 20 + (s % 10), c = 30 + (s % 10);
    const tbc = (a + b + c) / 3;
    return createQ(`Trung bình cộng của ${a}, ${b} và ${c} là:`, tbc, [a + b + c, tbc + 2, 20]);
  },
  (s: number) => {
    const t = 100 + (s % 20), h = 20;
    return createQ(`Tổng hai số là ${t}, hiệu là ${h}. Số lớn là:`, (t + h) / 2, [(t - h) / 2, t, h]);
  },
  (s: number) => createQ(`Số nào sau đây chia hết cho cả 2 và 5?`, '120', ['125', '122', '121']),
  (s: number) => createQ(`Số nào sau đây chia hết cho 9?`, '189', ['181', '109', '190']),
  (s: number) => {
    const nam = 1000 + (s * 10) % 1000;
    const tk = Math.ceil(nam / 100);
    const laMa = ['X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    return createQ(`Năm ${nam} thuộc thế kỷ thứ mấy?`, `Thế kỷ ${laMa[tk-10] || 'XX'}`, [`Thế kỷ X`, `Thế kỷ XV`, `Thế kỷ XXI`]);
  },
  (s: number) => createQ(`Hai đường thẳng không bao giờ cắt nhau gọi là hai đường thẳng:`, 'Song song', ['Vuông góc', 'Cắt nhau', 'Trùng nhau']),
  (s: number) => createQ(`Góc có số đo bằng 90 độ là:`, 'Góc vuông', ['Góc nhọn', 'Góc tù', 'Góc bẹt']),
  (s: number) => {
    const cd = 20 + (s % 10), cr = 10;
    return createQ(`Diện tích hình chữ nhật có chiều dài ${cd}m và chiều rộng ${cr}m là:`, `${cd * cr} m2`, [`${(cd + cr) * 2} m`, `200 m2`, `100 m2`]);
  },
  (s: number) => createQ(`1 tấn bằng bao nhiêu kg?`, 1000, [100, 10, 10000]),
  (s: number) => createQ(`Đơn vị đo diện tích là:`, 'm2', ['m', 'kg', 'l']),
  (s: number) => createQ(`Số lẻ lớn nhất có 5 chữ số là:`, 99999, [10000, 99998, 90000]),
  (s: number) => createQ(`Biểu thức a + b = b + a thể hiện tính chất nào?`, 'Giao hoán', ['Kết hợp', 'Phân phối', 'Cộng với 0']),
  (s: number) => createQ(`Trong hình vẽ, hai đường thẳng đang:`, s % 2 === 0 ? 'Song song' : 'Vuông góc', ['Cắt nhau', 'Trùng nhau'], 'geometry_lines', { relation: s % 2 === 0 ? 'parallel' : 'perpendicular' })
];

export const SAMPLE_EXAMS: Exam[] = [];

// Tạo 20 đề Lớp 2
for (let i = 1; i <= 20; i++) {
  const examSeed = i * 123; // Seed riêng cho mỗi đề
  // Lấy ngẫu nhiên 10 mẫu từ kho
  const shuffledTemplates = shuffleArray([...g2Templates]);
  const questions = shuffledTemplates.slice(0, 10).map((tpl, idx) => tpl(examSeed + idx));
  
  SAMPLE_EXAMS.push({
    id: `l2-de-${i}`,
    title: `Đề thi Học kỳ 1 - Số ${i}`,
    grade: Grade.Grade2,
    description: `Bộ đề thi bám sát chương trình. Luyện tập tổng hợp các kiến thức Học kỳ 1.`,
    questions
  });
}

// Tạo 20 đề Lớp 4
for (let i = 1; i <= 20; i++) {
  const examSeed = i * 456;
  const shuffledTemplates = shuffleArray([...g4Templates]);
  const questions = shuffledTemplates.slice(0, 10).map((tpl, idx) => tpl(examSeed + idx));

  SAMPLE_EXAMS.push({
    id: `l4-de-${i}`,
    title: `Đề thi Học kỳ 1 - Số ${i}`,
    grade: Grade.Grade4,
    description: `Đề thi chất lượng cao lớp 4. Giúp học sinh ôn tập triệu, lớp triệu, hình học và toán đố.`,
    questions
  });
}
