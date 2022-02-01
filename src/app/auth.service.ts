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
    const headers: HttpHeaders = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
  });

  let params: HttpParams = new HttpParams();
  params = params.set('username', username);
  params = params.set('password', password);
    //let headers = new HttpHeaders();
    // headers.append('content-type', 'application/x-www-form-urlencoded');
    // const headers = new HttpHeaders({ 'Authorization': 'Basic dGVzdDp0ZXN0', 'content-type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'http://localhost:8000', 'Access-Control-Allow-Credentials': 'true'})

    // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    //headers.set('content-type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body.set('username', username);
    body.set('password', password);


    return this.http.post('http://127.0.0.1:8000/api/login_check', params, {headers : headers})
      .pipe(map((response: any) => {
        // const tok = response;
        // const token = response.data.json() && response.data.json().token;
        const token = response.token;
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
