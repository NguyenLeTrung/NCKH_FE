import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassroomService} from "../../../../../core/service/service-model/classroom.service";
import {SubjectService} from "../../../../../core/service/service-model/subject.service";
import {TypeExamService} from "../../../../../core/service/service-model/type-exam.service";
import {ToastrService} from "ngx-toastr";
import { formatDate , Location} from '@angular/common';
import {QuestionService} from "../../../../../core/service/service-model/question.service";
import {SearchQuestionModel} from "../../../../../core/service/model/search-question.model";
import {Router} from "@angular/router";
import {ExamService} from "../../../../../core/service/service-model/exam.service";
import * as moment from 'moment';

@Component({
  selector: 'kt-create-update-exams',
  templateUrl: './create-update-exams.component.html',
  styleUrls: ['./create-update-exams.component.scss']
})
export class CreateUpdateExamsComponent implements OnInit {

  lstClass = [];
  demo;
  form: FormGroup;
  lstSubject = [];
  lstTypeExam = [];
  lstQuestion = [];
  lstFileSelection = [];
  lstQuestionExam = [];
  viewRandom = false;
  searchQuestion: SearchQuestionModel = new SearchQuestionModel();
  checkBoxAll = false;
  questionDetail: any = {};
  constructor(private fb: FormBuilder,
              private classroomService: ClassroomService,
              private subjectService: SubjectService,
              private typeExamService: TypeExamService,
              private toaStr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef,
              private questionService: QuestionService,
              private router: Router,
              private examService: ExamService) { }

  ngOnInit(): void {
    this.getListClass();
    this.getListTypeExam();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      classCode: new FormControl(null, [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      subjectCode: new FormControl(null, [Validators.required]),
      examType: new FormControl(null, [Validators.required]),
      beginExam: new FormControl(null,[Validators.required]),
      finshExam: new FormControl(null, [Validators.required]),
      durationExam: new FormControl(null, [Validators.required]),
      randomQuestion: new FormControl(false),
    })
  }

  getListClass(){
    this.classroomService.getAll().subscribe(res => {
      this.lstClass = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  getListTypeExam(){
    this.typeExamService.getAll().subscribe(res =>{
      this.lstTypeExam = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  submit(){
    const exam: any = {};
    exam.beginExam = moment.utc(this.getControl.beginExam.value);
    exam.durationExam = this.getControl.durationExam.value;
    exam.finishExam = moment.utc(this.getControl.finshExam.value);
    exam.subjectCode = this.getControl.subjectCode.value;
    exam.title = this.getControl.title.value;
    let lstData = [];
    let ls;
    if(this.lstQuestionExam.length !== 0){
      ls = this.lstQuestionExam.map(q => q.id).join(',');
    }else {
      this.toaStr.error("Bạn phải chọn câu hỏi");
      return;
    }
    exam.questionData = ls;
    this.examService.add(exam).subscribe(res =>{
      if(res !== null){
        this.toaStr.success("Tạo bài thi thành công!!!")
        this.cancel();
      }else{
        this.toaStr.error("Tạo bài thi thất bại!!!");
      }
    })

  }

  get getControl() {
    return this.form.controls;
  }

  changeClassroom(){
    const classCode = this.getControl.classCode.value;
    this.lstSubject = [];
    this.subjectService.findByClassCode(classCode).subscribe(res => {
      this.lstSubject = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  changeExamType(){
    const examType = this.getControl.examType.value;
    if(examType == 11){
      this.getControl.durationExam.setValue(15);
    }else if(examType === 12){
      this.getControl.durationExam.setValue(45);
    }else{
      this.getControl.durationExam.setValue(90);
    }
  }

  formatDate(date: any, format = 'yyyy-MM-dd') {
    return formatDate(date, format, 'en_US');
  }

  changeRandomQuestion(){
    const random = this.getControl.randomQuestion.value;
    if(random == true)
      this.viewRandom = true;
    else
      this.viewRandom = false;
  }

  changeSubject(){
    const subjectCode = this.getControl.subjectCode.value;
    this.searchQuestion.status = 1;
    this.searchQuestion.subjectCode = subjectCode;
    this.searchQuestion.name = '';
    this.lstQuestion = [];
    let lstData = [];
    this.questionService.findBySubjectCode(this.searchQuestion).subscribe(res => {
      this.lstQuestion = res;
      res.forEach(e =>{
        let item = {};
        let levelName;
        if(e.level === 0)
          levelName = 'Dễ';
        else if(e.level === 1)
          levelName = 'Trung bình';
        else
          levelName = 'Khó'
        item = {...this.questionDetail, id: e.id, questionType: e.questionType, questionTypeName: e.questionTypeName,
          questionText: e.questionText, subjectCode: e.subjectCode, level: levelName, point: e.point, checked: false};
        lstData = [...lstData, item];
      });
      this.lstQuestion = lstData;
      this.changeDetectorRef.detectChanges();
    })
  }

  changeCheckbox(){
    this.checkBoxAll = !this.checkBoxAll;
    this.lstQuestion.forEach(file => file.checked = this.checkBoxAll);
    this.lstFileSelection = this.checkBoxAll ? this.lstQuestion : [];
  }

  addQuestionExam(f){
    f.checked = !f.checked;
    if(f.checked === true)
      this.lstQuestionExam.push(f);
    else
      this.lstQuestionExam.splice(this.lstQuestionExam.indexOf(f),1);
  }
  deleteQuestion(i, f){
    this.lstQuestionExam.splice(i, 1)
    // chuyển đổi checked của lstQuestion => false
    this.lstQuestion.forEach(e => {
      if(e.id === f.id){
        e.checked = false;
      }
    });
  }

  cancel(){
    this.router.navigate(['/system/manages-exam']);
  }
}
