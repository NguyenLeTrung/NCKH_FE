import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from "moment";
import {CommonServiceService} from "../utils/common-service.service";

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient,
              private commonService: CommonServiceService) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}teachers`)
  }

  add(teacher: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}teachers`, teacher);
  }

  export(searchTeacher: any){
    return this.httpClient.post(`${this.API}teachers/export`, searchTeacher,{responseType: 'blob'});
  }

  dowloadFileSample(){
    const url = this.API + `teachers/sample-file`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  search(searchTeacher: any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}teachers/search?page=${page}&pageSize=${pageSize}`, searchTeacher)
  }

  delete(teacher: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}teachers/delete`, teacher);
  }

  dowloadFileTemplate(nameFile){
    const url = this.API + `teachers/exportTemplate`;
    return this.commonService.downloadFile(url, null, null, nameFile, `${moment().format('DDMMYYYY').toString()}`)
  }

  importClassroom(file: any, typeImport){
    const formData: FormData = new FormData();
    formData.append('file', file ? file : null);
    return this.httpClient.post(`${this.API}teachers/importData?typeImport=${typeImport}`, formData);
  }

  exportDataErrors(listErr: [], nameFile){
    const url = this.API + `teachers/exportDataErrors`;
    return this.commonService.downloadFile(url, listErr, null, nameFile);
  }}
