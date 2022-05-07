import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SubjectService} from "../../../../../core/service/service-model/subject.service";
import {lstLevel} from "../../../../../helpers/constants";
import {TypeQuestionService} from "../../../../../core/service/service-model/type-question.service";
import {ChoiceModel} from "../../../../../core/service/model/choice.model";
import {QuestionModel} from "../../../../../core/service/model/question.model";
import {QuestionService} from "../../../../../core/service/service-model/question.service";
import {ToastrService} from "ngx-toastr";
import {ChoiceService} from "../../../../../core/service/service-model/choice.service";

@Component({
  selector: 'kt-create-update-question',
  templateUrl: './create-update-question.component.html',
  styleUrls: ['./create-update-question.component.scss']
})
export class CreateUpdateQuestionComponent implements OnInit {

  form: FormGroup;
  listDemo = [
    {
      id: 0,
      name: 'Nguyễn Văn A'
    }
  ];
  demo;
  lstSubject = [];
  lstLevel = lstLevel;
  lstTypeQuestion = [];
  lstChoice = [];
  choice: ChoiceModel = new ChoiceModel();
  question: QuestionModel = new QuestionModel();
  action;
  questionUpdate;
  listChoiceUpdate = [];
  constructor(public dialogRef: MatDialogRef<CreateUpdateQuestionComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private subjectService: SubjectService,
              private typeQuestionService: TypeQuestionService,
              private changeDetectorRef: ChangeDetectorRef,
              private questionService: QuestionService,
              private toartr: ToastrService,
              private choiceService: ChoiceService) {
    this.action = data.action;
    if(this.action === 'update')
      this.questionUpdate = data.data;
    this.buildForm();
  }

  ngOnInit(): void {
    this.getListSubject();
    this.getListTypeQuestion();
    this.loadForm()
  }

  submit(){
    console.log(this.mapChoice(1));
    // Lưu thông tin của question
    this.question.subjectCode = this.getControl().subjectCode.value;
    this.question.questionText = this.getControl().questionText.value;
    this.question.questionType = this.getControl().questionType.value;
    this.question.level = this.getControl().level.value;
    this.question.point = 10;
    let dem = 0;
    this.questionService.add(this.question).subscribe(res => {
      if(res !== null){
        // Lưu đáp án
        this.lstChoice = this.mapChoice(res.id);
        this.lstChoice.forEach(e => {
          this.choiceService.add(e).subscribe(res =>{
            if(res !== null)
              dem++;
          })
        })
        // Kiểm tra lưu đáp án
        if(this.action === 'create')
          this.toartr.success('Thêm mới thành công!');
        else
          this.toartr.success('Cập nhật thành công!');
        this.dialogRef.close({event: 'add'});
        return;
      }else{
        this.toartr.error('Tạo câu hỏi thất bại!!!')
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }
  buildForm(){
    this.form = this.fb.group({
      subjectCode: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      questionText: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      level: new FormControl(null),
      point: new FormControl(null),
      teacher: new FormControl(null),
      name: new FormControl(null),
      questionType: new FormControl(null),
      choiceText1: new FormControl(null),
      choiceText2: new FormControl(null),
      choiceText3: new FormControl(null),
      choiceText4: new FormControl(null),
      corrected1: new FormControl(true),
      corrected2: new FormControl(false),
      corrected3: new FormControl(false),
      corrected4: new FormControl(false),
    })
  }

  get code(){
    return this.form.get('code');
  }

  get name(){
    return this.form.get('name');
  }

  get teacher(){
    return this.form.get('teacher');
  }

  getControl(){
    return this.form.controls;
  }

  getListSubject(){
    this.subjectService.getAll().subscribe(res =>{
      this.lstSubject = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  getListTypeQuestion(){
    this.typeQuestionService.getAll().subscribe(res =>{
      this.lstTypeQuestion = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  changeQuestionType(){
    const questionType = this.getControl().questionType.value;
    console.log(questionType);
    if(questionType === 0){
      for(let i = 0; i < 2; i++){
        this.lstChoice.push(this.choice);
      }
    }else if(questionType === 1){
      for(let i = 0; i < 5; i++){
        this.lstChoice.push(this.choice);
      }
    }else {
      for(let i = 0; i < 5; i++){
        this.lstChoice.push(this.choice);
      }
    }
  }

  mapChoice(questionId){
    let choic = {};
    let list = [];
    choic = {...choic,questionId: questionId, choiceText: this.getControl().choiceText1.value, corrected: this.getControl().corrected1.value}
    list = [...list, choic];

    choic = {...choic,questionId: questionId, choiceText: this.getControl().choiceText2.value, corrected: this.getControl().corrected2.value}
    list = [...list, choic];

    choic = {...choic,questionId: questionId, choiceText: this.getControl().choiceText3.value, corrected: this.getControl().corrected3.value}
    list = [...list, choic];

    choic = {...choic,questionId: questionId, choiceText: this.getControl().choiceText4.value, corrected: this.getControl().corrected4.value}
    list = [...list, choic];
    return list;
  }

  loadForm() {
    if (this.action === 'update') {
      // tslint:disable-next-line:forin
      for (const controlName in this.form.controls) {
        this.form.get(controlName).setValue(this.questionUpdate[controlName]);
      }
      // Giá trị các câu hỏi
      this.questionService.findById(this.questionUpdate.id).subscribe(res => {
        if(res !== null){

          this.listChoiceUpdate = res.lstChoice;
          console.log(this.listChoiceUpdate);
          this.getControl().questionType.setValue(res.questionType);
          if(this.listChoiceUpdate.length !== 0){
            // for (let i = 0; i < this.listChoiceUpdate.length; i++){
            //   this.getControl().choiceText[i+1].setValue(this.listChoiceUpdate[i].choiceText);
            //   this.getControl().corrected[i+1].setValue(this.listChoiceUpdate[i].corrected);
            // }
            this.getControl().choiceText1.setValue(this.listChoiceUpdate[0].choiceText);
            if(this.listChoiceUpdate[0].corrected === 'true')
              this.getControl().corrected1.setValue(true);
            else
              this.getControl().corrected1.setValue(false);
            this.getControl().choiceText2.setValue(this.listChoiceUpdate[1].choiceText);
            if(this.listChoiceUpdate[1].corrected === 'true')
              this.getControl().corrected2.setValue(true);
            else
              this.getControl().corrected2.setValue(false);
            this.getControl().choiceText3.setValue(this.listChoiceUpdate[2].choiceText);
            if(this.listChoiceUpdate[2].corrected === 'true')
              this.getControl().corrected3.setValue(true);
            else
              this.getControl().corrected3.setValue(false);
            this.getControl().choiceText4.setValue(this.listChoiceUpdate[3].choiceText);
            if(this.listChoiceUpdate[3].corrected === 'true')
              this.getControl().corrected4.setValue(true);
            else
              this.getControl().corrected4.setValue(false);
          }
        }
      });
      this.changeDetectorRef.detectChanges();
    }
  }
}
