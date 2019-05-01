import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
// export class DemoButtonsDisabledComponent {
//   disabled: false;
// }
export class MainHeaderComponent implements OnInit {

  constructor(
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateTo(path: string, logout: string) {
    this.router.navigate([path]);
    if (logout === 'logOut') {
      this.login.loggedIn = false;
      this.login.currentUser = {};
    }
  }

}

