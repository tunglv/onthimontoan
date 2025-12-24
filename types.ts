
export enum Grade {
  Grade2 = 2,
  Grade4 = 4
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  grade: Grade;
  description: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  selectedIndex: number;
}
