import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;

  empty_data = {}

  // Timetable
  getTimetable(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/class_timetables/' + selected_section);
  }

  addTimetable(data, selected_section): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/class_timetable/' + selected_section, data)
  }

  getSubject_teachers(subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/listsubjectstoteacher_by_subjectId/' + subject_id)
  }

  // School Events
  getAllEvents(date): Observable<any> {
    return this.http.get<any>(this.url + '/schoolevents/' + this.school_id);
  }

    // School Events
  getEvents(date): Observable<any> {
    return this.http.get<any>(this.url + '/eventsByDate/' + date + '/' + this.school_id);
  }

  addEvents(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/schoolevents/' + this.school_id, data)
  }

  // NoticeBoard

  getNotice(): Observable<any> {
    return this.http.get<any>(this.url + '/noticeboard/' + this.school_id);
  }

  addNotice(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/noticeboard/' + this.school_id, data)
  }

  editNotice(data, notice_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_noticeboard/' + notice_id, data)
  }

  deleteNotice(notice_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_noticeboard/' + notice_id, this.empty_data)
  }
  
}
