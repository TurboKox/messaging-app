import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './user/user.model';
import { Observable, tap } from 'rxjs';
import {login, logout} from './magazyn/user-actions'

const API_URL = "http://localhost:5555/api/v1"
const naglowekHTTP = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http :HttpClient,
    private store :Store
  ) { }

  registerUser(user :User) :Observable<any> {
    return this.http.post(`${API_URL}/register`, user, {headers: naglowekHTTP})
  }
  loginUser(daneLogowania: { login :string, password :string}) :Observable<any> {
    return this.http.post(`${API_URL}/login`, daneLogowania, {headers: naglowekHTTP}).pipe(
      tap((response) => {
        this.store.dispatch(login())
        this.zapiszToken((response as any).token)
      })
    )
  }
  logout() {
    this.store.dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('userState')
  }
  private zapiszToken(token :string) :void {
    localStorage.setItem('token', token)
  }
}
