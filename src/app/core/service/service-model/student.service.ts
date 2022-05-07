import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {CommonServiceService} from "../utils/common-service.service";

@Injectable({
  providedIn: 'root',
})
export class StudentService{
  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient,
              private commonService: CommonServiceService) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}students`)
  }

  add(student: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}students`, student);
  }

  export(searchTeacher: any){
    return this.httpClient.post(`${this.API}students/export`, searchTeacher,{responseType: 'blob'});
  }

  dowloadFileSample(){
    const url = this.API + `students/sample-file`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  search(searchTeacher: any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}students/search?page=${page}&pageSize=${pageSize}`, searchTeacher)
  }

  delete(student: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}students/delete`, student);
  }

  dowloadFileTemplate(nameFile){
    const url = this.API + `students/exportTemplate`;
    return this.commonService.downloadFile(url, null, null, nameFile, `${moment().format('DDMMYYYY').toString()}`)
  }

  importStudent(file: any, typeImport){
    const formData: FormData = new FormData();
    formData.append('file', file ? file : null);
    return this.httpClient.post(`${this.API}students/importData?typeImport=${typeImport}`, formData);
  }

  exportDataErrors(listErr: [], nameFile){
    const url = this.API + `students/exportDataErrors`;
    return this.commonService.downloadFile(url, listErr, null, nameFile);
  }

}