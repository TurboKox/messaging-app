import { Component } from '@angular/core';
import { Wiadomosc } from '../wiadomosc/wiadomosc.model';
import { APIService } from '../api.service';

@Component({
  selector: 'app-czat',
  templateUrl: './czat.component.html',
  styleUrl: './czat.component.css'
})
export class CzatComponent {
  wiadomosci: Wiadomosc[] = [ ]

  nowaWiadomosc: Wiadomosc = {
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
  ngOnInit() {
    this.mojaUsluga.getAllWiadomosci().subscribe(
      (dane) => { this.wiadomosci = dane },
      (error) => { console.error(error) }
    )
  }
}
