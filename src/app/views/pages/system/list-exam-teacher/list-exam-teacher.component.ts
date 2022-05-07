import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {list_status, NO_ROW_GRID_TEMPLATE} from "../../../../helpers/constants";
import {ClassroomSearchModel} from "../../../../core/service/model/classroom-search.model";
import {Router} from "@angular/router";
import {ExamService} from "../../../../core/service/service-model/exam.service";
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import * as moment from "moment";
import {ActionManagesClassroomComponent} from "../manages-classroom/action-manages-classroom/action-manages-classroom.component";
import {DetailListExamPointComponent} from "./detail-list-exam-point/detail-list-exam-point.component";

@Component({
  selector: 'kt-list-exam-teacher',
  templateUrl: './list-exam-teacher.component.html',
  styleUrls: ['./list-exam-teacher.component.scss']
})
export class ListExamTeacherComponent implements OnInit {

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
  lstExam = [];
  totalClass = 0;
  classCode;
  queryParam;
  teacherCode;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private examService: ExamService,
              private commonService: CommonServiceService) {
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
        hide: true,
        minWidth: 10,
        maxWidth: 10,
        field: 'id',
      },
      {
        headerName: "Tiêu đề bài thi",
        field: "title",
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
        tooltipField: "title",
      },
      {
        headerName: "Môn học",
        field: "subjectCode",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 120,
        tooltipField: "subjectCode",
      },
      {
        headerName: "Thời gian làm bài",
        field: "durationExam",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 80,
        tooltipField: "durationExam",
      },
      {
        headerName: "Thời gian bắt đầu thi",
        field: "beginExam",
        cellRenderer: (param) => {
          return `${moment(param.data.beginExam).format("DD/MM/YYYY")}`;
        },
        tooltipValueGetter: (param) => {
          return `${moment(param.data.beginExam).format("DD/MM/YYYY")}`;
        },
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 100,
        tooltipField: "createDate",
      },
      {
        headerName: "Thời gian kết thúc thi",
        field: "finishExam",
        cellRenderer: (param) => {
          return `${moment(param.data.finishExam).format("DD/MM/YYYY")}`;
        },
        tooltipValueGetter: (param) => {
          return `${moment(param.data.finishExam).format("DD/MM/YYYY")}`;
        },
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 100,
        tooltipField: "finishExam",
      },
      {
        headerName: "Trạng thái",
        field: "status",
        valueGetter: param => {
          return param.data == null ? '' : param.data.status === true ? 'Đang hoạt động' : 'Khóa'
        },
        tooltipValueGetter: param => {
          return param.data == null ? '' : param.data.status === true ? 'Đang hoạt động' : 'Khóa'
        },
        cellStyle: param=>{
          let color = '';
          if(param.data.status === false){
            color = '#D14343';
          }else{
            color = '#52BD94';
          }
          return{
            'font-weight': '500',
            'font-size': '12px',
            top: '13px',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            overflow: 'hidden',
            color: color,
          }
        },
        minWidth: 100,
      },
      {
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: DetailListExamPointComponent,
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 50,
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
    this.teacherCode = JSON.parse(localStorage.getItem('currentUser')).login;
  }

  ngOnInit(): void {
    this.getListExamTeacherCode();
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

  getListExamTeacherCode(){
    this.examService.getListExamByTeacherCode(this.teacherCode).subscribe(res =>{
      this.lstExam = res;
      this.changeDetectorRef.detectChanges();
    })
  }
}
