import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'kt-view-class-student',
  templateUrl: './view-class-student.component.html',
  styleUrls: ['./view-class-student.component.scss']
})
export class ViewClassStudentComponent implements OnInit, ICellRendererAngularComp {

  rowIndex;
  cellValue;
  classroom;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewClassStudent(){
    this.router.navigate(['/system/classroom-student'], {
      queryParams: {
        classCode: this.classroom.code,
      }
    });
  }

  agInit(params ): void {
    this.rowIndex = +params.rowIndex + 1;
    this.cellValue = params;
    this.classroom = params.data;
  }

  refresh(params) {
    return true;
  }
}
