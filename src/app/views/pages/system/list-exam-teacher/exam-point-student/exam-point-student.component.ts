import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExamService} from "../../../../../core/service/service-model/exam.service";
import {ActionClassStudentComponent} from "../../class-student/action-class-student/action-class-student.component";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";

@Component({
  selector: 'kt-exam-point-student',
  templateUrl: './exam-point-student.component.html',
  styleUrls: ['./exam-point-student.component.scss']
})
export class ExamPointStudentComponent implements OnInit {

  columnDefs;
  rowData;
  gridApi;
  gridColumnApi;
  headerHeight = 56;
  rowHeight = 50;
  currentPage = 1;
  _pageSize = 10;
  _page = 1;
  totalSchool = 0;
  first = 1;
  last = 10;
  total = 0;
  totalPage = 0;
  overlayNoRowsTemplate = "Không có thông tin";
  showPadding = true;
  rangeWithDots = [];
  listQuestion: any = [];
  subjecCode = null;
  lstStudent = [];
  queryParam;
  examId;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private examService: ExamService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.queryParam = param;
    });
    if(undefined !== this.queryParam.examId){
      this.examId = this.queryParam.examId;
    }
    this.columnDefs = [
      {
        headerName: "STT",
        valueGetter: (param) => {
          return param.node.rowIndex + ((this._page - 1) * this._pageSize + 1);
        },
        minWidth: 60,
        maxWidth: 60,
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          "align-items": "center",
          color: "#101840",
          display: "flex",
          left: "6px",
        },
      },
      {
        headerName: "Mã sinh viên",
        field: "code",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#3366FF",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        maxWidth: 200,
        tooltipField: "code",
      },
      {
        headerName: "Tên sinh viên",
        field: "fullName",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 126,
        tooltipField: "fullName",
      },
      {
        headerName: "Email",
        field: "email",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 126,
        tooltipField: "name",
      },
      {
        headerName: "SĐT",
        field: "phone",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 126,
        tooltipField: "name",
      },
      {
        headerName: "Điểm",
        field: "point",
        cellStyle: param=> {
          let color = '';
          if(param.data.point === 0)
            color = '#D14343';
          else
            color = '#3366FF';
          return {
              "font-weight": "500",
              "font-size": "12px",
              color: color,
              top: "13px",
              "white-space": "nowrap",
              "text-overflow": "ellipsis",
              overflow: "hidden",
          }
        },
        minWidth: 90,
        maxWidth: 90,
        tooltipField: "point",
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
  }

  ngOnInit(): void {
    this.getListPointStudent();
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.gridApi.setRowData(this.rowData);
  }

  gridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  // Danh sách điểm của sv
  getListPointStudent(){
    this.examService.getListPointExamStudent(this.examId).subscribe(res =>{
      this.lstStudent = res;
      this.changeDetectorRef.detectChanges();
    })
  }
}
