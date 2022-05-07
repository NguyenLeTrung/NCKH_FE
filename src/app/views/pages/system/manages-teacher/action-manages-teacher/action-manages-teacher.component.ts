import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {CreateUpdateClassroomComponent} from "../../manages-classroom/create-update-classroom/create-update-classroom.component";
import {CreateUpdateTeacherComponent} from "../create-update-teacher/create-update-teacher.component";
import {ManagesTeacherComponent} from "../manages-teacher.component";
import {TeacherService} from "../../../../../core/service/service-model/teacher.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'kt-action-manages-teacher',
  templateUrl: './action-manages-teacher.component.html',
  styleUrls: ['./action-manages-teacher.component.scss']
})
export class ActionManagesTeacherComponent implements OnInit, ICellRendererAngularComp {

  cellValue;
  rowIndex;
  teacher;
  constructor(private matDialog: MatDialog,
              private managesTeacher: ManagesTeacherComponent,
              private teacherService: TeacherService,
              private toast: ToastrService) { }

  ngOnInit(): void {
  }

  agInit(params ): void {
    this.cellValue = params;
    this.rowIndex = +params.rowIndex + 1;
    this.teacher = params.data;
  }

  refresh(params) {
    return true;
  }

  openUpdateTeacher(){
    const dataClass : any = {};
    dataClass.action = 'update';
    dataClass.data = this.teacher;
    this.matDialog.open(
      CreateUpdateTeacherComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.managesTeacher.findTeacher(1);
      }
    });
  }

  openDeleteTeacher(){
    const dataConfirm = {title: 'Xóa giảng viên', message: 'Bạn có muốn xóa giáo viên?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        // Call API
        this.teacherService.delete(this.teacher).subscribe(res => {
          if (res !== null) {
            this.toast.success("Xóa thành công!");
            this.managesTeacher.findTeacher(1);
          }else {
            this.toast.error("Xóa thất bại!");
          }
        });
      }
    });
  }
}
