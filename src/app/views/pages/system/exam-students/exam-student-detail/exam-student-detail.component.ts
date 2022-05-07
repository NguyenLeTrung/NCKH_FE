import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {QuestionService} from "../../../../../core/service/service-model/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamService} from "../../../../../core/service/service-model/exam.service";
import { formatDate } from '@angular/common';
import {ExamModel} from "../../../../../core/service/model/exam.model";
import {Subscription, timer} from "rxjs";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'kt-exam-student-detail',
  templateUrl: './exam-student-detail.component.html',
  styleUrls: ['./exam-student-detail.component.scss']
})
export class ExamStudentDetailComponent implements OnInit, OnDestroy {

  queryParam;
  examUser: ExamModel = new ExamModel();
  lstQuestion = [];
  questions = [];
  studentCode;
  examId;
  countDown: Subscription;
  tick = 1000;
  counter;
  time;
  constructor(private toaStr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef,
              private questionService: QuestionService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private examService: ExamService,
              private matDialog: MatDialog,) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.queryParam = param;
    });
    if(this.queryParam !== null && this.queryParam !== undefined)
      this.examId = this.queryParam.id;
    this.studentCode = JSON.parse(localStorage.getItem('currentUser')).login;
  }

  ngOnInit(): void {
    this.getData();
  }

  submit(){

    const dataConfirm = {title: 'Nộp bài thi', message: 'Bạn có muốn nộp bài thi?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        this.saveExam();
      }else{
        this.matDialog.closeAll();
      }
    });

  }

  getData(){
    this.examService.getDataExamUser(this.queryParam.id).subscribe(res =>{
      this.examUser = res;
      this.questions = this.examUser.lstQuestion;
      this.counter = res.durationExam * 60;
      this.time = res.durationExam * 60;
      this.startTimer();
      this.changeDetectorRef.detectChanges();
    })
  }

  formatDate(date: any, format = 'yyyy-MM-dd') {
    return formatDate(date, format, 'en_US');
  }

  cancel(){
    this.ngOnDestroy();
    this.router.navigate(['/system/exam-student']);
  }

  resultExam(id: number){
    this.ngOnDestroy();
    this.router.navigate(['/system/result-exam'],{
      queryParams: {
        id: id
      }
    });
  }

  chooseChoice(questionId, choiceId){
    const question = this.questions.find(x => x.id === questionId);
    question.lstChoice.map(x => x.id === choiceId ? (x.choice = 1): (x.choice = 0));
  }

  startTimer() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      } else {
        this.counter = 0;
        this.saveExam();
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.countDown.unsubscribe();
  }

  // Function nộp bài
  saveExam(){
    let sucess = 0;
    const total = this.questions.length;
    this.questions.forEach(e =>{
      e.lstChoice.forEach(ec =>{
        if(ec.choice === 1 && ec.corrected === 'true'){
          sucess = sucess + 1;
        }
      })
    })
    const point = parseFloat(((sucess * 1.0 / total) * 10).toString()).toFixed(2);
    const examUser:any = {};
    examUser.studentCode = this.studentCode;
    examUser.examId = this.examId;
    examUser.totalPoint = point;
    examUser.timeStart = new Date();
    examUser.timeFinish = new Date();
    examUser.timeRemaining = this.time - this.counter;
    examUser.lstQuestion = this.questions;
    console.log(this.questions);
    // return;
    this.examService.addExamUser(examUser).subscribe(res =>{
      if(res !== null){
        this.toaStr.success("Nộp bài thành công");
        this.resultExam(res.id);
      }else{
        this.toaStr.error("Nộp bài thất bại");
      }
    })
  }
}