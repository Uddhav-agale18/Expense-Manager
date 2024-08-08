import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etype } from '../model/etypeModel';
import { Page } from '../model/pageModel';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  createType(data: any): Observable<any> {
    console.log(data);

    return this.http.post("http://localhost:3000/types/", data, { withCredentials: true })
  }

  updateType(id: any, data: any): Observable<any> {
    console.log(id, data);

    return this.http.put(`http://localhost:3000/types/${id}`, data, { withCredentials: true })
  }

  deleteType(id: any): Observable<any> {
    console.log(id)
    return this.http.delete("http://localhost:3000/types/" + id, { withCredentials: true })
  }

  getAllTypes(page): Observable<{ types: Etype[], page: Page }> {
    return this.http.get<{ types: Etype[], page: Page }>(`http://localhost:3000/types?page=${page}`, { withCredentials: true })
  }
}
