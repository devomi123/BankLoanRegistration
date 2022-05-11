import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl =" http://apps.thinkoverit.com/api"
  constructor( private http:HttpClient) { }

  post(api: string, data: any) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http.post(this.baseurl + api, body, { 'headers': headers })
  } 

  getotp(api: string, data: any) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http.post(this.baseurl + api, body, { 'headers': headers })
  }
}

