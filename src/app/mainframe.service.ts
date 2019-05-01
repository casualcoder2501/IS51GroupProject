import { Injectable } from '@angular/core';
import { Currency } from './currency.model';
import { ApiService } from './api.service';


interface IHistory {
  countryLeft: any;
  countryRight: string;
  // denominationLeft: string;
  // denominationRight: string;
  symbolLeft: string;
  symbolRight: string;
  conversionLeft: number;
  conversionRight: any;
  editMode: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class MainframeService {
  currencies: Array<Currency> = [];
  conversionLabels = [];
  // store the current values for conversion
  currentCountry: Currency; // Country converting from
  conversionCountry = 'Pick a Currency'; // Country converting to. These are set to defaults
  resultRightHandSide: string; // the result of the conversion, set by convert function below
  rates; // array of rates, default is [0] which is USD conversion rates
  rate; // the rate is set by the convert function below
  leftHandSide: number;
  rightHandSide: string;
  editConversion = false;
  index: number;
  conversionCountryEdit: string;
  d = new Date();
  decimalPlace = 2;
  conversionSymbol = '';
  conversionBaseCountry = '$';
  history: Array<IHistory> = [];
  historyOverflow: Array<IHistory> = [];
  historyOverflowTwo: Array<IHistory> = [];
  randomNumber: number;
  newArray: Array<IHistory> = [];
  storedHistory: Array<IHistory> = [];
  storedHistoryOverflow: Array<IHistory> = [];
  storedHistoryOverflowTwo: Array<IHistory> = [];

  resultSymbolsArray = ['Лв.', '$', '₪', '₽', 'Can$', '$', '₱', 'Fr.', 'A$', '¥',
    '₺', 'HK$', 'RM', 'kn', 'Kč', 'Rp', 'Kr.', 'kr', 'Ft', '£',
    'Mex$', '฿', 'Íkr', 'R', 'R$', 'S$', 'zł', '₹', '₩', 'lei', '¥', 'kr', '€'];


  constructor(private api: ApiService) { }

  convert(userInput: number) {
    this.leftHandSide = userInput;
    if (this.editConversion === false) {
      for (const [key, value] of Object.entries(this.rates)) {
        if (key === this.conversionCountry) {
          this.rate = value;
        }
      }
      this.resultRightHandSide = (userInput * this.rate).toFixed(this.decimalPlace);
    } else {
      for (const [key, value] of Object.entries(this.rates)) {
        if (key === this.conversionCountryEdit) {
          this.rate = value;
        }
      }
      this.rightHandSide = (userInput * this.rate).toFixed(this.decimalPlace);
      this.editConversion = false;
    }
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
      this.dataLoad();
    }
  }
  // Initializes all the data we need. Only runs if conditions above are met.
  async loadData() {

    await this.api.httpCall();
    this.api.localList = await JSON.parse(localStorage.getItem('currencies'));
    this.currencies = await this.api.currencyList;
    this.conversionLabels = await Object.keys(this.api.currencyList[0].rates);
    this.currentCountry = await this.api.currencyList[0];
    this.rates = await this.api.currencyList[0].rates;
    console.log('loadData');
  }


  async dataLoad() {
    this.api.localList = await JSON.parse(localStorage.getItem('currencies'));
    this.currencies = await this.api.localList;
    this.conversionLabels = await Object.keys(this.api.localList[0].rates);
    this.currentCountry = await this.api.localList[0];
    this.rates = await this.api.localList[0].rates;
    console.log(this.api.currencyList);

  }

  restoreHistory() {
    if (this.storedHistory.length === 0) {
      alert('No history to restore!');
  } else {
    this.history = this.storedHistory;
    this.historyOverflow = this.storedHistoryOverflow;
    this.historyOverflowTwo = this.storedHistoryOverflowTwo;
  }
}

logoutHistory() {
  this.storedHistory = this.history;
  this.storedHistoryOverflow = this.historyOverflow;
  this.storedHistoryOverflowTwo = this.historyOverflowTwo;
  this.history = [];
  this.historyOverflow = [];
  this.historyOverflowTwo = [];
}
}
