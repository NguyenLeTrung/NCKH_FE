import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {SubjectService} from "../../../../../core/service/service-model/subject.service";
import {QuestionService} from "../../../../../core/service/service-model/question.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'kt-import-question',
  templateUrl: './import-question.component.html',
  styleUrls: ['./import-question.component.scss']
})
export class ImportQuestionComponent implements OnInit {

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
  lstSubject = [];
  subjectCode;
  constructor(public dialogRef: MatDialogRef<ImportQuestionComponent>,
              private subjectService: SubjectService,
              private questionService: QuestionService,
              private toastr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getListSubject()
  }

  downloadSampleFile(){
    this.questionService.dowloadFileTemplate('DS_Cauhoi.xlsx');
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

  }
  cancel(){
    this.dialogRef.close();
  }

  getListSubject(){
    this.subjectService.getAll().subscribe(res =>{
      this.lstSubject = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  deleteFile(){
    this.uploaded = false;
    this.disableImport = true;
    this.isImported = false;
  }

}
