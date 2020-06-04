import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Employees
  getEmployees(): Observable<any> {
    return this.http.get<any>(this.url + '/employee/' + this.school_id);
  }

  getEmployeeDetails(employee_id): Observable<any> {
    return this.http.get<any>(this.url + '/employee_details/' + employee_id);
  }

  addEmployeeadmission(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/employee/' + this.school_id, data)
  }

  addProfileImage(formData, employee_id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/employee_photo_edit/' + employee_id, formData, {headers: headers} )
  }

  editEmployee(data, employee_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_employee/' + employee_id, data)
  }

  deleteEmployee(employee_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_employee/' + employee_id, this.empty_data)
  }

  restoreEmployee(employee_id): Observable<any> {
    return this.http.put<any>(this.url + '/restore_employee/' + employee_id, this.empty_data)
  }

}
