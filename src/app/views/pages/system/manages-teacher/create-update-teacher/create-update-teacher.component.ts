import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TeacherService} from "../../../../../core/service/service-model/teacher.service";
import {TeacherModel} from "../../../../../core/service/model/teacher.model";

@Component({
  selector: 'kt-create-update-teacher',
  templateUrl: './create-update-teacher.component.html',
  styleUrls: ['./create-update-teacher.component.scss']
})
export class CreateUpdateTeacherComponent implements OnInit {

  form: FormGroup;
  action;
  teacher: TeacherModel = new TeacherModel();

  constructor(public dialogRef: MatDialogRef<CreateUpdateTeacherComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private toaStr: ToastrService,
              private teacherService: TeacherService) {
    this.action = data.action;
    if(this.action === 'update')
      this.teacher = data.data;
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadForm();
  }

  buildForm(){
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      fullName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      email: new FormControl('', [Validators.maxLength(250)]),
      phone: new FormControl('', [ Validators.maxLength(10)]),
    })
  }

  submit(){
    this.teacher.code = this.getControl.code.value;
    this.teacher.fullName = this.getControl.fullName.value;
    this.teacher.email = this.getControl.email.value;
    this.teacher.phone = this.getControl.phone.value;
    this.teacherService.add(this.teacher).subscribe(res =>{
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

  get getControl() {
    return this.form.controls;
  }

  cancel(){
    this.dialogRef.close();
  }

  loadForm() {
    if (this.action === 'update') {
      // tslint:disable-next-line:forin
      for (const controlName in this.form.controls) {
        this.form.get(controlName).setValue(this.teacher[controlName]);
      }
    }
  }

  get code(){
    return this.form.get('code');
  }

  get name(){
    return this.form.get('name');
  }

  get fullName(){
    return this.form.get('fullName');
  }
}
