import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {TeacherService} from "../../../../../core/service/service-model/teacher.service";
import {StudentService} from "../../../../../core/service/service-model/student.service";
import {StudentModel} from "../../../../../core/service/model/student.model";

@Component({
  selector: 'kt-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrls: ['./create-update-student.component.scss']
})
export class CreateUpdateStudentComponent implements OnInit {

  form: FormGroup;
  action;
  student: StudentModel = new StudentModel();
  constructor(public dialogRef: MatDialogRef<CreateUpdateStudentComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private toaStr: ToastrService,
              private studentService: StudentService) {
    this.action = data.action;
    if(this.action === 'update')
      this.student = data.data;
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadForm()
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
    console.log(this.student);
    this.student.code = this.getControl.code.value;
    this.student.fullName = this.getControl.fullName.value;
    this.student.email = this.getControl.email.value;
    this.student.phone = this.getControl.phone.value;
    console.log(this.student);
    this.studentService.add(this.student).subscribe(res =>{
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
        this.form.get(controlName).setValue(this.student[controlName]);
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
