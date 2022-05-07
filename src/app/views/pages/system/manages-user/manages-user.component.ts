import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ViewSchoolComponent} from '../manages-school/view-school/view-school.component';
import {ActionManagesSchoolComponent} from '../manages-school/action-manages-school/action-manages-school.component';
import {UserService} from '../../../../core/service/service-model/user.service';
import {CommonServiceService} from '../../../../core/service/utils/common-service.service';
import {NO_ROW_GRID_TEMPLATE} from '../../../../helpers/constants';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { ImportFileComponent } from './import-file/import-file.component';

@Component({
  selector: 'kt-manages-user',
  templateUrl: './manages-user.component.html',
  styleUrls: ['./manages-user.component.scss']
})
export class ManagesUserComponent implements OnInit {

  listStatus = [
    {
      id: 0,
      name: 'Khóa'
    },
    {
      id: 1,
      name: 'Đang hoạt động'
    }
  ];

  search = {
    code: '',
    status: 1,
  }
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
  overlayNoRowsTemplate = 'Không có thông tin';
  showPadding = true;
  rangeWithDots = [];
  listUser: any[] = [];
  constructor(private userService: UserService,
              private commonService: CommonServiceService,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
    this.columnDefs = [
      {
        headerName: 'STT',
        valueGetter: param => {
          return param.node.rowIndex + (((this._page - 1) * this._pageSize) + 1)
        },
        minWidth: 60,
        maxWidth: 60,
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          color: '#101840',
          display: 'flex',
          left: '6px'
        },
      },
      {
        headerName: 'Tên đăng nhập',
        field: 'login',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#3366FF',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden'
        },
        minWidth: 126,
        maxWidth: 126,
        tooltipField: 'login',
      },
      {
        headerName: 'Họ và tên',
        field: 'fullName',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden'
        },
        minWidth: 126,
        resizable: true,
        tooltipField: 'fullName',
      },
      {
        headerName: 'Số điện thoại',
        field: 'phoneNumber',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden'
        },
        minWidth: 126,
        tooltipField: 'phoneNumber',
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
          overflow: 'hidden'
        },
        minWidth: 126,
        tooltipField: 'email',
      },
      {
        headerName: 'Địa chỉ',
        field: 'address',
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden'
        },
        minWidth: 126,
        tooltipField: 'address',
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        valueGetter: param => {
          // tslint:disable-next-line:max-line-length
          return param.data == null ? '' : param.data.status === 'true' ? 'Đang hoạt động' : 'Khóa'
        },
        tooltipValueGetter: param => {
          // tslint:disable-next-line:max-line-length
          return param.data == null ? '' : param.data.status === 'true' ? 'Đang hoạt động' : 'Khóa'
        },
        cellStyle: param=>{
          let color = '';
          if(param.data.status === 1){
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
        minWidth: 126,
        maxWidth: 126,
      },
      {
        headerName: 'Ngày tạo',
        field: 'createDate',
        cellRenderer: param => {
          return `${moment(param.data.createDate).format('DD/MM/YYYY')}`
        },
        tooltipValueGetter: param => {
          return `${moment(param.data.createDate).format('DD/MM/YYYY')}`
        },
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          color: '#101840',
          top: '13px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden'
        },
        minWidth: 126,
        maxWidth: 126,
      },
      {
        headerName: '',
        suppressMovable: true,
        field: '',
        cellRendererFramework: ActionManagesSchoolComponent,
        minWidth: 50,
        maxWidth: 50,
      },
    ];
    this.overlayNoRowsTemplate = NO_ROW_GRID_TEMPLATE.replace('{{field}}', 'Không có thông tin');
  }

  ngOnInit(): void {
    this.findSchool(this._page)
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

  page(page: number): void {
    this._page = page
    this.findSchool(page);
  }

  prev(): void {
    this._page--
    if (this._page < 1) {
      this._page = 1
      return
    }
    console.log(this._page);
    this.findSchool(this._page);
  }

  next(): void {
    this._page++
    if (this._page > this.totalPage) {
      this._page = this.totalPage;
      return;
    }
    this.findSchool(this._page);
  }

  findSchool(page:number) {
    this._page = page;
    this.userService.search(this.search, page, this._pageSize).subscribe(res => {
      this.listUser = res.userDTOList;
      if(this.listUser.length === 0){
        this.showPadding = false;
      }else{
        this.showPadding = true;
      }
      this.totalSchool = res.totalRecord;
      this.first = ((page - 1) * this._pageSize) +1;
      this.last = this.first + this.listUser.length -1;
      if (this.totalSchool % this._pageSize === 0) {
        this.totalPage =  Math.floor(this.totalSchool / this._pageSize);
        this.rangeWithDots = this.commonService.pagination(
          this._page,
          this.totalPage
        );
      }else{
        this.totalPage =  Math.floor(this.totalSchool / this._pageSize) + 1;
        this.rangeWithDots = this.commonService.pagination(
          this._page,
          this.totalPage
        );
      }
      this.gridApi.setRowData(this.listUser);
      this.changeDetectorRef.detectChanges();
    });
  }

  exportData(){
    this.userService.export().subscribe((res)=>{
      // const file = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      // const fileURL = URL.createObjectURL(file);
      // const anchor = document.createElement('a');
      // anchor.download = `DS_taikhoan`;
      // anchor.href = fileURL;
      // anchor.click();
    })
  }

  openCreate(){
    this.dialog.open(CreateUpdateUserComponent, {
      maxHeight: window.innerHeight + 'px',
      disableClose: true,
      hasBackdrop: true,
      width: '480px',
      autoFocus: false,
    })

  }

  openImport(){
    this.dialog.open(ImportFileComponent, {
      maxHeight: window.innerHeight + 'px',
      disableClose: true,
      hasBackdrop: true,
      width: '480px',
      autoFocus: false,
    })
  }

}
