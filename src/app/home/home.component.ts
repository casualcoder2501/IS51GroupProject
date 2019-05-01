import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { Currency } from '../currency.model';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../login.service';
import { logging } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  fontFamily = {
    'font-family': 'Arial',
    'font-weight': 'bold'
  };
  // array that contains currency objects

  currencies: Array<Currency> = []; // gets set during loadUp function
  d = new Date();
  resultL: string;
  decimalPlaces = 2;
  currentUse;
  // tslint:disable-next-line: max-line-length
  fromSymbolsArray = ['$', '£', '€', 'Can$', 'A$', 'HK$', '¥', 'Fr.', 'R$', 'Лв.'];
  // tslint:disable-next-line: max-line-length
  resultSymbolsArray = ['Лв.', '$', '₪', '₽', 'Can$', '$', '₱', 'Fr.', 'A$', '¥', '₺', 'HK$', 'RM', 'kn', 'Kč', 'Rp', 'Kr.', 'kr', 'Ft', '£',
    'Mex$', '฿', 'Íkr', 'R', 'R$', 'S$', 'zł', '₹', '₩', 'lei', '¥', 'kr', '€'];
  conversionLabels = [];

  // variable that tells the app all our data is loaded
  dataReady = false;

  constructor(public mainframe: MainframeService, public api: ApiService, private login: LoginService) { }

  async ngOnInit() {
    if (this.api.localList === null) {
      await this.mainframe.loadData();
      this.currencies = this.mainframe.currencies;
      this.conversionLabels = this.mainframe.conversionLabels;
      this.currentUse = JSON.parse(localStorage.getItem('currentUser'));
      this.dataReady = true;
    } else {
      await this.mainframe.dataLoad();
      this.currencies = this.mainframe.currencies;
      this.conversionLabels = this.mainframe.conversionLabels;
      this.currentUse = JSON.parse(localStorage.getItem('currentUser'));
      this.dataReady = true;
    }

  }

  // function sets the current conversion country according to user input and converts
  setCountry(country: Currency, value, base) {
    this.mainframe.currentCountry = country;
    this.mainframe.rates = country.rates;
    this.mainframe.conversionBaseCountry = base;
    this.mainframe.convert(value);
  }
  //  function sets country converting to according to user input and converts
  setRate(convertCountry?: string, rate?: number, symbol?: string) {
    this.mainframe.conversionCountry = convertCountry;
    this.mainframe.conversionSymbol = symbol;
    this.mainframe.convert(rate);
  }

  // clear function that clears user input when they click on the input box, for convienence.

  clear(name: string) {
    if (name === 'inputLeft') {
      this.resultL = null;
      this.mainframe.resultRightHandSide = null;
    }
  }


  decrease(rate) {
    if (this.decimalPlaces > 0) {
      this.decimalPlaces--;
      this.mainframe.decimalPlace--;
      this.mainframe.convert(rate);
    }

  }
  increase(rate) {
    console.log(this.currencies[0]);
    if (this.decimalPlaces < 9) {
      this.decimalPlaces++;
      this.mainframe.decimalPlace++;
      this.mainframe.convert(rate);
    }
  }
}
