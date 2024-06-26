import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Wiadomosc } from './wiadomosc/wiadomosc.model';

const API_URL = "http://localhost:5555/api/v1"

const mojeNaglowkiHTTP = new HttpHeaders({
  'Access-Control-Allow-Origin': '*'
})

@Injectable({
  providedIn: 'root'
})

export class APIService {
  private token :string | null

  constructor(private http :HttpClient) {
    this.token = localStorage.getItem('token')
  }

  getAllWiadomosci() :Observable<Wiadomosc[]> {
    return this.http.get<Wiadomosc[]>(`${API_URL}/konwersacja`, {headers: mojeNaglowkiHTTP})
  } 
  
  addNewWiadomosc(wiadomosc: Wiadomosc, photo: File): Observable<Object> {

    if(!this.token) {
      throw new Error('Użytkownik nie jest zalogowany')
    }

    const formData = new FormData()

    formData.append('tresc_wiadomosci', wiadomosc.tresc_wiadomosci)
    formData.append('data_wyslania_wiadomosci', wiadomosc.data_wyslania_wiadomosci)
    formData.append('nazwa_uzytkownika', (wiadomosc.nazwa_uzytkownika))
    formData.append('status_dostepnosci', (wiadomosc.status_dostepnosci))
    formData.append('status_wiadomosci', (wiadomosc.status_wiadomosci))
    formData.append('zdjecie', photo)

    const naglowekJWT = mojeNaglowkiHTTP.append('Authorization', `Bearer ${this.token}`)

    return this.http.post<Wiadomosc>(`${API_URL}/dodaj`, formData, {headers: naglowekJWT})
  }

  deleteWiadomosc(id: string, rev: string) :Observable<Object> {
    return this.http.delete(`${API_URL}/usun/${id}/${rev}`, {headers: mojeNaglowkiHTTP})
  }

  updateWiadomosc(book: Wiadomosc) :Observable<Object> {
    return this.http.patch(`${API_URL}/edytuj`, book, {headers: mojeNaglowkiHTTP})
  }
}
