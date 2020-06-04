import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data = { };

  // Assessment Patterns
  getassessment_patterns(): Observable<any> {
    return this.http.get<any>(this.url + '/school_assessments/' + this.school_id)
  }

  // Inner Assessment Patterns
  getinner_assessments(selected_schedule): Observable<any> {
    return this.http.get<any>(this.url + '/assessments/' + selected_schedule + '/' + this.school_id)
  }

  // Examination Schedules
  getExam_schedules(): Observable<any> {
    return this.http.get<any>(this.url + '/exam_schedule/' + this.school_id)
  }

  addExam_schedules(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/exam_schedule/' + this.school_id, data)
  }

  editExam_schedules(data, exam_sch_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_examschedule/' + exam_sch_id, data)
  }

  deleteExam_schedules(exam_sch_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_examschedule/' + exam_sch_id, this.empty_data)
  }

  // Exam Papers
  getExam_papers(selected_schedule, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/exams/' + selected_schedule + '/' + selected_section);
  }

  addExam_papers(data, selected_section, selected_schedule, selected_subject): Observable<any> {
    console.log(data);
    var test = {
      "exams": data,
    };
    return this.http.post<any>(this.url + '/exams/' + selected_section + '/' + selected_schedule + '/' + selected_subject + '/' + this.school_id, test)
  }

}
