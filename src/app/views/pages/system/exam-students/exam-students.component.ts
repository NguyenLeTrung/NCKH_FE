import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchQuestionModel} from "../../../../core/service/model/search-question.model";
import {ClassroomService} from "../../../../core/service/service-model/classroom.service";
import {SubjectService} from "../../../../core/service/service-model/subject.service";
import {TypeExamService} from "../../../../core/service/service-model/type-exam.service";
import {ToastrService} from "ngx-toastr";
import {QuestionService} from "../../../../core/service/service-model/question.service";
import {Router} from "@angular/router";
import {ExamService} from "../../../../core/service/service-model/exam.service";
import { formatDate , Location} from '@angular/common';

@Component({
  selector: 'kt-exam-students',
  templateUrl: './exam-students.component.html',
  styleUrls: ['./exam-students.component.scss']
})
export class ExamStudentsComponent implements OnInit {

  studentCode;
  lstExamUser = [];
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private examService: ExamService) {
    this.studentCode = JSON.parse(localStorage.getItem('currentUser')).login;
  }

  ngOnInit(): void {
    this.getListExam();
  }

  getListExam(){
    this.examService.getListByStudentCode(this.studentCode).subscribe(res =>{
      this.lstExamUser = res;
      this.changeDetectorRef.detectChanges();
    })
  }
}
