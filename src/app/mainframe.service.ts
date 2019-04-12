import { Injectable } from '@angular/core';

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

  currencies = [
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


  resultLeftHandSide: number;
  resultRightHandSide: number;

  decimalPlace = 2;

  history: Array<IHistory> = [];
  historyOverflow: Array<IHistory> = [];

  constructor() { }

}
