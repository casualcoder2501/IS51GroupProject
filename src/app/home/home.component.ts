import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { Currency } from '../currency.model';
import { JsonPipe } from '@angular/common';

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
  currencies: Array<Currency>; // gets set during loadUp function
  d = new Date();
  resultL: string;
  decimalPlaces = 2;

  conversionLabels = [];

  // variable that tells the app all our data is loaded
  dataReady = false;

  constructor(public mainframe: MainframeService, public api: ApiService) { }

  async ngOnInit() {
    await this.loadUp();





  }

  // function that retrieves the stored date from local storage or returns as todays date
  today() {
    if (localStorage.getItem('date')) {
      return JSON.parse(localStorage.getItem('date'));
    } else {
      return this.d.getDate();
    }
  }
  // function makes http call if there is nothing in local storage or if todays date is not the same as
  // the date stored in local storage. If it doesnt make the call it sets variables according to local storage
  async loadUp() {
    const d = new Date();
    if (this.api.localList === null || this.today() !== d.getDate()) {
      await this.loadData();

    } else {
      this.currencies = await this.api.localList;
      this.conversionLabels = await Object.keys(this.api.localList[0].rates);
      this.mainframe.currentCountry = await this.api.localList[0];
      this.mainframe.rates = await this.api.localList[0].rates;
      this.dataReady = true;
    }

  }
  // Initializes all the data we need. Only runs if conditions above are met.
  async loadData() {
    await this.api.httpCall(this.api.currencyList);
    this.api.localList = await this.api.setLocalStorage();
    this.currencies = await this.api.localList;
    this.conversionLabels = await Object.keys(this.currencies[0].rates);
    this.mainframe.currentCountry = await this.currencies[0];
    this.mainframe.rates = await this.currencies[0].rates;
    this.dataReady = true;
  }

  // function sets the current conversion country according to user input and converts
  setCountry(country: Currency, value) {
    this.mainframe.currentCountry = country;
    this.mainframe.rates = country.rates;
    this.mainframe.convert(value);
  }
  //  function sets country converting to according to user input and converts
  setRate(convertCountry?: string, rate?: number) {
    this.mainframe.conversionCountry = convertCountry;
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
