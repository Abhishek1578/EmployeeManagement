import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl='http://localhost:8080/employees';
  constructor(private _http:HttpClient) { }

  addEmployee(employee:any):Observable<any>{
    return this._http.post(`${this.apiUrl}/add`,employee);
  }

  updateEmployee(id:number,employee:any):Observable<any>{
    return this._http.put(`${this.apiUrl}/${id}`,employee);
  }

  getEmployee( ):Observable<any>{
    return this._http.get(`${this.apiUrl}/all`);
  }
  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
