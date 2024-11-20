import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements DataService<any> {

  constructor( protected http: HttpClient ) { }
  getData(): Observable<any> {
    let route = [environment.apiUrl, 'category'].join('/');
    return this.http.get(route);
  }

  getPagination(page: number = 1, limit: number = 10): Observable<any> {
    let route = [environment.apiUrl, 'category', 'page', page, 'size', limit].join('/');
    return this.http.get(route);
  }

  getById(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'category', id].join('/');
    console.log(ruta);
    return this.http.get(ruta);
  }

  // getCategoriesPagination(page: number = 1, limit: number = 10): Observable<any> {
  //   let route = [environment.apiUrl, 'category', 'page', page, 'size', limit].join('/');
  //   return this.http.get(route);
  // }
  
  // getCategoryId(id: any): Observable<any> {
  //   let ruta = [environment.apiUrl, 'category', id].join('/');
  //   console.log(ruta);
  //   return this.http.get(ruta);
  // }

  add(category: any): Observable<any> {
    let ruta = [environment.apiUrl, 'category'].join('/');
    return this.http.post(ruta, category);
  }

  update(id: any, category: any): Observable<any> {
    let ruta = [environment.apiUrl, 'category', id].join('/');
    return this.http.put(ruta, category);
  }

  delete(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'category', id].join('/');
    return this.http.delete(ruta);
  }
}
