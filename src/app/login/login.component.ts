import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { Currency } from '../currency.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: '';
  errorMessage = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  // FUNCTION USED FOR NAVIGATING PAGES W/OUT USING HREF
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // FUNCTION FOR LOGIN: CHECKS USERNAME AND INPUTS INTO LOCAL STORAGE FOR PERSONALIZED GREETING ON THE HOME PAGE
  login() {
    const username = this.username;
    console.log('test for username', this.username);
    if (this.username === '' || typeof this.username === 'undefined') {
      this.errorMessage = 'Please input an username!';
      alert(this.errorMessage);
    } else {
      localStorage.setItem('username', JSON.stringify(username));
      this.router.navigate(['']);
    }
  }
}
