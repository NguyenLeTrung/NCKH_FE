import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ExamModel} from "../../../../../core/service/model/exam.model";
import {Subscription, timer} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {QuestionService} from "../../../../../core/service/service-model/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamService} from "../../../../../core/service/service-model/exam.service";
import {QuestionModel} from "../../../../../core/service/model/question.model";

@Component({
  selector: 'kt-result-exam-student',
  templateUrl: './result-exam-student.component.html',
  styleUrls: ['./result-exam-student.component.scss']
})
export class ResultExamStudentComponent implements OnInit {

  queryParam;
  resultExam: QuestionModel[];
  studentCode;
  examUserId;
  lstQuestionResult: [];
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private questionService: QuestionService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private examService: ExamService) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.queryParam = param;
    });
    if(this.queryParam !== null && this.queryParam !== undefined)
      this.examUserId = this.queryParam.id;
    this.studentCode = JSON.parse(localStorage.getItem('currentUser')).login;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.examService.getResultExam(this.queryParam.id).subscribe(res =>{
      this.resultExam = res;
      this.lstQuestionResult = JSON.parse('[' + res.answerSheet + ']');
      // @ts-ignore
      this.lstQuestionResult = this.lstQuestionResult[0];
      console.log(this.lstQuestionResult);
      this.changeDetectorRef.detectChanges();
    })
  }

  cancel(){
    this.router.navigate(['/system/exam-student']);
  }

  check(choice:any, corrected:any){
    if(choice === '1' && corrected === 'false')
      return true;
    else
      return false;
  }
}