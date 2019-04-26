import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import {ICurrency} from '../mainframe.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  fontFamily = {
    'font-family': 'Arial',
    'font-weight': 'bold'
  };
  // array that contains currency objects
  currencies = this.api.localList; //default is local storage
  resultL: string;
  decimalPlaces = 2;
  conversionLabels = [];


  constructor(public mainframe: MainframeService, public api: ApiService) { }

  ngOnInit() {

    this.loadUp();

  }


// Makes http call to get our conversion array only if the local storage is empty, 
// also sets labels for conversion countries. 
// If it makes the http call it saves it to local storage
  loadUp() {
    if (this.api.localList === null || this.api.localList.length === 0) {
      this.api.httpCall(this.api.currencyList); //Makes Http call if condition is true
      setTimeout(() => this.api.saveCurrenciesToLocalStorage(), 2500); //waits 2.5 seconds to save currency list to local storage

    } else {
      this.currencies = this.api.localList; // if statement is false pulls currencies from local storage
    }
    this.conversionLabels = Object.keys(this.currencies[0].rates)
  }

  // Event handler for catching the user input 

  setCountry(country: ICurrency, value) {
    this.mainframe.currentCountry = country;
    console.log(this.mainframe.currentCountry)
    this.mainframe.rates = country.rates;
    console.log(this.mainframe.rates);
    console.log(this.mainframe.conversionCountry)
    this.mainframe.convert(value);
  }

  setRate(country: string, rate) {
    this.mainframe.conversionCountry = country;
    console.log(this.mainframe.conversionCountry);
    this.mainframe.convert(rate);
  }

// clear function

  clear(name: string) {
    if (name === 'inputLeft') {
      this.resultL = null;
      this.mainframe.resultRightHandSide = null;
    } 
  }

  // function that sets currencies array to default values


  // functions that sets conversion variables above based on user selection




  decrease(rate) {
    if (this.decimalPlaces > 0) {
      this.decimalPlaces--;
      this.mainframe.decimalPlace--;
      this.mainframe.convert(rate);
    }
    console.log(this.api.localList);
  }
  increase(rate) {
    console.log(this.currencies[0]);
    if (this.decimalPlaces < 9) {
      this.decimalPlaces++;
      this.mainframe.decimalPlace++;
      this.mainframe.convert(rate);
    }
  }
}
