import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data = { };

  // School Fee
  getFeeTerms(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_term/' + this.school_id);
  }

  addFeeTerms(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_term/' + this.school_id, data)
  }

  editFeeTerms(data, fee_term_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_fee_terms/' + fee_term_id, data)
  }

  deleteFeeTerms(fee_term_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_fee_terms/' + fee_term_id, this.empty_data)
  }

  getFeeTypes(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_types/' + this.school_id);
  }

  addFeeTypes(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_types/' + this.school_id, data)
  }

  editFeeTypes(data, fee_types_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_fee_types/' + fee_types_id, data)
  }

  deleteFeeTypes(fee_types_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_fee_types/' + fee_types_id, this.empty_data)
  }

  getFeeMaster(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_master/' + this.school_id);
  }

  addFeeMaster(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_master/' + this.school_id, data)
  }

  editFeeMaster(data, fee_master_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_fee_master/' + fee_master_id, data)
  }

  deleteFeeMaster(fee_master_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_fee_master/' + fee_master_id, this.empty_data)
  }

  getCollectedFee(selected_student): Observable<any> {
    return this.http.get<any>(this.url + '/fee_collection/' + selected_student);
  }

  addCollectedFee(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_collection/' + this.school_id, data)
  }

  getStudent_term_type_fee(selected_student, fee_term, fee_type): Observable<any> {
    return this.http.get<any>(this.url + '/student_term-typewise_fee_details/' + selected_student + '/' + fee_term + '/' + fee_type + '/' + this.school_id);
  }

  getStudent_fee(selected_student): Observable<any> {
    return this.http.get<any>(this.url + '/student_termwise_fee_details/' + selected_student + '/' + this.school_id);
  }

  getClass_fee(selected_section, fee_type, fee_term): Observable<any> {
    return this.http.get<any>(this.url + '/section_student_fee_paid_details/' + selected_section + '/' + fee_type + '/' + fee_term);
  }

  getDay_fee(select_date): Observable<any> {
    return this.http.get<any>(this.url + '/fee_by_Date/' + select_date + '/' + this.school_id);
  }

  getMonth_fee(select_month): Observable<any> {
    return this.http.get<any>(this.url + '/fee_by_Month/' + select_month + '/' + this.school_id);
  }

}
