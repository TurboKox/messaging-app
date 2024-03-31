import { Component } from '@angular/core';
import { Wiadomosc } from '../wiadomosc/wiadomosc.model';
import { APIService } from '../api.service';

@Component({
  selector: 'app-czat',
  templateUrl: './czat.component.html',
  styleUrl: './czat.component.css'
})
export class CzatComponent {
  wiadomosci: Wiadomosc[] = [ { _id: "0", _rev: "1", tresc_wiadomosci: "Wysłana wiadomość", data_wyslania_wiadomosci: "31.03.2024", status_wiadomosci: "Wysłano", status_dostepnosci: "Niedostępny", nazwa_uzytkownika: "user1"},
                              { _id: "1", _rev: "2", tresc_wiadomosci: "Kolejna wiadomość", data_wyslania_wiadomosci: "31.03.2024", status_wiadomosci: "Wysłano", status_dostepnosci: "Niedostępny", nazwa_uzytkownika: "user2"},
                              { _id: "2", _rev: "3", tresc_wiadomosci: "Jeszcze jedna wiadomość", data_wyslania_wiadomosci: "31.03.2024", status_wiadomosci: "Wysłano", status_dostepnosci: "Niedostępny", nazwa_uzytkownika: "user1"},
                            ]

  nowaWiadomosc: Wiadomosc = {
    _id: '',
    _rev: '',
    tresc_wiadomosci: '',
    data_wyslania_wiadomosci: '',
    status_wiadomosci: '',
    status_dostepnosci: '',
    nazwa_uzytkownika: "user1"
  }

  constructor(private mojaUsluga: APIService) {}

  dodajWiadomosc() {
    this.mojaUsluga.addNewWiadomosc(this.nowaWiadomosc).subscribe(
      (res: any) => {
        this.wiadomosci.push({...this.nowaWiadomosc})
        console.log('Dodano wiadomosc: ', res)
      },
      (err: { message: string; }) => {
        console.error("Błąd przy dodawaniu wiadomosci: " + err.message)
      }
    )
  }
}
