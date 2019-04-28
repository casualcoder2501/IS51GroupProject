import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { Currency } from '../currency.model';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})

export class MainFooterComponent implements OnInit {

  errorMessage = '';
  symbol = '';
  currencyIndex: number;

  constructor(
    public mainframe: MainframeService,
    public api: ApiService,
    // public flexModal: FlexModalService
  ) { }

  ngOnInit() {
  }

  saveConversion() {
    // const apiObject = this.api.localList[0];
    // const rate = Object.entries(apiObject.rates);
    // const rateHolder = rate[this.api.currencyList.indexOf(this.mainframe.conversionCountry)];
    // this.symbol = rateHolder[0];
    // console.log(this.symbol);
    // console.log('this.resultRightHandSide', this.mainframe.resultRightHandSide,
    //   'this.resultLeftHandSide', this.mainframe.resultLeftHandSide);
    // console.log('nationleft', this.mainframe.conversionLHS.denomination,
    //   'nationright', this.mainframe.conversionRHS.denomination);
    if (this.mainframe.historyOverflowTwo.length > 2) {
      this.errorMessage = 'Delete one segment';
      alert(this.errorMessage);
    } else {
      if (this.mainframe.historyOverflow.length > 2) {
        this.mainframe.historyOverflowTwo.unshift(this.mainframe.historyOverflow[2]);
        this.mainframe.historyOverflow.splice(2, 1);
        this.mainframe.historyOverflow.unshift(this.mainframe.history[2]);
        this.mainframe.history.splice(2, 1);
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.currentCountry.base,
          countryRight: this.mainframe.conversionCountry,
          // denominationLeft: this.mainframe.conversionLHS.denomination,
          // denominationRight: this.mainframe.conversionRHS.denomination,
          // symbolLeft: this.mainframe.conversionLHS.symbol,
          // symbolRight: this.mainframe.conversionRHS.symbol,
          conversionLeft: this.mainframe.leftHandSide,
          conversionRight: this.mainframe.resultRightHandSide
        });

        // console.log(this.mainframe.historyOverflow);

      } else if (this.mainframe.history.length > 2) {
        this.mainframe.historyOverflow.unshift(this.mainframe.history[2]);
        this.mainframe.history.splice(2, 1);
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.currentCountry.base,
          countryRight: this.mainframe.conversionCountry,
          // denominationLeft: this.mainframe.conversionLHS.denomination,
          // denominationRight: this.mainframe.conversionRHS.denomination,
          // symbolLeft: this.mainframe.conversionLHS.symbol,
          // symbolRight: this.mainframe.conversionRHS.symbol,
          conversionLeft: this.mainframe.leftHandSide,
          conversionRight: this.mainframe.resultRightHandSide
        });
        // console.log(this.mainframe.history);
      } else {
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.currentCountry.base,
          countryRight: this.mainframe.conversionCountry,
          // denominationLeft: this.mainframe.conversionLHS.denomination,
          // denominationRight: this.mainframe.conversionRHS.denomination,
          // symbolLeft: this.mainframe.conversionLHS.symbol,
          // symbolRight: this.mainframe.conversionRHS.symbol,
          conversionLeft: this.mainframe.leftHandSide,
          conversionRight: this.mainframe.resultRightHandSide
        });
      }
    }
  }

  delete(index: number, arrays: string) {
    console.log ( this.mainframe.history, this.mainframe.historyOverflow, this.mainframe.historyOverflowTwo);
    if (arrays === 'base') {
      if (this.mainframe.historyOverflow.length > 0) {
        this.mainframe.history.splice(index, 1);
        this.mainframe.history.push(this.mainframe.historyOverflow[0]);
        this.mainframe.historyOverflow.splice(0, 1);
        if (this.mainframe.historyOverflowTwo.length > 0) {
        this.mainframe.historyOverflow.push(this.mainframe.historyOverflowTwo[0]);
        this.mainframe.historyOverflowTwo.splice(0, 1);
        } else {}
      } else {
        this.mainframe.history.splice(index, 1);
      }
    } else if (arrays === 'overflow') {
      if (this.mainframe.historyOverflowTwo.length > 0) {
        this.mainframe.historyOverflow.splice(index, 1);
        this.mainframe.historyOverflow.push(this.mainframe.historyOverflowTwo[0]);
        this.mainframe.historyOverflowTwo.splice(0, 1);
      } else {
        this.mainframe.historyOverflow.splice(index, 1);
      }
    } else {
      this.mainframe.historyOverflowTwo.splice(index, 1);
    }
  }

  clearHistory() {
    this.mainframe.history = [];
    this.mainframe.historyOverflow = [];
    this.mainframe.historyOverflowTwo = [];
  }

  randomCurrency() {
    this.mainframe.randomNumber = Math.floor((Math.random() * 32));
    console.log(this.mainframe.randomNumber);
    const apiObject = this.api.localList[0];
    const rate = Object.entries(apiObject.rates);
    const rateHolder = rate[this.mainframe.randomNumber];
    this.mainframe.conversionCountry = rateHolder[0];
    this.mainframe.convert(this.mainframe.leftHandSide);
  }

  edit() {
    console.log('edit');
  }

}


