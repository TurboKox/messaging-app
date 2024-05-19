import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selektorCzyZalogowany } from './magazyn/user-selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  czyZalogowany$ :Observable<boolean>

  constructor(
    private magazyn :Store
  ) {}

  ngOnInit() :void {
    this.czyZalogowany$ = this.magazyn.select(selektorCzyZalogowany)
  }
}
