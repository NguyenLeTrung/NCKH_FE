import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotiService } from './notification.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BasicService } from '../utils/basic.service';
import { CommonServiceService } from '../utils/common-service.service';
import {CategoryModel} from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}category`)
  }

  addCategory(category: CategoryModel):Observable<any>{
    return this.httpClient.post<any>(`${this.API}category`, category);
  }
}
