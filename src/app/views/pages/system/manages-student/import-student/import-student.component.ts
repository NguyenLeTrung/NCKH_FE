import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {StudentService} from "../../../../../core/service/service-model/student.service";

@Component({
  selector: 'kt-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss']
})
export class ImportStudentComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileImport: File;
  nameFile: any;
  sizeFile: any;
  uploaded = false;
  disableImport = true;
  totalSuccess: number;
  totalRecord: number;
  totalError: number;
  isImported = false;
  typeImport;
  resultImport;

  constructor(public dialogRef: MatDialogRef<ImportStudentComponent>,
              private studentService: StudentService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.typeImport = 0;
  }

  downloadSampleFile(){
    this.studentService.dowloadFileTemplate('DS_SV.xlsx');
  }
  onFileInput(event){
    if (event.target.files[0] === undefined) {
      return;
    }
    const file: File = event.target.files[0];
    if (!(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel')) {
      this.toastr.error('File upload không đúng định dạng!');
      this.uploaded = false;
      this.disableImport = true;
      return;
    }
    if (file.size > 5242880) {
      this.toastr.error('File upload không được vượt quá 5Mb');
      this.uploaded = false;
      this.disableImport = true;
      return;
    }
    this.fileImport = file;

    this.uploaded = true;
    this.disableImport = false;
    this.nameFile = event.target.files[0].name;
    this.sizeFile = event.target.files[0].size;
    this.myInputVariable.nativeElement.value = '';
  }

  importFile(){
    this.studentService.importStudent(this.fileImport, this.typeImport).subscribe((res: any) =>{
      if (res.data != null) {
        this.resultImport = res.data;
        if (this.resultImport.numberSuccess > 0) {
          // tslint:disable-next-line:max-line-length
          this.toastr.success("Import thành công " + ' ' + this.resultImport.numberSuccess + ' / ' + this.resultImport.total + ' ' + 'bản ghi')
          // this.managerClassroom.findClassroom(1);
          this.dialogRef.close({event: 'add'});
        } else if (this.resultImport.numberErrors === this.resultImport.total) {
          this.toastr.error("Import thất bại");
          return;
        }
      } else {
        this.toastr.error(res.message);
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }

  deleteFile() {
    this.uploaded = false;
    this.disableImport = true;
    this.isImported = false;
  }

  downloadErrorFile() {
    if (this.resultImport === undefined) {
      this.toastr.error('Chưa có file data lỗi, cần import trước');
      return;
    }
    if (this.resultImport.listErrors.length > 0) {
      const nameFile = 'DS_Import_Loi.xlsx';
      this.studentService.exportDataErrors(this.resultImport.listErrors, nameFile);
    } else {
      this.toastr.warning('Không có data lỗi');
    }
  }

}
