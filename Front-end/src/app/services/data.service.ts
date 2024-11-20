import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export interface DataService<T> {
    getData(): Observable<any> 
    getPagination(page?: number, limit?: number): Observable<T[]>;
    getById(id: number): Observable<T>;
    add(item: T | FormData | FormGroup): Observable<T>;
    update(id: number, item: T | FormData | FormGroup): Observable<T>;
    delete(id: number): Observable<void>;
    addExpert?(plantId: number, expertIds: number[]): Observable<T>
    updateExpert?(plantId: number, expertIds: number[]): Observable<T>
}
