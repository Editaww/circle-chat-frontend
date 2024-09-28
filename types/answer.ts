export type Answer = {
  id: string;
  userName: string;
  userId: string;
  answerText: string;
  date: Date;
  gainedLikeNumber: number;
  gainedDisLikeNumber: number;
  onDelete: (answerId: string) => void;
  questionId: string;
};
