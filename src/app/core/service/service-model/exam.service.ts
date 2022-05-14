import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}choices`)
  }

  add(exam: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}exams`, exam);
  }

  export(classroomSearch: any){
    return this.httpClient.post(`${this.API}classrooms/export`, classroomSearch,{responseType: 'blob'});
  }

  search(subjectCode: any, page: number, pageSize: number):Observable<any>{
    return this.httpClient.post<any>(`${this.API}exams/search?page=${page}&pageSize=${pageSize}`, subjectCode);
  }

  delete(classroom: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}classrooms/delete`, classroom);
  }

  getListByStudentCode(studentCode: string):Observable<any>{
    return this.httpClient.get<any>(`${this.API}exams/getListByStudentCode/${studentCode}`);
  }

  findById(id: number):Observable<any>{
    return this.httpClient.get<any>(`${this.API}exams/${id}`);
  }

  getDataExamUser(id: number, studentCod: string):Observable<any>{
    return this.httpClient.get<any>(`${this.API}exam-users/findByExamId/${id}?studentCode=${studentCod}`);
  }

  addExamUser(examUser: any):Observable<any>{
    // @ts-ignore
    return this.httpClient.post<any>(`${this.API}exam-users`, examUser);
  }

  getListExamByTeacherCode(teacherCode: string):Observable<any>{
    return this.httpClient.get<any>(`${this.API}exams/findByTeacherCode/${teacherCode}`);
  }

  // Danh sách điểm của sinh viên
  getListPointExamStudent(examId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.API}exams/getPointExamStudent/${examId}`);
  }

  // Kết quả bài thi
  getResultExam(examUserId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.API}exam-users/${examUserId}`);
  }
}
