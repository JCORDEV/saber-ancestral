import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ExpertService implements DataService<any>{

  constructor( protected http: HttpClient ) { }
  
  getData(): Observable<any> {
    let route = [environment.apiUrl, 'expert'].join('/');
    return this.http.get(route);
  }
  
  getPagination(page: number = 1, limit: number = 10): Observable<any> {
    let route = [environment.apiUrl, 'expert', 'page', page, 'size', limit].join('/');
    return this.http.get(route);
  }
  

  getById(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'expert', id].join('/');
    return this.http.get(ruta);
  }

  add(expert: any): Observable<any> {
    let ruta = [environment.apiUrl, 'expert'].join('/');
    return this.http.post(ruta, expert);
  }

  update(id: any, expert: any): Observable<any> {
    let ruta = [environment.apiUrl, 'expert', id].join('/');
    return this.http.put(ruta, expert);
  }

  delete(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'expert', id].join('/');
    return this.http.delete(ruta);
  }
}
