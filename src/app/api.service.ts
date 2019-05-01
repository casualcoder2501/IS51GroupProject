import { Injectable } from '@angular/core';
import { Currency } from './currency.model';
import { HttpClient } from '@angular/common/http';
import { LCONTAINER_LENGTH } from '@angular/core/src/render3/interfaces/container';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // variable sets itself to local storage values
  public localList: Array<Currency> = JSON.parse(localStorage.getItem('currencies'))
  base = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'HKD', 'JPY', 'CHF', 'BRL', 'BGN'];
  currencyList: Array<Currency> = [];
  d = new Date();
  constructor(private http: HttpClient) { }

  // Makes Http call to server for our conversion info.
  async httpCall() {

    for (const base of this.base) {
      const apiURL = `https://api.exchangeratesapi.io/latest?base=${base}`;
      const response = await this.http.get<Currency>(apiURL).toPromise();
      this.currencyList.push(response);
    }
    console.log('works');
    // sets the date in local storage
    localStorage.setItem('date', JSON.stringify(this.d.getDate()));

    // fires off function that saves data to local storage after api call is made
    const savedData = await this.saveCurrenciesToLocalStorage();
    this.localList = await JSON.parse(localStorage.getItem('currencies'))
    return savedData;
  }
  // returns by setting local storage to currencyList which now has api data.
  saveCurrenciesToLocalStorage() {
    console.log('2nd');
    const savedLocalData = localStorage.setItem('currencies', JSON.stringify(this.currencyList));
    return savedLocalData;
  }
  // function used to retrieve local storage and set variables to currency array stored there
  setLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('currencies'));
    return localData;
  }



}


