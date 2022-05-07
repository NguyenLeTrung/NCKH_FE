import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {CommonServiceService} from "../utils/common-service.service";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient,
              private commonService: CommonServiceService) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}classrooms`)
  }

  addClassroom(classroom: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}classrooms`, classroom);
  }

  export(classroomSearch: any){
    return this.httpClient.post(`${this.API}classrooms/export`, classroomSearch,{responseType: 'blob'});
  }

  dowloadFileSample(){
    const url = this.API + `classrooms/sample-file`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  search(classroomSearch: any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}classrooms/search?page=${page}&pageSize=${pageSize}`, classroomSearch);
  }

  delete(classroom: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}classrooms/delete`, classroom);
  }

  dowloadFileTemplate(nameFile){
    const url = this.API + `classrooms/exportTemplate`;
    return this.commonService.downloadFile(url, null, null, nameFile, `${moment().format('DDMMYYYY').toString()}`)
  }

  importClassroom(file: any, typeImport){
    const formData: FormData = new FormData();
    formData.append('file', file ? file : null);
    return this.httpClient.post(`${this.API}classrooms/importData?typeImport=${typeImport}`, formData);
  }

  exportDataErrors(listErr: [], nameFile){
    const url = this.API + `classrooms/exportDataErrors`;
    return this.commonService.downloadFile(url, listErr, null, nameFile);
  }

  dowloadFileTemplateClassroomStudent(nameFile){
    const url = this.API + `classroom-student/exportTemplate`;
    return this.commonService.downloadFile(url, null, null, nameFile, `${moment().format('DDMMYYYY').toString()}`)
  }

  importClassroomStudent(file: any, classCode, typeImport){
    const formData: FormData = new FormData();
    formData.append('file', file ? file : null);
    formData.append('classCode', classCode);
    return this.httpClient.post(`${this.API}classroom-student/importData?typeImport=${typeImport}`, formData);
  }

  exportDataErrorsClassroomStudent(listErr: [], nameFile){
    const url = this.API + `classroom-student/exportDataErrors`;
    return this.commonService.downloadFile(url, listErr, null, nameFile);
  }}
