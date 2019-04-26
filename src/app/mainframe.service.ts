import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
export interface ICurrency {
  base: string;
  rate: string;
  rates: string;
}

interface IHistory {
  countryLeft: string;
  countryRight: string;
  denominationLeft: string;
  denominationRight: string;
  symbolLeft: string;
  symbolRight: string;
  conversionLeft: number;
  conversionRight: number;
}

@Injectable({
  providedIn: 'root'
})

export class MainframeService {
  // store the current values for conversion
  currentCountry: ICurrency = this.api.localList[0] //Country converting from
  conversionCountry: string = 'Pick a Currency'; // Country converting to. These are set to defaults
  resultRightHandSide: string; //the result of the conversion, set by convert function below
  rates = this.api.localList[0].rates; //array of rates, default is [0] which is USD conversion rates
  rate; //the rate is set by the convert function below

  decimalPlace = 2;

  history: Array<IHistory> = [];
  historyOverflow: Array<IHistory> = [];

  constructor(private api: ApiService) { }

  convert(userInput: number) {
    for (let [key, value] of Object.entries(this.rates)) {
      if (key === this.conversionCountry) {
        this.rate = value;
      }
    }
    this.resultRightHandSide = (userInput * this.rate).toFixed(this.decimalPlace);
  }


  constructor() { }


}
