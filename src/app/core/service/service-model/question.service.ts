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
export class QuestionService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient,
              private commonService: CommonServiceService) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}questions`)
  }

  add(subject: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}questions`, subject);
  }

  export(classroomSearch: any){
    return this.httpClient.post(`${this.API}questions/export`, classroomSearch,{responseType: 'blob'});
  }

  dowloadFileSample(){
    const url = this.API + `questions/sample-file`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  search(searchSubject:any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}questions/search?page=${page}&pageSize=${pageSize}`, searchSubject);
  }

  getByCode(code: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}questions/findByCode`, code);
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
    return this.httpClient.post<any>(`${this.API}questions/delete`, subject);
  }

  findById(id: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}questions/findByQuestion`, id);
  }

  findBySubjectCode(searchQuestion: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}questions/findBySubjectCode`, searchQuestion);
  }

  dowloadFileTemplate(nameFile){
    const url = this.API + `questions/exportTemplate`;
    return this.commonService.downloadFile(url, null, null, nameFile, `${moment().format('DDMMYYYY').toString()}`)
  }
}