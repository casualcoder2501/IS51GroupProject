import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';

interface ICurrencies {
  country: string;
  denomination: string;
  symbol: string;
  UK: number;
  EU: number;
  USA: number;
}

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  // array that contains currency objects
  currencies: Array<ICurrencies> = [];
  resultL: string;
  resultR: string;
  decimalPlaces = 2;

  constructor(public mainframe: MainframeService) { }

  ngOnInit() {
    this.loadCurrencies();
  }

  // Event handler for catching the user input and converting
  convert(name: string, value: number) {

    if (name === 'inputLeft') {
      switch (this.mainframe.conversionRHS.country) {
        case 'USA':
          this.mainframe.resultRightHandSide = value * this.mainframe.conversionLHS.USA;
          this.mainframe.resultLeftHandSide = value;
          break;
        case 'UK':
          this.mainframe.resultRightHandSide = value * this.mainframe.conversionLHS.UK;
          this.mainframe.resultLeftHandSide = value;
          break;
        case 'EU':
          this.mainframe.resultRightHandSide = value * this.mainframe.conversionLHS.EU;
          this.mainframe.resultLeftHandSide = value;
          break;
      }
      this.resultR = this.mainframe.resultRightHandSide.toFixed(this.decimalPlaces);

    } else if (name === 'inputRight') {
      switch (this.mainframe.conversionLHS.country) {
        case 'USA':
          this.mainframe.resultLeftHandSide = value * this.mainframe.conversionRHS.USA;
          this.mainframe.resultRightHandSide = value;

          break;
        case 'UK':
          this.mainframe.resultLeftHandSide = value * this.mainframe.conversionRHS.UK;
          this.mainframe.resultRightHandSide = value;

          break;
        case 'EU':
          this.mainframe.resultLeftHandSide = value * this.mainframe.conversionRHS.EU;
          this.mainframe.resultRightHandSide = value;

          break;
      }
      this.resultL = this.mainframe.resultLeftHandSide.toFixed(this.decimalPlaces);
    }

  }

  clear(name: string) {
    if (name === 'inputRight') {
      this.resultR = null;
    } else {
      this.resultL = null;
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
    this.mainframe.conversionRHS.country = currency.country;
    this.mainframe.conversionRHS.symbol = currency.symbol;
    this.mainframe.conversionRHS.denomination = currency.denomination;
    this.mainframe.conversionRHS.EU = currency.EU;
    this.mainframe.conversionRHS.UK = currency.UK;
    this.mainframe.conversionRHS.USA = currency.USA;
    this.resultL = null;
    this.resultR = null;
    this.mainframe.resultRightHandSide = null;
    this.mainframe.resultLeftHandSide = null;
  }

  assignCurrencyL(currency: any) {
    this.mainframe.conversionLHS.country = currency.country;
    this.mainframe.conversionLHS.symbol = currency.symbol;
    this.mainframe.conversionLHS.denomination = currency.denomination;
    this.mainframe.conversionLHS.EU = currency.EU;
    this.mainframe.conversionLHS.UK = currency.UK;
    this.mainframe.conversionLHS.USA = currency.USA;
    this.resultL = null;
    this.resultR = null;
    this.mainframe.resultRightHandSide = null;
    this.mainframe.resultLeftHandSide = null;
  }

  decrease() {
    if (this.decimalPlaces > 0) {
      this.decimalPlaces--;
      this.mainframe.decimalPlace--;
    }
  }
  increase() {
    if (this.decimalPlaces < 9) {
      this.decimalPlaces++;
      this.mainframe.decimalPlace++;
    }
  }
}
