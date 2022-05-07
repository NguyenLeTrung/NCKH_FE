import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/core/service/service-model/classroom.service';
import {TeacherService} from "../../../../../core/service/service-model/teacher.service";

@Component({
  selector: 'kt-create-update-classroom',
  templateUrl: './create-update-classroom.component.html',
  styleUrls: ['./create-update-classroom.component.scss']
})
export class CreateUpdateClassroomComponent implements OnInit {

  form: FormGroup;
  listDemo = [
    {
      id: 0,
      name: 'Nguyễn Văn A'
    }
  ];
  demo;
  action;
  classroom;
  lstTeacher = [];
  constructor(public dialogRef: MatDialogRef<CreateUpdateClassroomComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private classroomService: ClassroomService,
              private toaStr: ToastrService,
              private teacherService: TeacherService,
              private changeDetectorRef: ChangeDetectorRef) {
      this.action = data.action;
      this.classroom = data.data;
      this.buildForm();
    }

  ngOnInit(): void {
    this.getListTeacher();
    this.loadForm();
    // this.buildForm();
  }

  submit(){
    const classroom: any = {};
    if(this.action === 'update')
      classroom.id = this.classroom.id;
    classroom.code = this.getControl.code.value;
    classroom.name = this.getControl.name.value;
    classroom.teacherCode = this.getControl.teacher.value;
    this.classroomService.addClassroom(classroom).subscribe(res =>{
      if(res !== null){
        this.toaStr.success('Thêm mới thành công!');
        this.dialogRef.close({event: 'add'});
        console.log('add');
        return;
      }else{
        this.toaStr.error('Thêm mới thất bại!');
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }
  buildForm(){
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      teacher: new FormControl(null)
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

  get getControl() {
    return this.form.controls;
  }

  loadForm() {
    if (this.action === 'update') {
      // tslint:disable-next-line:forin
      for (const controlName in this.form.controls) {
        this.form.get(controlName).setValue(this.classroom[controlName]);
      }
    }
    this.getControl.teacher.setValue(this.classroom.teacherCode);
  }

  getListTeacher(){
    this.teacherService.getAll().subscribe(res =>{
      this.lstTeacher = res;
      let list = [];
      res.forEach(item => {
        let customItem = {};
        customItem = {...item, name: item.fullName};
        list = [...list, customItem];
      });
      this.lstTeacher = list;
      this.changeDetectorRef.detectChanges();
    })
  }
}
