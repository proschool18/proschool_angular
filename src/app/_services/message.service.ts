import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private user_id;

  constructor(private http: HttpClient) {}

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;

  private employee_id = appConfig.employee_id;
  empty_data = {}

  getInbox(sent_to): Observable<any> {
    return this.http.get<any>(this.url + '/inbox_messages/' + sent_to + '/' + this.role + '/' + this.school_id);
  }

  getOutbox(sent_to): Observable<any> {
    return this.http.get<any>(this.url + '/outbox_messages/' + sent_to + '/' + this.school_id);
  }

  sendMessage(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/messages/' + this.school_id, data)
  }

  getParentsInbox(sent_to, class_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/parentInbox_messages/' + sent_to + '/' + this.role + '/' + class_id + '/' + section_id + '/' + this.school_id);
  }

}
