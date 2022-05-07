import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {SearchSchoolModel} from "../model/search-school.model";

@Injectable({
  providedIn: 'root',
})
export class ClassroomStudentService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient) {
  }

  search(classroomStudentSearch: any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post(`${this.API}classroom-student/search?page=${page}&pageSize=${pageSize}`, classroomStudentSearch)
  }

  addClassroom(classroom: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}classroom-students`, classroom);
  }

  export(classroomStudentSearch: any){
    return this.httpClient.post(`${this.API}classroom-student/export`, classroomStudentSearch,{responseType: 'blob'});
  }

  dowloadFileSample(){
    const url = this.API + `classrooms/sample-file`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  listStudent(classCode: string):Observable<any>{
    return this.httpClient.get<any>(`${this.API}classroom-student/getListStudent?classCode=${classCode}`);
  }

  deleteStudent(studentCode: string):Observable<any>{
    return this.httpClient.post<any>(`${this.API}classroom-students/delete`, studentCode);
  }
}
