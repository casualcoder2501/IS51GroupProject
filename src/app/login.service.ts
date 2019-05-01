import { Injectable } from '@angular/core';
import { ToastService } from './toast/toast.service';
import { Currency } from './currency.model';
export interface IUser {
  username?: string;
  default?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userArray: Array<IUser> = [];
  currentUser: IUser = {};
  indexOfCountry: number;
  loggedIn = false;
  defCurrency = 'USD';
  constructor(private toast: ToastService) { }



}
