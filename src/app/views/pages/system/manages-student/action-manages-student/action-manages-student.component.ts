import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateTeacherComponent} from "../../manages-teacher/create-update-teacher/create-update-teacher.component";
import {ManagesStudentComponent} from "../manages-student.component";
import {CreateUpdateStudentComponent} from "../create-update-student/create-update-student.component";
import {ToastrService} from "ngx-toastr";
import {StudentService} from "../../../../../core/service/service-model/student.service";

@Component({
  selector: 'kt-action-manages-student',
  templateUrl: './action-manages-student.component.html',
  styleUrls: ['./action-manages-student.component.scss']
})
export class ActionManagesStudentComponent implements OnInit, ICellRendererAngularComp {

  cellValue;
  rowIndex;
  student;
  constructor(private matDialog: MatDialog,
              private managesStudent: ManagesStudentComponent,
              private toast: ToastrService,
              private studentService: StudentService) { }

  ngOnInit(): void {
  }

  agInit(params ): void {
    this.cellValue = params;
    this.rowIndex = +params.rowIndex + 1;
    this.student = params.data;
    console.log(this.student);
  }

  refresh(params) {
    return true;
  }

  openUpdateStudent(){
    const dataClass : any = {};
    dataClass.action = 'update';
    dataClass.data = this.student;
    this.matDialog.open(
      CreateUpdateStudentComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.managesStudent.findStudent(1);
      }
    });
  }

  openDeleteStudent(){
    const dataConfirm = {title: 'Xóa sinh viên', message: 'Bạn có muốn xóa sinh viên?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        // Call API
        this.studentService.delete(this.student).subscribe(res => {
          if (res !== null) {
            this.toast.success("Xóa thành công!");
            this.managesStudent.findStudent(1);
          }else {
            this.toast.error("Xóa thất bại!");
          }
        });
      }
    });
  }
}
