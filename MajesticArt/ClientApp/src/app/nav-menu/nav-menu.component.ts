import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  authenticated: boolean;
  isAdmin: boolean;
  name: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.authenticated = user != null;
      this.isAdmin = user && user.roles.includes('Admin');
      this.name = user && user.fullName;
    });
  }

  logout() {
    this.authService.logout();
  }
}
