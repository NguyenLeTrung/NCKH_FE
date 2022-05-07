import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Router} from "@angular/router";
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'kt-detail-list-exam-point',
  templateUrl: './detail-list-exam-point.component.html',
  styleUrls: ['./detail-list-exam-point.component.scss']
})
export class DetailListExamPointComponent implements OnInit, ICellRendererAngularComp {

  rowIndex;
  cellValue;
  exam;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewPointExam(){
    this.router.navigate(['/system/point-exam-student'], {
      queryParams: {
        examId: this.exam.id,
      }
    });
  }

  agInit(params ): void {
    this.rowIndex = +params.rowIndex + 1;
    this.cellValue = params;
    this.exam = params.data;
  }

  refresh(params) {
    return true;
  }

  disableButton(){
    const dayValue = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    const finshExam = formatDate(this.exam.finishExam, 'yyyy/MM/dd', 'en')
    if(dayValue > finshExam){
      return true;
    }else{
      return false;
    }
  }
}
