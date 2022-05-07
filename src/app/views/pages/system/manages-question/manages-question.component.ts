import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import {list_status, NO_ROW_GRID_TEMPLATE} from 'src/app/helpers/constants';
import { CreateUpdateQuestionComponent } from './create-update-question/create-update-question.component';
import { ImportQuestionComponent } from './import-question/import-question.component';
import {QuestionService} from "../../../../core/service/service-model/question.service";
import {SearchQuestionModel} from "../../../../core/service/model/search-question.model";
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import {SubjectService} from "../../../../core/service/service-model/subject.service";
import {ActionManagesStudentComponent} from "../manages-student/action-manages-student/action-manages-student.component";
import {ActionManagesQuestionComponent} from "./action-manages-question/action-manages-question.component";

@Component({
  selector: 'kt-manages-question',
  templateUrl: './manages-question.component.html',
  styleUrls: ['./manages-question.component.scss']
})
export class ManagesQuestionComponent implements OnInit {

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
  totalClass = 0;
  classCode;
  queryParam;
  rangeWithDots = [];
  showPadding = true;
  listQuestion: any = [];
  searchQuestion: SearchQuestionModel = new SearchQuestionModel();
  listStatus = list_status;
  lstSubject = [];
  constructor(private matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private questionService: QuestionService,
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
        hide: true,
        minWidth: 10,
        maxWidth: 10,
        field: 'id',
      },
      {
        hide: true,
        minWidth: 10,
        maxWidth: 10,
        field: 'questionType',
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
        headerName: "Câu hỏi",
        field: "questionText",
        cellStyle: {
          "font-weight": "500",
          "font-size": "12px",
          color: "#101840",
          top: "13px",
          "white-space": "nowrap",
          "text-overflow": "ellipsis",
          overflow: "hidden",
        },
        minWidth: 250,
        tooltipField: "questionText",
      },
      {
        headerName: "Độ khó",
        // field: "level",
        valueGetter: param => {
          if(param.data.level === 0)
            return 'Dễ';
          else if(param.data.level === 1)
            return 'Trung bình';
          else
           return 'Khó';
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
        minWidth: 80,
        tooltipField: "level",
      },
      {
        headerName: "Loại câu hỏi",
        field: "questionType",
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
        tooltipField: "questionType",
      },
      {
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: ActionManagesQuestionComponent,
        minWidth: 50,
        maxWidth: 50,
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
    this.searchQuestion.status = 1;
    this.searchQuestion.name = '';
  }

  ngOnInit(): void {
    this.getListSubject();
    this.findQuestion(1);
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
    this.matDialog.open(
      ImportQuestionComponent,{
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '600px',
        autoFocus: false,
      }
    )
  }
  exportData(){

  }

  openCreate(){
    const dataClass : any = {};
    dataClass.action = 'create';
    this.matDialog.open(
      CreateUpdateQuestionComponent,{
        maxHeight: window.innerHeight + 'px',
        data: dataClass,
        disableClose: true,
        hasBackdrop: true,
        width: '600px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findQuestion(this._page);
      }
    });
  }

  findQuestion(page: number){
    this._page = page;
    this.questionService.search(this.searchQuestion, page, this._pageSize).subscribe(res => {
      this.listQuestion = res.lstQuestion;
      if(this.listQuestion.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalClass = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.listQuestion.length -1;
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
      this.gridApi.setRowData(this.listQuestion);
      this.changeDetectorRef.detectChanges();
    });
  }

  page(page: number): void {
    this._page = page
    this.findQuestion(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    this.findQuestion(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findQuestion(this._page);
  }

  getListSubject(){
    this.subjectService.getAll().subscribe(res =>{
      this.lstSubject = res;
      this.changeDetectorRef.detectChanges();
    })
  }
}
