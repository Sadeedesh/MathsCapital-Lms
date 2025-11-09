export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: number; // For students
}

export type Grade = 6 | 7 | 8 | 9 | 10 | 11;
export type Curriculum = 'Local' | 'Edexcel' | 'Cambridge';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  grade: Grade;
  curriculum: Curriculum;
  topic: string;
  videoUrl?: string;
  pdfUrl?: string;
  notes?: string;
  createdAt: string;
  teacherId: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  grade: Grade;
  curriculum: Curriculum;
  topic: string;
  questions: QuizQuestion[];
  createdAt: string;
  teacherId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  studentId: string;
  answers: number[]; // Array of selected option indices
  score: number;
  submittedAt: string;
}

export interface StudentProgress {
  studentId: string;
  grade: Grade;
  lessonsCompleted: number;
  totalLessons: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  averageScore: number;
  rank?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  teacherId: string;
}

export interface TutorialSubmission {
  id: string;
  studentId: string;
  lessonId: string;
  content: string;
  submittedAt: string;
}

