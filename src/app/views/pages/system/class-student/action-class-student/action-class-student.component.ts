import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {ManagesClassroomComponent} from "../../manages-classroom/manages-classroom.component";
import {ClassroomService} from "../../../../../core/service/service-model/classroom.service";
import {ToastrService} from "ngx-toastr";
import {ClassStudentComponent} from "../class-student.component";
import {ClassroomStudentService} from "../../../../../core/service/service-model/classroom-student.service";

@Component({
  selector: 'kt-action-class-student',
  templateUrl: './action-class-student.component.html',
  styleUrls: ['./action-class-student.component.scss']
})
export class ActionClassStudentComponent implements OnInit , ICellRendererAngularComp {

  cellValue
  rowIndex
  student;
  constructor(private matDialog: MatDialog,
              private classStudent: ClassStudentComponent,
              private classStudentService: ClassroomStudentService,
              private toast: ToastrService) { }

  ngOnInit(): void {
  }

  agInit(params ): void {
    this.cellValue = params;
    this.rowIndex = +params.rowIndex + 1;
    this.student = params.data;
  }

  refresh(params) {
    return true;
  }

  deleteStudent(){
    const dataConfirm = {title: 'Xóa sinh viên', message: 'Bạn có muốn xóa sinh viên khỏi lơp học?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        // Call API
        const classStudent: any = {};
        classStudent.classCode = this.student.classCode;
        classStudent.studentCode = this.student.studentCode;
        classStudent.id = this.student.id;
        this.classStudentService.deleteStudent(classStudent).subscribe(res => {
          if (res !== '1') {
            this.toast.success("Xóa thành công!");
            this.classStudent.findClassroomStudent(1);
          }else {
            this.toast.error("Xóa thất bại!");
          }
        });
      }
    });
  }
}
