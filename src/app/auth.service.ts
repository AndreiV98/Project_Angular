import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public token: string | undefined;

  constructor(private http: HttpClient) {
    let aux = localStorage.getItem('currentUser');
    if (aux) {
      const currentUser = JSON.parse(aux);
      this.token = currentUser && currentUser.token;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body.set('username', username);
    body.set('password', password);


    return this.http.post('http://127.0.0.1:8000/api/login_check', body ,{headers : headers} )
      .pipe(map((response: any) => {
        const token = response.json() && response.json().token;
        if (token) {
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          return true;
        } else {
          return false;
        }
      }))
  }

  logout(): void {
    this.token = '';
    
    localStorage.removeItem('currentUser');
  }

  private handleError(error: Response) {

    // return Observable.throw(error.json() || 'server error');

  }
}
