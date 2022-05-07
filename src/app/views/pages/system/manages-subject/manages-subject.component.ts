import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import {list_status, NO_ROW_GRID_TEMPLATE} from 'src/app/helpers/constants';
import { CreateUpdateSubjectComponent } from './create-update-subject/create-update-subject.component';
import { ImportSubjectComponent } from './import-subject/import-subject.component';
import {SubjectService} from "../../../../core/service/service-model/subject.service";
import {ActionManagesSubjectComponent} from "./action-manages-subject/action-manages-subject.component";
import {SearchSubjectModel} from "../../../../core/service/model/search-subject.model";
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import {ClassroomService} from "../../../../core/service/service-model/classroom.service";

@Component({
  selector: 'kt-manages-subject',
  templateUrl: './manages-subject.component.html',
  styleUrls: ['./manages-subject.component.scss']
})
export class ManagesSubjectComponent implements OnInit {

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
  listSubject: any = [];
  searchSubject: SearchSubjectModel = new SearchSubjectModel();
  totalClass = 0;
  listStatus = list_status;
  listClass = [];
  constructor(private matDialog: MatDialog,
              private subjectService: SubjectService,
              private changeDetectorRef: ChangeDetectorRef,
              private commonService: CommonServiceService,
              private classroomService: ClassroomService) {
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
        field: "id",
        maxWidth: 10,
        minWidth: 10,
        hide: true
      },
      {
        field: "classCode",
        maxWidth: 10,
        minWidth: 10,
        hide: true
      },
      {
        headerName: "Mã môn học",
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
        minWidth: 126,
        tooltipField: "code",
      },
      {
        headerName: "Tên môn học",
        field: "name",
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
        headerName: "Lớp học",
        field: "className",
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
        tooltipField: "className",
      },
      {
        headerName: "Trạng thái",
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
      {
        headerName: "Ngày tạo",
        field: "createDate",
        cellRenderer: (param) => {
          return `${moment(param.data.createDate).format("DD/MM/YYYY")}`;
        },
        tooltipValueGetter: (param) => {
          return `${moment(param.data.createDate).format("DD/MM/YYYY")}`;
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
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: ActionManagesSubjectComponent,
        minWidth: 50,
        maxWidth: 50,
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
    this.searchSubject.status = 1;
    this.searchSubject.name = '';
   }

  ngOnInit(): void {
    this.getListClassroom();
    this.findSubject(this._page);
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
      ImportSubjectComponent,{
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findSubject(1);
      }
    });
  }
  exportData(){
    this.subjectService.export(this.searchSubject).subscribe((res)=>{
      const file = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.download = `DS_Monhoc`;
      anchor.href = fileURL;
      anchor.click();
    });
  }
  openCreate(){
    const dataClass : any = {};
    dataClass.action = 'create';
    this.matDialog.open(
      CreateUpdateSubjectComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findSubject(1);
      }
    });
  }

  // Load data
  loadData(){
    this.subjectService.getAll().subscribe(res =>{
      this.rowData = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  findSubject(page: number){
    this._page = page;
    this.subjectService.search(this.searchSubject, page, this._pageSize).subscribe(res => {
      this.listSubject = res.lstSubject;
      if(this.listSubject.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalClass = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.listSubject.length -1;
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
      this.gridApi.setRowData(this.listSubject);
      this.changeDetectorRef.detectChanges();
    });
  }

  page(page: number): void {
    this._page = page
    this.findSubject(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    this.findSubject(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findSubject(this._page);
  }

  getListClassroom(){
    this.classroomService.getAll().subscribe(res => {
      this.listClass = res;
      this.changeDetectorRef.detectChanges();
    })
  }
}
