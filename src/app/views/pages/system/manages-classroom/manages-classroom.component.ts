import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { ClassroomService } from "src/app/core/service/service-model/classroom.service";
import {list_status, NO_ROW_GRID_TEMPLATE} from "src/app/helpers/constants";
import { CreateUpdateClassroomComponent } from "./create-update-classroom/create-update-classroom.component";
import { ImportClassroomComponent } from "./import-classroom/import-classroom.component";
import {ActionManagesClassroomComponent} from "./action-manages-classroom/action-manages-classroom.component";
import {ClassroomSearchModel} from "../../../../core/service/model/classroom-search.model";
import {ViewClassStudentComponent} from "./view-class-student/view-class-student.component";
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import {TeacherService} from "../../../../core/service/service-model/teacher.service";

@Component({
  selector: "kt-manages-classroom",
  templateUrl: "./manages-classroom.component.html",
  styleUrls: ["./manages-classroom.component.scss"],
})
export class ManagesClassroomComponent implements OnInit {
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
  listClassroom: any = [];
  classroomSearchModel: ClassroomSearchModel = new ClassroomSearchModel();
  totalClass = 0;
  listTeacher = [];
  listStatus = list_status;
  constructor(private matDialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              private classroomService: ClassroomService,
              private commonService: CommonServiceService,
              private teacherService: TeacherService
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
        headerName: "Mã lớp học",
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
        headerName: "Tên lớp học",
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
        hide: true,
        minWidth: 10,
        maxWidth: 10,
        field: 'teacherCode',
      },
      {
        headerName: "Giáo viên",
        field: "teacherName",
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
        tooltipField: "teacherName",
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
      },
      {
        headerName: "Người tạo",
        field: "createName",
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
        tooltipField: "createName",
      },
      {
        headerName: "Danh sách học sinh",
        cellRendererFramework: ViewClassStudentComponent,
        minWidth: 150,
        maxWidth: 150,
        cellStyle:{
          display: 'flex',
          'align-items': 'center',
        }
      },
      {
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: ActionManagesClassroomComponent,
        minWidth: 50,
        maxWidth: 50,
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace(
      "{{field}}",
      "Không có thông tin"
    );
    this.classroomSearchModel.status = 1;
    this.classroomSearchModel.name = '';
  }

  ngOnInit(): void {
    this.getListTeacher();
    this.findClassroom(1);
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

  openImport(){
    this.matDialog.open(
      ImportClassroomComponent,{
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findClassroom(1);
      }
    });
  }
  exportData(){
    this.classroomService.export(this.classroomSearchModel).subscribe((res)=>{
      const file = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.download = `DS_Lophoc`;
      anchor.href = fileURL;
      anchor.click();
    });
  }

  openCreate(){
    const dataClass : any = {};
    dataClass.action = 'create';
    this.matDialog.open(
      CreateUpdateClassroomComponent,{
        data: dataClass,
        maxHeight: window.innerHeight + 'px',
        disableClose: true,
        hasBackdrop: true,
        width: '480px',
        autoFocus: false,
      }
    ).afterClosed().subscribe(res => {
      if (res.event === 'add'){
        this.findClassroom(1);
      }
    });
  }

  // Load data
  loadData(){
    this.classroomService.getAll().subscribe(res =>{
      this.rowData = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  findClassroom(page: number){
    this._page = page;
    this.classroomService.search(this.classroomSearchModel, page, this._pageSize).subscribe(res => {
      this.listClassroom = res.lstClassroom;
      if(this.listClassroom.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalClass = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.listClassroom.length -1;
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
      this.gridApi.setRowData(this.listClassroom);
      this.changeDetectorRef.detectChanges();
    });
  }

  page(page: number): void {
    this._page = page
    this.findClassroom(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    this.findClassroom(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findClassroom(this._page);
  }

  getListTeacher(){
    this.teacherService.getAll().subscribe(res =>{
      this.listTeacher = res;
      let list = [];
      res.forEach(item => {
        let customItem = {};
        customItem = {...item, name: item.fullName};
        list = [...list, customItem];
      });
      this.listTeacher = list;
      this.changeDetectorRef.detectChanges();
    })
  }
}
