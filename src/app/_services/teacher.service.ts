import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';
import { dataConfig } from '../app.data_config';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;

  // user = JSON.parse(localStorage.getItem('currentUser'));
  // private employee_id;

  constructor(private http:   HttpClient) {
    // if(JSON.parse(localStorage.getItem('currentUser')).role === 'admin') {
    //   this.employee_id = dataConfig.employee_id
    // } else if(JSON.parse(localStorage.getItem('currentUser')).role === 'teacher') {
    //   this.employee_id = this.user.employee_id;
    // }
  }

  getTeacherClasses(employee_id): Observable<any> {
    console.log(employee_id)
    return this.http.get<any>(this.url + '/teacherClassesList/' + employee_id);
  }

  getTeacherSections(employee_id, selected_class): Observable<any> {
    return this.http.get<any>(this.url + '/teacherSectionsList/' + employee_id + '/' + selected_class);
  }

  getTeacherSubjects(employee_id, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/teacherSubjectsList/' + employee_id + '/' + selected_section);
  }

  getAcademicEvaluation(selected_subject, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/all_assessment_marks_by_section_subject/' + selected_subject + '/' + selected_section)
  }
  
  getTeachingAssessment(employee_id, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/teacher_evaluation_by_section/' + employee_id + '/' + selected_section)
  }

  getCourseAssessment(employee_id, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/teacher_contentDelivery_by_section/' + employee_id + '/' + selected_section)
  }

}
