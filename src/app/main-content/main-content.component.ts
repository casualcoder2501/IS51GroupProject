import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { Currency } from '../currency.model';
import { JsonPipe } from '@angular/common';

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

  currencies: Array<Currency> = this.mainframe.currencies; // gets set during loadUp function
  d = new Date();
  resultL: string;
  decimalPlaces = 2;

  conversionLabels = this.mainframe.conversionLabels;

  // variable that tells the app all our data is loaded
  dataReady = false;

  constructor(public mainframe: MainframeService, public api: ApiService) { }

  async ngOnInit() {

    await this.mainframe.loadUp();
    this.dataReady = true;



  }

  

  // function sets the current conversion country according to user input and converts
  setCountry(country: Currency, value) {
    this.mainframe.currentCountry = country;
    this.mainframe.rates = country.rates;
    this.mainframe.convert(value);
  }
  //  function sets country converting to according to user input and converts
  setRate(convertCountry?: string, rate?: number) {
    this.mainframe.conversionCountry = convertCountry;
    this.mainframe.convert(rate);
  }

  // clear function that clears user input when they click on the input box, for convienence.

  clear(name: string) {
    if (name === 'inputLeft') {
      this.resultL = null;
      this.mainframe.resultRightHandSide = null;
    }
  }


  decrease(rate) {
    if (this.decimalPlaces > 0) {
      this.decimalPlaces--;
      this.mainframe.decimalPlace--;
      this.mainframe.convert(rate);
    }

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
