import { Component, Input } from '@angular/core';
import { Wiadomosc } from './wiadomosc.model';

@Component({
  selector: 'app-wiadomosc',
  templateUrl: './wiadomosc.component.html',
  styleUrl: './wiadomosc.component.css'
})
export class WiadomoscComponent {
  @Input() message: Wiadomosc

  otwarteMenu: boolean = false;

  toggleMenu() {
    this.otwarteMenu = !this.otwarteMenu;
    console.log(this.otwarteMenu);
    
  }
}
