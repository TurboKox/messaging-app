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

  trybEdycji: boolean = false;

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
    this.trybEdycji = !this.trybEdycji;
  }
}
