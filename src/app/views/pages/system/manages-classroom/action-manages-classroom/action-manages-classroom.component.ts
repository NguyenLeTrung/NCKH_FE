import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {ImportClassroomComponent} from "../import-classroom/import-classroom.component";
import {CreateUpdateClassroomComponent} from "../create-update-classroom/create-update-classroom.component";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {ManagesClassroomComponent} from "../manages-classroom.component";
import {ClassroomService} from "../../../../../core/service/service-model/classroom.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'kt-action-manages-classroom',
  templateUrl: './action-manages-classroom.component.html',
  styleUrls: ['./action-manages-classroom.component.scss']
})
export class ActionManagesClassroomComponent implements OnInit , ICellRendererAngularComp {

  cellValue;
  rowIndex;
  classroom: any;
  constructor(private matDialog: MatDialog,
              private managesClassroom: ManagesClassroomComponent,
              private classroomService: ClassroomService,
              private toast: ToastrService) { }

  ngOnInit(): void {
  }

  agInit(params ): void {
    this.cellValue = params;
    this.rowIndex = +params.rowIndex + 1;
    this.classroom = params.data;
  }

  refresh(params) {
    return true;
  }

  openUpdateClassroom(){
    const dataClass : any = {};
    dataClass.action = 'update';
    dataClass.data = this.classroom;
    this.matDialog.open(
      CreateUpdateClassroomComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.managesClassroom.loadData();
      }
    });
  }

  openDeleteClassroom(){
    const dataConfirm = {title: 'Xóa lớp học', message: 'Bạn có muốn xóa lớp học?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        // Call API
        this.classroomService.delete(this.classroom).subscribe(res => {
          if (res !== null) {
            this.toast.success("Xóa thành công!");
            this.managesClassroom.findClassroom(1);
          }else {
            this.toast.error("Xóa thất bại!");
          }
        });
      }
    });
  }
}
