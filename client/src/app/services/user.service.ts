import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  login(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/user/login", data, { withCredentials: true })
  }

  register(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/user/create", data, { withCredentials: true })
  }

}
