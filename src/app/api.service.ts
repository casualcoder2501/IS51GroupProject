import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  localList = JSON.parse(localStorage.getItem('currencies'))
  base = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'HKD', 'JPY', 'CHF', 'BRL', 'BGN'];
  currencyList = [];
  constructor(private http: HttpClient) { }

  // Makes Http call to server for our conversion info.
  httpCall(array) {{

      for (let base of this.base) {
        const apiURL = `https://api.exchangeratesapi.io/latest?base=${base}`;
        this.http.get(apiURL).subscribe((res) => {
          array.push(res);

        });
      }
      console.log('works');

    }
    console.log('1st')
  }

  // Saves http call to local storage, we are pulling our conversion rates from local storage.
  saveCurrenciesToLocalStorage() {
    console.log('2nd');
    const savedLocalData = localStorage.setItem('currencies', JSON.stringify(this.currencyList));
    return savedLocalData;
  }
}


