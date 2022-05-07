import {QuestionModel} from "./question.model";

export class ExamModel{
  id: number;
  beginExam: Date;
  durationExam: number;
  finishExam: Date;
  questionData: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  status: Boolean;
  lstQuestion: QuestionModel[];
}
