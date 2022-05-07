import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchTeacherModel} from '../../../../core/service/model/search-teacher.model';
import {list_status, NO_ROW_GRID_TEMPLATE} from '../../../../helpers/constants';
import {MatDialog} from '@angular/material/dialog';
import {TeacherService} from '../../../../core/service/service-model/teacher.service';
import {CommonServiceService} from '../../../../core/service/utils/common-service.service';
import {CreateUpdateTeacherComponent} from '../manages-teacher/create-update-teacher/create-update-teacher.component';
import {StudentService} from '../../../../core/service/service-model/student.service';
import {ActionManagesTeacherComponent} from '../manages-teacher/action-manages-teacher/action-manages-teacher.component';
import {ActionManagesStudentComponent} from './action-manages-student/action-manages-student.component';
import {CreateUpdateStudentComponent} from './create-update-student/create-update-student.component';
import {ImportStudentComponent} from './import-student/import-student.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kt-manages-student',
  templateUrl: './manages-student.component.html',
  styleUrls: ['./manages-student.component.scss']
})
export class ManagesStudentComponent implements OnInit {

  columnDefs;
  rowData;
  gridApi;
  gridColumnApi;
  headerHeight = 56;
  rowHeight = 50;
  overlayNoRowsTemplate = 'Không có thông tin';
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
  rangeWithDots = [];
  showPadding = true;
  lstTeacher: any[] = [];
  searchTeacher: SearchTeacherModel = new SearchTeacherModel();
  listStatus = list_status;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private matDialog: MatDialog,
              private studentService: StudentService,
              private commonService: CommonServiceService){
    this.columnDefs = [
      {
        headerName: 'STT',
        valueGetter: (param) => {
          return param.node.rowIndex + ((this._page - 1) * this._pageSize + 1);
        },
        minWidth: 60,
        maxWidth: 60,
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          color: '#101840',
          display: 'flex',
          left: '6px',
        },
      },
      {
        hide: true,
        minWidth: 10,
        maxWidth: 10,
        field: 'id',
      },
      {
        headerName: 'Mã sinh viên',
        field: 'code',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#3366FF',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        },
        maxWidth: 200,
        tooltipField: 'studentCode',
      },
      {
        headerName: 'Tên sinh viên',
        field: 'fullName',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        },
        minWidth: 126,
        tooltipField: 'fullName',
      },
      {
        headerName: 'Email',
        field: 'email',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        },
        minWidth: 126,
        tooltipField: 'name',
      },
      {
        headerName: 'SĐT',
        field: 'phone',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        },
        minWidth: 126,
        tooltipField: 'name',
      },
      {
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: ActionManagesStudentComponent,
        minWidth: 50,
        maxWidth: 50,
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      '{{field}}',
      'Không có thông tin'
    );
    this.searchTeacher.name = '';
    this.searchTeacher.status = 1;
  }

  ngOnInit(): void {
    this.findStudent(this._page);
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
    this.matDialog.open(
      CreateUpdateStudentComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findStudent(this._page);
      }
    });
  }

  openImport(){
    this.matDialog.open(
      ImportStudentComponent,{
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findStudent(1);
      }
    });
  }

  exportData(){
    this.studentService.export(this.searchTeacher).subscribe((res)=>{
      const file = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.download = `DS_Sinhvien`;
      anchor.href = fileURL;
      anchor.click();
    });
  }

  findStudent(page: number){
    this._page = page;
    this.studentService.search(this.searchTeacher, page, this._pageSize).subscribe(res => {
      this.lstTeacher = res.lstStudent;
      if(this.lstTeacher.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalClass = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.lstTeacher.length -1;
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
      this.gridApi.setRowData(this.lstTeacher);
      this.changeDetectorRef.detectChanges();
    });
  }

  page(page: number): void {
    this._page = page
    this.findStudent(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    this.findStudent(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findStudent(this._page);
  }
}
