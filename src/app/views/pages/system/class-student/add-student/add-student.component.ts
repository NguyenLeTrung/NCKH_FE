import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassroomService} from "../../../../../core/service/service-model/classroom.service";
import {ToastrService} from "ngx-toastr";
import {TeacherService} from "../../../../../core/service/service-model/teacher.service";
import {StudentService} from "../../../../../core/service/service-model/student.service";
import {ClassroomStudentService} from "../../../../../core/service/service-model/classroom-student.service";

@Component({
  selector: 'kt-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  form: FormGroup;
  lstStudent = [];
  classCode;
  constructor(public dialogRef: MatDialogRef<AddStudentComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private toaStr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef,
              private studentService: StudentService,
              private classStudentService: ClassroomStudentService) {
    this.classCode = data.classCode;
  }

  ngOnInit(): void {
    this.formBuild();
    this.getListStudent();
  }

  formBuild(){
    this.form = this.fb.group({
      student: new FormControl(null, [Validators.required])
    })
  }
  cancel(){
    this.dialogRef.close();
  }

  submit(){
    const classStudent: any = {};
    classStudent.classCode = this.classCode;
    classStudent.studentCode = this.student.value;
    this.classStudentService.addClassroom(classStudent).subscribe(res =>{
      if(res !== null){
        this.toaStr.success("Thêm sinh viên vào lớp thành công !!!");
        this.dialogRef.close();
      }else{
        this.toaStr.error("Thêm sinh viên vào lớp thất bại !!!");
      }
    })
  }

  get student(){
    return this.form.get('student');
  }

  getListStudent(){
    this.classStudentService.listStudent(this.classCode).subscribe(res => {
      // this.lstStudent = res;
      let list = [];
      res.forEach(item => {
        let customItem = {};
        customItem = {...item, name: item.fullName};
        list = [...list, customItem];
      });
      this.lstStudent = list;
      this.changeDetectorRef.detectChanges();
    })
  }
}
