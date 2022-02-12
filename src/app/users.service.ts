import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from './User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url= 'http://127.0.0.1:8000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return  this.http.get(this.url).pipe(map(res => <User[]> res ));
  }
}
