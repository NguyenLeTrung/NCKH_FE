import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassroomService} from "../../../../core/service/service-model/classroom.service";
import {NO_ROW_GRID_TEMPLATE} from "../../../../helpers/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomStudentService} from "../../../../core/service/service-model/classroom-student.service";
import {ClassroomStudentSearchModel} from "../../../../core/service/model/classroom-student-search.model";
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import {CreateUpdateClassroomComponent} from "../manages-classroom/create-update-classroom/create-update-classroom.component";
import {MatDialog} from "@angular/material/dialog";
import {AddStudentComponent} from "./add-student/add-student.component";
import {ActionManagesClassroomComponent} from "../manages-classroom/action-manages-classroom/action-manages-classroom.component";
import {ActionClassStudentComponent} from "./action-class-student/action-class-student.component";
import {ImportClassroomComponent} from "../manages-classroom/import-classroom/import-classroom.component";
import {ImportClassroomStudentComponent} from "./import-classroom-student/import-classroom-student.component";
@Component({
  selector: 'kt-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.scss']
})
export class ClassStudentComponent implements OnInit {

  columnDefs;
  rowData;
  gridApi;
  gridColumnApi;
  headerHeight = 56;
  rowHeight = 50;
  overlayNoRowsTemplate = "Không có thông tin";
  currentPage = 1;
  _pageSize = 10;
  _page = 1;
  totalClass = 0;
  first = 1;
  last = 10;
  total = 0;
  totalPage = 0;
  classCode;
  queryParam;
  lstClassroomStudent: any[] = [];
  rangeWithDots = [];
  showPadding = true;
  classroomStudentSearch: ClassroomStudentSearchModel = new ClassroomStudentSearchModel();

  constructor(private classroomService: ClassroomService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private classroomStudentService: ClassroomStudentService,
              private commonService: CommonServiceService,
              private matDialog: MatDialog) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.queryParam = param;
    });
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
        field: 'classCode',
      },
      {
        hide: true,
        minWidth: 10,
        maxWidth: 10,
        field: 'id',
      },
      {
        headerName: "Mã sinh viên",
        field: "studentCode",
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
        tooltipField: "studentCode",
      },
      {
        headerName: "Tên sinh viên",
        field: "studentName",
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
        tooltipField: "studentName",
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
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: ActionClassStudentComponent,
        minWidth: 50,
        maxWidth: 50,
        cellStyle:{
          display: 'flex',
          'align-items': 'center',
        }
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
    if(undefined !== this.queryParam.classCode){
      this.classCode = this.queryParam.classCode;
    }
  }

  ngOnInit(): void {
    this.findClassroomStudent(this._page);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  gridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  gridColumnsChanged(param) {
    param.api.sizeColumnsToFit();
  }

  openCreate(){
    const dataClass : any = {};
    dataClass.action = 'create';
    dataClass.classCode = this.classCode;
    this.matDialog.open(
      AddStudentComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      this.findClassroomStudent(1);
    });
  }

  openImport(){
    const dataClass : any = {};
    dataClass.classCode = this.classCode;
    this.matDialog.open(
      ImportClassroomStudentComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findClassroomStudent(1);
      }
    });
  }

  exportData(){
    this.classroomStudentSearch.classCode = this.classCode;
    this.classroomStudentSearch.studentCode = '';
    this.classroomStudentService.export(this.classroomStudentSearch).subscribe((res)=>{
      const file = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.download = `DS_Sinhvien_Lop_` + this.classCode;
      anchor.href = fileURL;
      anchor.click();
    });
  }

  findClassroomStudent(page: number){
    this._page = page;
    this.classroomStudentSearch.classCode = this.classCode;
    this.classroomStudentSearch.studentCode = '';
    this.classroomStudentService.search(this.classroomStudentSearch, page, this._pageSize).subscribe(res => {
      this.lstClassroomStudent = res.lstClassroomStudent;
      if(this.lstClassroomStudent.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalClass = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.lstClassroomStudent.length -1;
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
      this.gridApi.setRowData(this.lstClassroomStudent);
      this.changeDetectorRef.detectChanges();
    });
  }

  page(page: number): void {
    this._page = page
    this.findClassroomStudent(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    this.findClassroomStudent(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findClassroomStudent(this._page);
  }
}
