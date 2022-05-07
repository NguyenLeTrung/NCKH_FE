import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChoiceService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}choices`)
  }

  add(classroom: any):Observable<any>{
    return this.httpClient.post<any>(`${this.API}choices`, classroom);
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

}
