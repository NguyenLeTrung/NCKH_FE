import {ChoiceModel} from "./choice.model";

export class QuestionModel{
  id: number;
  questionType: string;
  questionText: string;
  subjectCode: string;
  level: number;
  point: number;
  status: boolean;
  lstChoice: ChoiceModel[];
}
