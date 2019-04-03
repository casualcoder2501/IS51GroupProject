import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  // variables that hold user selected currencies to be converted RHS = Right Hand Side, LHS = Left Hand Side
  conversionRHS = {
    country: 'USA',
    denomination: 'USD',
    symbol: '$',
    UK: .76,
    EU: .89,
    USA: 1
  };
  conversionLHS = {
    country: 'UK',
    denomination: 'Pound',
    symbol: '£',
    USA: 1.31,
    EU: 1.17,
    UK: 1
  };
  // array that contains currency objects
  currencies: Array<any> = [];

  resultL: number | string;
  resultR: number | string;

  errorMessage: string;

  constructor() { }

  ngOnInit() {
    this.loadCurrencies();
  }
  // Event handler for catching the user input and converting
  convert(event: any) {

    if (event.target.name === 'inputLHS') {
      switch (this.conversionRHS.country) {
        case 'USA':
          this.resultR = event.target.value * this.conversionLHS.USA;
          this.resultR = this.resultR.toFixed(2);
          break;
        case 'UK':
          this.resultR = event.target.value * this.conversionLHS.UK;
          this.resultR = this.resultR.toFixed(2);
          break;
        case 'EU':
          this.resultR = event.target.value * this.conversionLHS.EU;
          this.resultR = this.resultR.toFixed(2);
          break;
      }


    }
    if (event.target.name === 'inputRHS') {
      switch (this.conversionLHS.country) {
        case 'USA':
          this.resultL = event.target.value * this.conversionRHS.USA;
          this.resultL = this.resultL.toFixed(2);
          break;
        case 'UK':
          this.resultL = event.target.value * this.conversionRHS.UK;
          this.resultL = this.resultL.toFixed(2);
          break;
        case 'EU':
          this.resultL = event.target.value * this.conversionRHS.EU;
          this.resultL = this.resultL.toFixed(2);
          break;
      }


    }
  }




  // function that sets currencies array to default values
  loadCurrencies() {
    this.currencies = [
      {
        country: 'USA',
        denomination: 'USD',
        symbol: '$',
        UK: .76,
        EU: .89,
        USA: 1
      },
      {
        country: 'UK',
        denomination: 'Pound',
        symbol: '£',
        USA: 1.31,
        EU: 1.17,
        UK: 1
      },
      {
        country: 'EU',
        denomination: 'Euro',
        symbol: '€',
        UK: .85,
        USA: 1.12,
        EU: 1
      }
    ];
  }

  // functions that sets conversion variables above based on user selection
  assignCurrencyR(currency: any) {
    this.conversionRHS.country = currency.country;
    this.conversionRHS.symbol = currency.symbol;
    this.conversionRHS.denomination = currency.denomination;
    this.conversionRHS.EU = currency.EU;
    this.conversionRHS.UK = currency.UK;
    this.conversionRHS.USA = currency.USA;
    this.resultL = null;
    this.resultR = null;
  }



  assignCurrencyL(currency: any) {
    this.conversionLHS.country = currency.country;
    this.conversionLHS.symbol = currency.symbol;
    this.conversionLHS.denomination = currency.denomination;
    this.conversionLHS.EU = currency.EU;
    this.conversionLHS.UK = currency.UK;
    this.conversionLHS.USA = currency.USA;
    this.resultL = null;
    this.resultR = null;
  }


}
