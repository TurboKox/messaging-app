import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrl: './user-logout.component.css'
})
export class UserLogoutComponent {
  constructor(
    private autoryzacja :AuthService,
    private trasownik :Router
  ) {}

  ngOnInit(): void {
    this.autoryzacja.logout()
    this.trasownik.navigate(['/logowanie'])
  }
}
