import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Wiadomosc } from './wiadomosc/wiadomosc.model';

const API_URL = "http://localhost:5555/api/"

const mojeNaglowkiHTTP = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})

@Injectable({
  providedIn: 'root'
})


export class APIService {
  constructor(private http: HttpClient) { }

  addNewWiadomosc(wiadomosc: Wiadomosc): Observable<Object> {
    return this.http.post<Wiadomosc>(`${API_URL}/dodaj`, wiadomosc, {headers: mojeNaglowkiHTTP})
  }
}
