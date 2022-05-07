import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SubjectService} from "../../../../../core/service/service-model/subject.service";
import {ToastrService} from "ngx-toastr";
import {ClassroomService} from "../../../../../core/service/service-model/classroom.service";

@Component({
  selector: 'kt-create-update-subject',
  templateUrl: './create-update-subject.component.html',
  styleUrls: ['./create-update-subject.component.scss']
})
export class CreateUpdateSubjectComponent implements OnInit {

  form: FormGroup;
  listDemo = [
    {
      id: 0,
      name: 'Nguyễn Văn A'
    }
  ];
  demo;
  listClass = [];
  subject;
  action;
  constructor(public dialogRef: MatDialogRef<CreateUpdateSubjectComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb:FormBuilder,
              private subjectService: SubjectService,
              private toaStr: ToastrService,
              private classroomService: ClassroomService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.subject = data.data;
    this.action = data.action;
    this.buildForm();
  }

  ngOnInit(): void {
    this.getListClassroom();
    this.loadForm();
  }

  buildForm(){
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.maxLength(50)], [this.subjectService.validateCode()]),
      name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      classCode: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    const subject: any = {};
    if(this.action === 'update'){
      subject.id = this.subject.id;
    }
    subject.code = this.getControl.code.value;
    subject.name = this.getControl.name.value;
    subject.classCode = this.getControl.classCode.value;
    console.log(subject);
    this.subjectService.add(subject).subscribe(res =>{
      if(res !== null){
        if(this.action === 'create')
          this.toaStr.success('Thêm mới thành công!');
        else
          this.toaStr.success('Cập nhật thành công!');
        this.dialogRef.close({event: 'add'});
        return;
      }else{
        if(this.action === 'create')
          this.toaStr.error('Thêm mới thất bại!');
        else
          this.toaStr.error('Cập nhật thất bại!');
      }
    })
  }

  getListClassroom(){
    this.classroomService.getAll().subscribe(res =>{
      this.listClass = res;
      console.log(this.listClass);
      this.changeDetectorRef.detectChanges();

    })
  }

  cancel(){
    this.dialogRef.close();
  }

  get getControl() {
    return this.form.controls;
  }

  loadForm() {
      if (this.action === 'update') {
        // tslint:disable-next-line:forin
        for (const controlName in this.form.controls) {
          this.form.get(controlName).setValue(this.subject[controlName]);
        }
        this.getControl.code.clearValidators();
        this.form.updateValueAndValidity();
        this.getControl.code.disable();
      }
  }
}
