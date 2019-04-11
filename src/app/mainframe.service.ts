import { Injectable } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';

interface IHistory {
  countryLeft: string;
  countryRight: string;
  denominationLeft: string;
  denominationRight: string;
  symbolLeft: string;
  symbolRight: string;
  conversionLeft: number;
  ConversionRight: number;
}

@Injectable({
  providedIn: 'root'
})
export class MainframeService {
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


  resultLeftHandSide: number;
  resultRightHandSide: number;

  decimalPlace = 2;

  
  history: Array<IHistory> = [];
  constructor() {}


}
