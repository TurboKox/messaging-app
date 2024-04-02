import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Wiadomosc } from './wiadomosc.model';
import { APIService } from '../api.service';

@Component({
  selector: 'app-wiadomosc',
  templateUrl: './wiadomosc.component.html',
  styleUrl: './wiadomosc.component.css'
})
export class WiadomoscComponent {
  @Input() message: Wiadomosc
  @Output() wiadomoscUsunieta = new EventEmitter<Wiadomosc>()
  @Output() wiadomoscZaktualizowana = new EventEmitter()

  trybEdycji: boolean = false;

  wiadomoscPierwotna: Wiadomosc;

  constructor(private mojaUsluga: APIService) {}

  usunWiadomosc() {
    if(this.message._id && this.message._rev) {
      this.mojaUsluga.deleteWiadomosc(this.message._id, this.message._rev).subscribe(
        (res) => {
          this.wiadomoscUsunieta.emit(this.message)
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }

  toggleTrybEdycji() {
    this.wiadomoscPierwotna = structuredClone(this.message)
    this.trybEdycji = true;
  }

  odrzucZmiany() {
    this.message = this.wiadomoscPierwotna
    this.trybEdycji = false
  }
  zapiszZmiany() {
    this.mojaUsluga.updateWiadomosc(this.message).subscribe(
      (res) => {
        this.wiadomoscZaktualizowana.emit(this.message)
        this.trybEdycji = false
      },
      (err) => {
        console.error(err)
      }
    )

  }
}
