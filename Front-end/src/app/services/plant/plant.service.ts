import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class PlantService implements DataService<any>{
  constructor( protected http: HttpClient ) { }

  getData(): Observable<any> {
    let route = [environment.apiUrl, 'plant'].join('/');
    return this.http.get(route);
  }

  getPagination(page: number = 1, limit: number = 10, categoryIds: number[] = [], search: string = ''): Observable<any> {
    let ruta = [environment.apiUrl, 'plant', 'page', page, 'size', limit].join('/');

    // Iniciar los parámetros de consulta
    const queryParams: string[] = [];

    if (categoryIds.length > 0) {
        const categoryQuery = categoryIds.join(',');
        queryParams.push(`categoryIds=${categoryQuery}`);
    }

    if (search) {
        queryParams.push(`search=${search}`);
    }

    // Agregar los parámetros de consulta a la ruta
    if (queryParams.length > 0) {
        ruta += `?${queryParams.join('&')}`;
    }
    
    return this.http.get(ruta);
}

  getById(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'plant', id].join('/');
    console.log(id);
    return this.http.get(ruta);
  }

  add(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'plant'].join('/');
    return this.http.post(ruta, usr);
  }

  update(id: any, usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'plant', id].join('/');
    return this.http.put(ruta, usr);
  }

  delete(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'plant', id].join('/');
    return this.http.delete(ruta);
  }

  addExpert(plantId: any, expertIds: any[]): Observable<any> {
    let ruta = [environment.apiUrl, 'plant', plantId, 'add-experts'].join('/');
    return this.http.post(ruta, { expertIds });
  }
  
  updateExpert(plantId: any, expertIds: any[]): Observable<any> {
    let ruta = [environment.apiUrl, 'plant', plantId, 'update-experts'].join('/');
    return this.http.put(ruta, { expertIds });
  }
}
