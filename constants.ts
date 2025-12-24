
import { Exam, Grade } from './types';

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'l2-hk1-01',
    title: 'Đề thi Học kỳ 1 - Đề số 1',
    grade: Grade.Grade2,
    description: 'Bao gồm kiến thức về phép cộng, phép trừ có nhớ trong phạm vi 100, đo lường và hình học cơ bản.',
    questions: [
      {
        id: 'q1',
        text: 'Tính: 38 + 25 = ?',
        options: ['53', '63', '58', '68'],
        correctAnswerIndex: 1,
        explanation: '38 + 25: Ta lấy 8 + 5 = 13, viết 3 nhớ 1. 3 + 2 = 5, thêm 1 là 6. Kết quả là 63.'
      },
      {
        id: 'q2',
        text: 'Trong phép trừ 72 - 45, số hiệu là bao nhiêu?',
        options: ['27', '37', '17', '33'],
        correctAnswerIndex: 0,
        explanation: '72 - 45 = 27.'
      },
      {
        id: 'q3',
        text: 'Hình vẽ có bao nhiêu hình tam giác?',
        options: ['2', '3', '4', '5'],
        correctAnswerIndex: 1,
        explanation: 'Cần đếm kỹ các hình đơn và hình ghép.'
      },
      {
        id: 'q4',
        text: 'Một sợi dây dài 5dm, đổi ra xăng-ti-mét là:',
        options: ['5 cm', '50 cm', '500 cm', '0.5 cm'],
        correctAnswerIndex: 1,
        explanation: '1dm = 10cm, nên 5dm = 50cm.'
      }
    ]
  },
  {
    id: 'l4-hk1-01',
    title: 'Đề thi Học kỳ 1 - Đề số 1',
    grade: Grade.Grade4,
    description: 'Kiến thức về số tự nhiên đến lớp triệu, phép tính nhân chia, tính chất hình học và giải toán có lời văn.',
    questions: [
      {
        id: 'q1',
        text: 'Giá trị của chữ số 5 trong số 352,418 là:',
        options: ['500', '5,000', '50,000', '500,000'],
        correctAnswerIndex: 2,
        explanation: 'Chữ số 5 nằm ở hàng chục nghìn.'
      },
      {
        id: 'q2',
        text: 'Kết quả của phép tính 125 x 8 là:',
        options: ['1,000', '800', '1,200', '1,050'],
        correctAnswerIndex: 0,
        explanation: '125 nhân 8 bằng 1000.'
      },
      {
        id: 'q3',
        text: 'Góc nhọn là góc có số đo như thế nào?',
        options: ['Lớn hơn 90 độ', 'Bằng 90 độ', 'Nhỏ hơn 90 độ', 'Bằng 180 độ'],
        correctAnswerIndex: 2,
        explanation: 'Góc nhọn luôn nhỏ hơn góc vuông (90 độ).'
      },
      {
        id: 'q4',
        text: 'Trung bình cộng của hai số 24 và 36 là:',
        options: ['60', '30', '25', '32'],
        correctAnswerIndex: 1,
        explanation: '(24 + 36) : 2 = 60 : 2 = 30.'
      }
    ]
  }
];
