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
export class SubjectService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient,
              private commonService: CommonServiceService) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}subjects`)
  }

  add(subject: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}subjects`, subject);
  }

  export(classroomSearch: any){
    return this.httpClient.post(`${this.API}subjects/export`, classroomSearch,{responseType: 'blob'});
  }

  dowloadFileSample(){
    const url = this.API + `subjects/sample-file`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  search(searchSubject:any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}subjects/search?page=${page}&pageSize=${pageSize}`, searchSubject);
  }

  getByCode(code: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}subjects/findByCode`, code);
  }
  validateCode(): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.getByCode(control.value).pipe(map(res => {
          if (res !== null) {
            return res ? {codeExitsts: true} : null;
          }
        })
      );
    };
  }

  delete(subject: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}subjects/delete`, subject);
  }

  findByClassCode(classCode: string):Observable<any>{
    return this.httpClient.get<any>(`${this.API}subjects/findByClassroomCode/${classCode}`);
  }

  dowloadFileTemplate(nameFile){
    const url = this.API + `subjects/exportTemplate`;
    return this.commonService.downloadFile(url, null, null, nameFile, `${moment().format('DDMMYYYY').toString()}`)
  }

  importSubject(file: any, typeImport){
    const formData: FormData = new FormData();
    formData.append('file', file ? file : null);
    return this.httpClient.post(`${this.API}subjects/importData?typeImport=${typeImport}`, formData);
  }

  exportDataErrors(listErr: [], nameFile){
    const url = this.API + `subjects/exportDataErrors`;
    return this.commonService.downloadFile(url, listErr, null, nameFile);
  }
}
