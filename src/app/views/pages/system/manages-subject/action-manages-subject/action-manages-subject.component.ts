import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateClassroomComponent} from "../../manages-classroom/create-update-classroom/create-update-classroom.component";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {ManagesSubjectComponent} from "../manages-subject.component";
import {CreateUpdateSubjectComponent} from "../create-update-subject/create-update-subject.component";
import {ToastrService} from "ngx-toastr";
import {SubjectService} from "../../../../../core/service/service-model/subject.service";

@Component({
  selector: 'kt-action-manages-subject',
  templateUrl: './action-manages-subject.component.html',
  styleUrls: ['./action-manages-subject.component.scss']
})
export class ActionManagesSubjectComponent implements OnInit, ICellRendererAngularComp {

  cellValue;
  rowIndex;
  subject: any;
  constructor(private matDialog: MatDialog,
              private managesSubject: ManagesSubjectComponent,
              private toast: ToastrService,
              private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  agInit(params ): void {
    this.cellValue = params;
    this.rowIndex = +params.rowIndex + 1;
    this.subject = params.data;
  }

  refresh(params) {
    return true;
  }

  openUpdateClassroom(){
    const dataSubject : any = {};
    dataSubject.action = 'update';
    dataSubject.data = this.subject;
    console.log(this.subject);
    this.matDialog.open(
      CreateUpdateSubjectComponent,{
        data: dataSubject,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.managesSubject.findSubject(1);
      }
    });
  }

  openDeleteClassroom(){
    const dataConfirm = {title: 'Xóa môn học', message: 'Bạn có muốn xóa môn học?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        // Call API
        this.subjectService.delete(this.subject).subscribe(res => {
          if (res !== null) {
            this.toast.success("Xóa thành công!");
            this.managesSubject.findSubject(1);
          }else {
            this.toast.error("Xóa thất bại!");
          }
        });
      }
    });
  }
}
