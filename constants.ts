
import { Exam, Grade } from './types';

export const SAMPLE_EXAMS: Exam[] = [
  // ==========================================
  // TOÁN LỚP 2 - BỘ ĐỀ CHUẨN (20 ĐỀ)
  // ==========================================
  {
    id: 'l2-de-1',
    title: 'Đề thi Học kỳ 1 - Đề số 1',
    grade: Grade.Grade2,
    description: 'Nội dung: Phép cộng có nhớ, Tìm x, Đơn vị dm, Hình tứ giác.',
    questions: [
      { id: 'l2-d1-q1', text: 'Số hạng thứ nhất là 48, số hạng thứ hai là 35. Tổng là:', options: ['73', '83', '82', '72'], correctAnswerIndex: 1 },
      { id: 'l2-d1-q2', text: 'Tìm x, biết: x + 18 = 52', options: ['x = 34', 'x = 44', 'x = 70', 'x = 42'], correctAnswerIndex: 0 },
      { id: 'l2-d1-q3', text: 'Mẹ hái được 35 quả cam, ba hái được nhiều hơn mẹ 17 quả. Ba hái được số quả cam là:', options: ['18 quả', '42 quả', '52 quả', '48 quả'], correctAnswerIndex: 2 },
      { id: 'l2-d1-q4', text: 'Số liền sau của số lớn nhất có hai chữ số là:', options: ['99', '98', '100', '101'], correctAnswerIndex: 2 },
      { id: 'l2-d1-q5', text: '8dm 5cm = .... cm. Số thích hợp điền vào chỗ chấm là:', options: ['85', '58', '13', '805'], correctAnswerIndex: 0 },
      { id: 'l2-d1-q6', text: 'Hình vẽ dưới đây có bao nhiêu hình tứ giác?', options: ['2', '3', '4', '5'], correctAnswerIndex: 1, visualType: 'quadrilateral_count' },
      { id: 'l2-d1-q7', text: 'Trong phép tính 62 - 27 = 35, số 62 được gọi là:', options: ['Số trừ', 'Số bị trừ', 'Hiệu', 'Số hạng'], correctAnswerIndex: 1 },
      { id: 'l2-d1-q8', text: 'Kết quả của phép tính 9 + 5 + 6 là:', options: ['14', '20', '19', '21'], correctAnswerIndex: 1 },
      { id: 'l2-d1-q9', text: 'Hôm nay là thứ Ba ngày 12 tháng 12. Thứ Ba tuần sau là ngày:', options: ['Ngày 18', 'Ngày 19', 'Ngày 20', 'Ngày 5'], correctAnswerIndex: 1 },
      { id: 'l2-d1-q10', text: 'Đoạn thẳng AB dài 15cm, đoạn thẳng BC dài 2dm. Cả hai đoạn dài là:', options: ['17cm', '35cm', '25cm', '215cm'], correctAnswerIndex: 1 }
    ]
  },
  {
    id: 'l2-de-2',
    title: 'Đề thi Học kỳ 1 - Đề số 2',
    grade: Grade.Grade2,
    description: 'Nội dung: Số bị trừ-số trừ, đơn vị kg/lít, xem giờ, bài toán ít hơn.',
    questions: [
      { id: 'l2-d2-q1', text: 'Hiệu của 71 và 26 là:', options: ['45', '55', '35', '56'], correctAnswerIndex: 0 },
      { id: 'l2-d2-q2', text: 'Tìm x: 80 - x = 34', options: ['x = 46', 'x = 56', 'x = 114', 'x = 54'], correctAnswerIndex: 0 },
      { id: 'l2-d2-q3', text: 'Đồng hồ đang chỉ mấy giờ?', options: ['8 giờ', '4 giờ', '3 giờ', '12 giờ'], correctAnswerIndex: 2, visualType: 'clock_analog', visualData: { hour: 3, minute: 0 } },
      { id: 'l2-d2-q4', text: 'Bao gạo nặng 42kg, bao ngô nhẹ hơn bao gạo 15kg. Bao ngô nặng:', options: ['57kg', '27kg', '37kg', '17kg'], correctAnswerIndex: 1 },
      { id: 'l2-d2-q5', text: 'Thùng thứ nhất có 35 lít dầu, thùng thứ hai có 28 lít dầu. Cả hai thùng có:', options: ['53 lít', '63 lít', '57 lít', '67 lít'], correctAnswerIndex: 1 },
      { id: 'l2-d2-q6', text: 'Hình vẽ có bao nhiêu hình tam giác?', options: ['3', '4', '5', '6'], correctAnswerIndex: 3, visualType: 'triangle_count_complex' },
      { id: 'l2-d2-q7', text: 'Số gồm 7 chục và 5 đơn vị được viết là:', options: ['57', '705', '75', '70'], correctAnswerIndex: 2 },
      { id: 'l2-d2-q8', text: 'Nếu ngày 1 tháng 12 là thứ Sáu thì ngày 3 tháng 12 là:', options: ['Thứ Bảy', 'Chủ Nhật', 'Thứ Hai', 'Thứ Ba'], correctAnswerIndex: 1 },
      { id: 'l2-d2-q9', text: 'Dãy số: 15, 20, 25, 30, ... Số tiếp theo là:', options: ['31', '35', '40', '45'], correctAnswerIndex: 1 },
      { id: 'l2-d2-q10', text: 'Tính: 100 - 45 - 15 = ?', options: ['55', '40', '30', '70'], correctAnswerIndex: 1 }
    ]
  },
  // ==========================================
  // TOÁN LỚP 4 - BỘ ĐỀ CHUẨN (20 ĐỀ)
  // ==========================================
  {
    id: 'l4-de-1',
    title: 'Đề thi Học kỳ 1 - Đề số 1',
    grade: Grade.Grade4,
    description: 'Nội dung: Số triệu, Trung bình cộng, Tổng-Hiệu, Thế kỷ.',
    questions: [
      { id: 'l4-d1-q1', text: 'Số "Ba mươi triệu năm trăm linh hai nghìn" viết là:', options: ['30 502 000', '30 520 000', '30 052 000', '3 502 000'], correctAnswerIndex: 0 },
      { id: 'l4-d1-q2', text: 'Giá trị chữ số 8 trong số 18 903 456 là:', options: ['8 000', '800 000', '8 000 000', '80 000'], correctAnswerIndex: 2 },
      { id: 'l4-d1-q3', text: 'Trung bình cộng của hai số là 45. Số thứ nhất là 38, số thứ hai là:', options: ['52', '45', '7', '90'], correctAnswerIndex: 0 },
      { id: 'l4-d1-q4', text: 'Năm 1010 Lý Thái Tổ dời đô về Thăng Long. Năm đó thuộc thế kỷ:', options: ['Thế kỷ 9', 'Thế kỷ 10', 'Thế kỷ 11', 'Thế kỷ 12'], correctAnswerIndex: 2 },
      { id: 'l4-d1-q5', text: '3 tấn 5 tạ = ... kg. Số thích hợp là:', options: ['350', '3050', '3500', '3005'], correctAnswerIndex: 2 },
      { id: 'l4-d1-q6', text: 'Hai số có tổng là 120 và hiệu là 40. Số lớn là:', options: ['40', '60', '80', '100'], correctAnswerIndex: 2 },
      { id: 'l4-d1-q7', text: 'Số nào dưới đây vừa chia hết cho 2 vừa chia hết cho 5?', options: ['125', '450', '322', '1001'], correctAnswerIndex: 1 },
      { id: 'l4-d1-q8', text: 'Trong hình vẽ, hai đường thẳng AB và CD có quan hệ gì?', options: ['Song song', 'Vuông góc', 'Cắt nhau', 'Trùng nhau'], correctAnswerIndex: 0, visualType: 'geometry_lines', visualData: { relation: 'parallel' } },
      { id: 'l4-d1-q9', text: 'Một hình chữ nhật có nửa chu vi là 24cm, chiều dài hơn chiều rộng 4cm. Diện tích là:', options: ['140 cm2', '96 cm2', '80 cm2', '480 cm2'], correctAnswerIndex: 0 },
      { id: 'l4-d1-q10', text: 'Góc nhọn là góc có số đo như thế nào với góc vuông?', options: ['Bằng', 'Lớn hơn', 'Nhỏ hơn', 'Bằng một nửa'], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 'l4-de-2',
    title: 'Đề thi Học kỳ 1 - Đề số 2',
    grade: Grade.Grade4,
    description: 'Nội dung: Hàng và lớp, đơn vị m2, góc tù-nhọn, trung bình cộng nhiều xe.',
    questions: [
      { id: 'l4-d2-q1', text: 'Số lớn nhất có sáu chữ số khác nhau là:', options: ['999 999', '987 654', '102 345', '987 650'], correctAnswerIndex: 1 },
      { id: 'l4-d2-q2', text: '4m2 5dm2 = ... dm2', options: ['45', '405', '450', '4005'], correctAnswerIndex: 1 },
      { id: 'l4-d2-q3', text: 'Chữ số 7 trong số 472 300 thuộc hàng nào, lớp nào?', options: ['Hàng nghìn, lớp nghìn', 'Hàng chục nghìn, lớp nghìn', 'Hàng triệu, lớp triệu', 'Hàng chục nghìn, lớp đơn vị'], correctAnswerIndex: 1 },
      { id: 'l4-d2-q4', text: 'Góc tù là góc:', options: ['Lớn hơn góc vuông', 'Nhỏ hơn góc vuông', 'Bằng góc bẹt', 'Bằng góc vuông'], correctAnswerIndex: 0 },
      { id: 'l4-d2-q5', text: 'Trung bình cộng của 35, 40, 45, 50 là:', options: ['40', '42', '43', '42.5'], correctAnswerIndex: 3 },
      { id: 'l4-d2-q6', text: 'Hai đường thẳng vuông góc tạo ra mấy góc vuông?', options: ['1', '2', '3', '4'], correctAnswerIndex: 3, visualType: 'geometry_lines', visualData: { relation: 'perpendicular' } },
      { id: 'l4-d2-q7', text: 'Một đội công nhân ngày 1 sửa được 150m đường, ngày 2 sửa được gấp đôi ngày 1. TBC mỗi ngày là:', options: ['150m', '200m', '225m', '300m'], correctAnswerIndex: 2 },
      { id: 'l4-d2-q8', text: 'Số chia hết cho 3 là số có:', options: ['Chữ số tận cùng là 3', 'Tổng các chữ số chia hết cho 3', 'Chữ số tận cùng là 0, 3, 6, 9', 'Hiệu các chữ số chia hết cho 3'], correctAnswerIndex: 1 },
      { id: 'l4-d2-q9', text: 'Thế kỷ 21 bắt đầu từ năm nào?', options: ['2000', '2001', '2100', '1999'], correctAnswerIndex: 1 },
      { id: 'l4-d2-q10', text: 'Diện tích hình vuông có chu vi 20cm là:', options: ['25 cm2', '20 cm2', '400 cm2', '100 cm2'], correctAnswerIndex: 0 }
    ]
  }
];

// Tạo tự động 18 đề còn lại cho mỗi lớp với dữ liệu biến đổi để tránh lặp lại
for (let i = 3; i <= 20; i++) {
  // Đề lớp 2
  SAMPLE_EXAMS.push({
    id: `l2-de-${i}`,
    title: `Đề số ${i} - Toán Lớp 2`,
    grade: Grade.Grade2,
    description: `Ôn tập tổng hợp kiến thức học kỳ 1 - Đề số ${i}`,
    questions: [
      { id: `l2-d${i}-q1`, text: `Đặt tính rồi tính: ${30+i} + ${20+i} = ?`, options: [`${50+2*i}`, `${40+2*i}`, `${60+2*i}`, `${50+i}`], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q2`, text: `Tìm x: x - ${15+i} = ${40+i}`, options: [`${55+2*i}`, `${25}`, `${55+i}`, '100'], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q3`, text: `Bao ngô nặng ${40+i}kg, bao thóc nặng hơn ${10+i}kg. Bao thóc nặng:`, options: [`${50+2*i}kg`, `${30}kg`, `${60}kg`, '100kg'], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q4`, text: `Số liền trước của ${90-i} là:`, options: [`${89-i}`, `${91-i}`, '80', '90'], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q5`, text: `Có ${i+5} lít dầu, thêm ${i+10} lít nữa. Tổng cộng:`, options: [`${2*i+15} lít`, '20 lít', '30 lít', '40 lít'], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q6`, text: `Đếm số hình tứ giác có trong hình sau:`, options: ['2', '3', '4', '5'], correctAnswerIndex: 1, visualType: 'quadrilateral_count' },
      { id: `l2-d${i}-q7`, text: `Hôm nay là ngày ${i+5}, thứ Hai. Thứ Hai tuần trước là ngày:`, options: [`${i+5-7 > 0 ? i+5-7 : 30+(i+5-7)}`, '1', '2', '3'], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q8`, text: `Số tròn chục lớn nhất bé hơn ${80+i} là:`, options: ['80', '90', '70', '100'], correctAnswerIndex: 0 },
      { id: `l2-d${i}-q9`, text: `1dm = .... cm`, options: ['1', '10', '100', '0'], correctAnswerIndex: 1 },
      { id: `l2-d${i}-q10`, text: `Tính: 10 + 20 + ${i} = ?`, options: [`${30+i}`, '30', '40', '50'], correctAnswerIndex: 0 }
    ]
  });

  // Đề lớp 4
  SAMPLE_EXAMS.push({
    id: `l4-de-${i}`,
    title: `Đề số ${i} - Toán Lớp 4`,
    grade: Grade.Grade4,
    description: `Ôn tập tổng hợp kiến thức học kỳ 1 - Đề số ${i}`,
    questions: [
      { id: `l4-d${i}-q1`, text: `Số gồm ${i} triệu, ${i*10} nghìn và 5 đơn vị:`, options: [`${i} ${i*10} 005`, `${i} 0${i*10} 005`, `${i} ${i*10} 050`, '5 000 000'], correctAnswerIndex: 1 },
      { id: `l4-d${i}-q2`, text: `TBC của ${10*i}, ${20*i}, ${30*i} là:`, options: [`${20*i}`, `${15*i}`, `${25*i}`, '100'], correctAnswerIndex: 0 },
      { id: `l4-d${i}-q3`, text: `Năm ${1500+i*10} thuộc thế kỷ:`, options: ['XV', 'XVI', 'XVII', 'XVIII'], correctAnswerIndex: (i*10 > 100 ? 2 : 1) },
      { id: `l4-d${i}-q4`, text: `${i} tạ ${i*2}kg = ... kg`, options: [`${i*100 + i*2}`, `${i*10 + i*2}`, '100', '200'], correctAnswerIndex: 0 },
      { id: `l4-d${i}-q5`, text: `Tổng hai số là ${200+i}, hiệu là ${20+i}. Số bé là:`, options: ['90', '100', '110', '120'], correctAnswerIndex: 0 },
      { id: `l4-d${i}-q6`, text: `Hình vẽ sau có các đường thẳng:`, options: ['Song song', 'Vuông góc', 'Cắt nhau', 'Trùng nhau'], correctAnswerIndex: 0, visualType: 'geometry_lines', visualData: { relation: 'parallel' } },
      { id: `l4-d${i}-q7`, text: `Giá trị biểu thức ${1000*i} : 5 là:`, options: [`${200*i}`, '200', '500', '1000'], correctAnswerIndex: 0 },
      { id: `l4-d${i}-q8`, text: `Số chia hết cho 5 nhưng không cho 2 là:`, options: ['10', '15', '20', '22'], correctAnswerIndex: 1 },
      { id: `l4-d${i}-q9`, text: `Góc bẹt bằng bao nhiêu độ?`, options: ['90', '180', '60', '360'], correctAnswerIndex: 1 },
      { id: `l4-d${i}-q10`, text: `Một mảnh đất hình chữ nhật có dài ${20+i}m, rộng ${10+i}m. Chu vi là:`, options: [`${(20+i+10+i)*2}m`, '60m', '100m', '200m'], correctAnswerIndex: 0 }
    ]
  });
}
