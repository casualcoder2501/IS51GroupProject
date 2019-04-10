import { Injectable } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';

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

  history = [];
  constructor() { }


}
