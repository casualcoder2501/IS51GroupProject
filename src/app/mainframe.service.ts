import { Injectable } from '@angular/core';
import { Currency } from './currency.model';
import { ApiService } from './api.service';


interface IHistory {
  countryLeft: any;
  countryRight: string;
  // denominationLeft: string;
  // denominationRight: string;
  // symbolLeft: string;
  // symbolRight: string;
  conversionLeft: number;
  conversionRight: string;
}

@Injectable({
  providedIn: 'root'
})

export class MainframeService {
  // store the current values for conversion
  currentCountry: Currency; // Country converting from
  conversionCountry = 'Pick a Currency'; // Country converting to. These are set to defaults
  resultRightHandSide: string; // the result of the conversion, set by convert function below
  rates; // array of rates, default is [0] which is USD conversion rates
  rate; // the rate is set by the convert function below
  leftHandSide: number;

  decimalPlace = 2;

  history: Array<IHistory> = [];
  historyOverflow: Array<IHistory> = [];
  historyOverflowTwo: Array<IHistory> = [];
  randomNumber: number;
  resultSymbolsArray: ['A$', 'Лв.', 'R$', 'Can$', 'Fr.', '¥', 'Kč', 'Kr.', '€', '£', 'HK$', 'kn', 'Ft',
        'Rp', '₪', '₹', 'Íkr', '¥', '₩', 'Mex$', 'RM', 'kr', '$', '₱', 'zł', 'lei', '₽', 'kr', 'S$', '฿', '₺',
        '$', 'R'];

  constructor(private api: ApiService) { }

  convert(userInput: number) {
    for (const [key, value] of Object.entries(this.rates)) {
      if (key === this.conversionCountry) {
        this.rate = value;
      }
    }
    this.resultRightHandSide = (userInput * this.rate).toFixed(this.decimalPlace);
    this.leftHandSide = userInput;
  }

}
