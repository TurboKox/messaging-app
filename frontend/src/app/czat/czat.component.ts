import { Component } from '@angular/core';
import { Wiadomosc } from '../wiadomosc/wiadomosc.model';
import { APIService } from '../api.service';

@Component({
  selector: 'app-czat',
  templateUrl: './czat.component.html',
  styleUrl: './czat.component.css'
})
export class CzatComponent {
  wiadomosci: Wiadomosc[] = []

  nowaWiadomosc: Wiadomosc = {
    tresc_wiadomosci: '',
    data_wyslania_wiadomosci: '',
    status_wiadomosci: '',
    status_dostepnosci: '',
    nazwa_uzytkownika: "user1"
  }

  constructor(private mojaUsluga: APIService) {}

  dodajWiadomosc() {
    if (this.nowaWiadomosc.tresc_wiadomosci == "") {
      return;
    }

    var obecna_data = new Date();
    var m = String(obecna_data.getMinutes()).padStart(2, '0');
    var h = String(obecna_data.getHours());
    var dd = String(obecna_data.getDate()).padStart(2, '0');
    var mm = String(obecna_data.getMonth() + 1).padStart(2, '0');
    var yyyy = obecna_data.getFullYear();
    var obecna_data_str = h + ":" + m + " " + mm + '/' + dd + '/' + yyyy;
    
    this.nowaWiadomosc.data_wyslania_wiadomosci = obecna_data_str;

    this.mojaUsluga.addNewWiadomosc(this.nowaWiadomosc).subscribe(
      (res: any) => {
        this.wiadomosci.push({...this.nowaWiadomosc})

        console.log(this.nowaWiadomosc);
        console.log(this.wiadomosci);
        console.log('Dodano wiadomosc: ', res)
      },
      (err: { message: string; }) => {
        console.error("Błąd przy dodawaniu wiadomosci: " + err.message)
      }
    )
  }

  wiadomoscUsunieta(wiad: Wiadomosc) {
    this.wiadomosci = this.wiadomosci.filter(w => w !== wiad)
  }

  ngOnInit() {
    this.mojaUsluga.getAllWiadomosci().subscribe(
      (dane) => { this.wiadomosci = dane },
      (error) => { console.error(error) }
    )
  }
}
