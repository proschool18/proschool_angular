import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }

  private url = "http://13.232.167.5:4005";
  // private url = "http://localhost:4005";

  login(dataValue: string): Observable<any> {
    return this.http.post<any>(this.url + '/signin', dataValue)
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      )
  }

  register(data): Observable<any> {
    return this.http.post<any>(this.url + '/schools', data)
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      )
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
