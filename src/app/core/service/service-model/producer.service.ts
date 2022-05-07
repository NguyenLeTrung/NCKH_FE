import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotiService } from './notification.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BasicService } from '../utils/basic.service';
import { CommonServiceService } from '../utils/common-service.service';
import {CategoryModel} from '../model/category.model';
import {ProducerModel} from '../model/producer.model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  private API = `${environment.API_GATEWAY_ENDPOINT}`;

  constructor(private httpClient: HttpClient) {
  }

  getAll():Observable<any>{
    return this.httpClient.get(`${this.API}producer`)
  }

  addProducer(producer: ProducerModel):Observable<any>{
    return this.httpClient.post<any>(`${this.API}producer`, producer);
  }
}
