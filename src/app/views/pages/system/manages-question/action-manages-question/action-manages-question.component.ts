import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CreateUpdateStudentComponent} from "../../manages-student/create-update-student/create-update-student.component";
import {PopupConfirmComponent} from "../../popup-confirm/popup-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {ManagesStudentComponent} from "../../manages-student/manages-student.component";
import {ToastrService} from "ngx-toastr";
import {StudentService} from "../../../../../core/service/service-model/student.service";
import {ManagesQuestionComponent} from "../manages-question.component";
import {QuestionService} from "../../../../../core/service/service-model/question.service";
import {CreateUpdateQuestionComponent} from "../create-update-question/create-update-question.component";

@Component({
  selector: 'kt-action-manages-question',
  templateUrl: './action-manages-question.component.html',
  styleUrls: ['./action-manages-question.component.scss']
})
export class ActionManagesQuestionComponent implements OnInit, ICellRendererAngularComp {

  cellValue;
  rowIndex;
  question;
  constructor(private matDialog: MatDialog,
              private toast: ToastrService,
              private manageQuestion: ManagesQuestionComponent,
              private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  agInit(params ): void {
    this.cellValue = params;
    this.rowIndex = +params.rowIndex + 1;
    this.question = params.data;
  }

  refresh(params) {
    return true;
  }

  openUpdateQuestion(){
    const dataClass : any = {};
    dataClass.action = 'update';
    dataClass.data = this.question;
    this.matDialog.open(
      CreateUpdateQuestionComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.manageQuestion.findQuestion(1);
      }
    });
  }

  openDeleteQuestion(){
    const dataConfirm = {title: 'Đổi trạng thái câu hỏi', message: 'Bạn có muốn đổi trạng thái câu hỏi?'};
    this.matDialog.open(PopupConfirmComponent, {
      data: dataConfirm,
      disableClose: true,
      hasBackdrop: true,
      width: '420px'
    }).afterClosed().subscribe(res => {
      if (res.event === 'confirm') {
        // Call API
        this.questionService.delete(this.question).subscribe(res => {
          if (res !== null) {
            this.toast.success("Xóa thành công!");
            this.manageQuestion.findQuestion(1);
          }else {
            this.toast.error("Xóa thất bại!");
          }
        });
      }
    });
  }
}
