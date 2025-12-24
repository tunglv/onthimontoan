
import { Exam, Grade, Question } from './types';

// Helper: Định dạng số có dấu cách hàng nghìn (Ví dụ: 11 110 005)
const formatNumber = (num: number | string): string => {
  if (typeof num === 'string') return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
  
  // Format cả đáp án đúng và sai trước khi đưa vào Set
  const formattedCorrect = formatNumber(correctValue);
  finalOptions.add(formattedCorrect);

  distractors.forEach(d => {
    const formattedDist = formatNumber(d);
    if (formattedDist !== formattedCorrect) finalOptions.add(formattedDist);
  });

  // Nếu vẫn chưa đủ 4 đáp án, sinh thêm số ngẫu nhiên lân cận
  let offset = 1;
  while (finalOptions.size < 4) {
    const numericCorrect = typeof correctValue === 'number' ? correctValue : parseInt(String(correctValue).replace(/\s/g, ''));
    if (!isNaN(numericCorrect)) {
      const newVal = numericCorrect + (offset * (offset % 2 === 0 ? 1 : -1)) * (numericCorrect > 1000 ? 100 : 1);
      if (newVal >= 0) finalOptions.add(formatNumber(newVal));
    } else {
      finalOptions.add(`Phương án ${finalOptions.size + 1}`);
    }
    offset++;
  }

  return shuffleArray(Array.from(finalOptions));
};

const createQ = (text: string, correct: string | number, dists: (string | number)[], vType: any = 'none', vData: any = null): Question => {
  const options = ensureUniqueOptions(correct, dists);
  const formattedCorrect = formatNumber(correct);
  return {
    id: Math.random().toString(36).substr(2, 9),
    text,
    options,
    correctAnswerIndex: options.indexOf(formattedCorrect),
    visualType: vType,
    visualData: vData
  };
};

// --- NGÂN HÀNG MẪU CÂU HỎI LỚP 2 ---
const g2Templates = [
  (s: number) => {
    const a = 25 + (s % 40), b = 18 + (s % 30);
    return createQ(`Kết quả của phép tính ${a} + ${b} là:`, a + b, [a + b - 1, a + b + 10, a + b - 10]);
  },
  (s: number) => {
    const a = 60 + (s % 30), b = 25 + (s % 20);
    return createQ(`Kết quả của phép tính ${a} - ${b} là:`, a - b, [a - b + 1, a - b - 10, a - b + 10]);
  },
  (s: number) => createQ(`Số chẵn lớn nhất có hai chữ số là:`, 98, [99, 100, 96]),
  (s: number) => createQ(`Số lẻ nhỏ nhất có hai chữ số là:`, 11, [10, 13, 0o1]),
  (s: number) => {
    const dm = 3 + (s % 6);
    const cm = 2 + (s % 7);
    return createQ(`${dm}dm ${cm}cm = ... cm. Số thích hợp là:`, dm * 10 + cm, [dm + cm, dm * 10, cm * 10]);
  },
  (s: number) => {
    const h = (s % 11) + 1;
    return createQ(`Đồng hồ đang chỉ mấy giờ?`, `${h} giờ`, [`${(h % 12) + 1} giờ`, `12 giờ`, `6 giờ`], 'clock_analog', { hour: h, minute: 0 });
  },
  (s: number) => {
    const chuc = 5 + (s % 4);
    const donVi = 1 + (s % 8);
    return createQ(`Số gồm ${chuc} chục và ${donVi} đơn vị là:`, chuc * 10 + donVi, [donVi * 10 + chuc, chuc + donVi, chuc * 10]);
  },
  (s: number) => {
    const x = 20 + (s % 20), tong = 50 + (s % 10);
    return createQ(`Tìm x, biết: ${x} + x = ${tong}`, tong - x, [tong + x, x, tong]);
  },
  (s: number) => {
    const thung1 = 35 + (s % 10), thung2 = 12 + (s % 5);
    return createQ(`Thùng thứ nhất có ${thung1}l dầu, thùng thứ hai có ít hơn thùng thứ nhất ${thung2}l. Hỏi thùng thứ hai có bao nhiêu lít dầu?`, thung1 - thung2, [thung1 + thung2, 20, 30]);
  },
  (s: number) => createQ(`Hình vẽ bên có bao nhiêu hình tứ giác?`, '3 hình', ['1 hình', '2 hình', '4 hình', '5 hình'], 'quadrilateral_count')
];

// --- NGÂN HÀNG MẪU CÂU HỎI LỚP 4 ---
const g4Templates = [
  (s: number) => {
    // Sửa lỗi cấu tạo số: Dùng toán học thay vì ghép chuỗi
    const trieu = 10 + (s % 15);
    const nghin = (s % 9) * 100 + 10;
    const donVi = s % 10;
    const ketQua = trieu * 1000000 + nghin * 1000 + donVi;
    return createQ(`Số gồm ${trieu} triệu, ${nghin} nghìn và ${donVi} đơn vị là:`, ketQua, [
      trieu * 1000000 + nghin * 1000 + donVi * 10,
      trieu * 1000000 + nghin * 100,
      trieu * 100000 + nghin * 1000 + donVi
    ]);
  },
  (s: number) => {
    const n = 450000 + (s % 10) * 1000;
    return createQ(`Trong số ${formatNumber(n)}, chữ số 5 thuộc hàng nào?`, 'Chục nghìn', ['Trăm nghìn', 'Hàng nghìn', 'Hàng trăm']);
  },
  (s: number) => {
    const a = 120 + (s % 20), b = 150 + (s % 20), c = 180 + (s % 20);
    const tbc = Math.round((a + b + c) / 3);
    return createQ(`Trung bình cộng của ${formatNumber(a)}, ${formatNumber(b)} và ${formatNumber(c)} là:`, tbc, [a + b + c, tbc + 10, tbc - 5]);
  },
  (s: number) => {
    const tong = 200 + (s % 50), hieu = 40;
    const soLon = (tong + hieu) / 2;
    return createQ(`Tổng hai số là ${tong}, hiệu là ${hieu}. Số lớn là:`, soLon, [soLon - hieu, (tong - hieu) / 2, 100]);
  },
  (s: number) => {
    const yen = 2 + (s % 5), kg = 5;
    return createQ(`${yen} yến ${kg}kg = ... kg. Số cần điền là:`, yen * 10 + kg, [yen + kg, yen * 100 + kg, 205]);
  },
  (s: number) => {
    const nam = 1900 + (s % 11) * 10;
    const tk = Math.ceil(nam / 100);
    const laMa = ['XVIII', 'XIX', 'XX', 'XXI'];
    return createQ(`Năm ${nam} thuộc thế kỷ thứ mấy?`, `Thế kỷ ${laMa[tk - 18] || 'XX'}`, ['Thế kỷ XV', 'Thế kỷ X', 'Thế kỷ XVI']);
  },
  (s: number) => {
    const cd = 12 + (s % 5), cr = 8;
    return createQ(`Một khu đất hình chữ nhật có chiều dài ${cd}m, chiều rộng ${cr}m. Diện tích là:`, `${cd * cr} m2`, [`${(cd + cr) * 2} m2`, `${cd * cr} m`, '100 m2']);
  },
  (s: number) => createQ(`Số vừa chia hết cho 2, vừa chia hết cho 5 thì có chữ số tận cùng là:`, '0', ['2', '5', '0 hoặc 5']),
  (s: number) => createQ(`Góc tù là góc:`, 'Lớn hơn góc vuông và bé hơn góc bẹt', ['Bé hơn góc vuông', 'Bằng góc vuông', 'Lớn hơn góc bẹt']),
  (s: number) => createQ(`Trong hình vẽ dưới đây, hai đường thẳng đang:`, s % 2 === 0 ? 'Song song' : 'Vuông góc', ['Cắt nhau', 'Trùng nhau'], 'geometry_lines', { relation: s % 2 === 0 ? 'parallel' : 'perpendicular' })
];

export const SAMPLE_EXAMS: Exam[] = [];

// Tạo 30 đề Lớp 2 (Tăng số lượng)
for (let i = 1; i <= 30; i++) {
  const seed = i * 7;
  const shuffled = shuffleArray([...g2Templates]);
  const questions = shuffled.slice(0, 10).map((tpl, idx) => tpl(seed + idx));
  SAMPLE_EXAMS.push({
    id: `l2-de-${i}`,
    title: `Đề thi Học kỳ 1 - Đề ${i}`,
    grade: Grade.Grade2,
    description: `Đề thi tổng hợp kiến thức lớp 2. Bao gồm các bài toán đố, hình học và tính toán.`,
    questions
  });
}

// Tạo 30 đề Lớp 4
for (let i = 1; i <= 30; i++) {
  const seed = i * 13;
  const shuffled = shuffleArray([...g4Templates]);
  const questions = shuffled.slice(0, 10).map((tpl, idx) => tpl(seed + idx));
  SAMPLE_EXAMS.push({
    id: `l4-de-${i}`,
    title: `Đề thi Học kỳ 1 - Đề ${i}`,
    grade: Grade.Grade4,
    description: `Đề luyện thi lớp 4 chuẩn cấu trúc. Tập trung vào số lớn, trung bình cộng và diện tích.`,
    questions
  });
}
