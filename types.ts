
export enum Grade {
  Grade2 = 2,
  Grade4 = 4
}

export type VisualType = 
  | 'triangle_count_complex' 
  | 'quadrilateral_count'
  | 'geometry_shapes' 
  | 'measurement_ruler' 
  | 'fraction_grid' 
  | 'clock_analog' 
  | 'counting_grid'
  | 'geometry_lines' // Cho lớp 4: song song, vuông góc
  | 'none';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  visualType?: VisualType;
  visualData?: any;
}

export interface Exam {
  id: string;
  title: string;
  grade: Grade;
  description: string;
  questions: Question[];
  isAI?: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedIndex: number;
}
