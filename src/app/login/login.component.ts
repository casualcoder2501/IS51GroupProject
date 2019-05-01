import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { Currency } from '../currency.model';
import { LoginService } from '../login.service';
import { ToastService } from '../toast/toast.service';
import { IUser } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// STILL NEED TO ADD LOGIC/FUNCTION TO TAKE IN INPUTED NAME FROM LOGIN TO CREATE PERSONALIZED GREETING ON HOME PAGE

export class LoginComponent implements OnInit {

  username: '';
  currencies: Array<Currency>;


  logArray = this.login.userArray;

  constructor(
    private toast: ToastService,
    private login: LoginService,
    private api: ApiService,
    private router: Router,
    private mainframe: MainframeService
  ) { }

  async ngOnInit() {
    if (this.api.localList === null) {
      await this.mainframe.loadData();
      this.currencies = this.mainframe.currencies;
    } else {
      await this.mainframe.dataLoad();
      this.currencies = this.mainframe.currencies;
    }
  }

  async navigateTo(path: string, username: string, defau: string) {
    await this.createUser(username, defau);
    this.router.navigate([path]);
  }

  async createUser(user: string, def: string) {
    const userData = this.isUserInData(user, def);
    const newUser: IUser = {
      username: user,
      default: def
    };


    if (this.logArray === null || this.logArray.length <= 0) {
      await this.login.userArray.push(newUser);
      this.login.currentUser = await newUser;
      this.login.loggedIn = true;
      await localStorage.setItem('users', JSON.stringify(this.logArray
      ));
      await localStorage.setItem('currentUser', JSON.stringify(this.login.currentUser));
      this.login.userArray = JSON.parse(localStorage.getItem('users'));
      this.toast.showToast('succeed', 2000, `Welcome to The Converter ${newUser.username}`);
      console.log('if');
    } else if (userData) {
      this.login.loggedIn = true;
      alert('Welcome Back!');
      this.mainframe.restoreHistory();
    } else {
      this.login.currentUser = await newUser;
      await this.login.userArray.push(newUser);
      localStorage.setItem('currentUser', JSON.stringify(this.login.currentUser));
      await localStorage.setItem('users', JSON.stringify(this.login.userArray));
      this.login.userArray = JSON.parse(localStorage.getItem('users'));
      console.log('too amny');
      this.login.loggedIn = true;
    }

  }

  isUserInData(newUser, defa) {
    for (let users of this.logArray) {
      if (users.username === newUser && users.default === defa) {
        return true;
      } else {
        return false;
      }

    }
  }
}


    // console.log('current User', this.login.currentUser);
    // console.log( 'userArray', this.login.userArray);





// MATERIAL REFERENCED FROM SAMPLE TEST 2

// import { Component, OnInit } from '@angular/core';
// import { LocalStorageService } from '../localStorageService';
// import { Router } from '@angular/router';
// import { ToastService } from '../toast/toast.service';

// export interface IUser {
//   id?: number;
//   username: string;
//   password: string;
// }

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   user: IUser = {
//     username: null,
//     password: null
//   };

//   constructor(private router: Router, private toastService: ToastService) {
//   }

//   ngOnInit() {

//   }

//   login(user: IUser) {
//     const presetUser = { username: 'samuel', password: 'samuel123' };
//     if (user.username != null && user.password != null &&
//       user.username !== '' && user.password !== '') {
//       // log the user in
//       if (user.username === presetUser.username &&
//         user.password === presetUser.password) {
//         // actually log them in
//         // saving data to localStorage
//         localStorage.setItem('user', JSON.stringify(user));
//         // navigate to contact page
//         this.router.navigate(['contacts', user]);
//       } else {
//         this.toastService.showToast('warning', 2000, 'Username or password is wrong');
//       }
//     } else {
//       this.toastService.showToast('danger', 2000, 'Must specify credentials');
//     }
//   }

// }
