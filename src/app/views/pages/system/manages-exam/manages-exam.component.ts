import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import {list_status, NO_ROW_GRID_TEMPLATE} from 'src/app/helpers/constants';
import {Router} from "@angular/router";
import {ExamService} from "../../../../core/service/service-model/exam.service";
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import {ClassroomSearchModel} from "../../../../core/service/model/classroom-search.model";
import {SubjectService} from "../../../../core/service/service-model/subject.service";

@Component({
  selector: 'kt-manages-exam',
  templateUrl: './manages-exam.component.html',
  styleUrls: ['./manages-exam.component.scss']
})
export class ManagesExamComponent implements OnInit {

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
  listStatus = list_status;
  searchExam: ClassroomSearchModel = new ClassroomSearchModel();
  lstSubject = [];
  constructor(private matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private examService: ExamService,
              private commonService: CommonServiceService,
              private subjectService: SubjectService
  ) {
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
        field: "subjectName",
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
        tooltipField: "subjectName",
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
        minWidth: 126,
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
        minWidth: 126,
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
        minWidth: 126,
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
        minWidth: 126
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
    this.searchExam.status = 1;
  }

  ngOnInit(): void {
    this.getListSubject();
    this.findExam(1);
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

  openImport(){

  }
  exportData(){

  }

  openCreate(){
    this.router.navigate(['/system/create-exam']);
  }

  findExam(page: number){
    this._page = page;
    this.examService.search(this.searchExam, page, this._pageSize).subscribe(res => {
      this.lstExam = res.lstExam;
      if(this.lstExam.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalClass = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.lstExam.length -1;
      if (this.totalClass % this._pageSize === 0) {
        this.totalPage =  Math.floor(this.totalClass / this._pageSize);
        this.rangeWithDots = this.commonService.pagination(
          this._page,
          this.totalPage
        );
      }else{
        this.totalPage =  Math.floor(this.totalClass / this._pageSize) + 1;
        this.rangeWithDots = this.commonService.pagination(
          this._page,
          this.totalPage
        );
      }
      this.gridApi.setRowData(this.lstExam);
      this.changeDetectorRef.detectChanges();
    });
  }

  page(page: number): void {
    this._page = page
    this.findExam(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    this.findExam(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findExam(this._page);
  }

  getListSubject(){
    this.subjectService.getAll().subscribe(res =>{
      this.lstSubject = res;
      this.changeDetectorRef.detectChanges();
    })
  }

}
