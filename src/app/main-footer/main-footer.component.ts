import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';
import { ApiService } from '../api.service';
import { ToastService } from '../toast/toast.service';


@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})

export class MainFooterComponent implements OnInit {

  errorMessage = '';
  symbol = '';
  currencyIndex: number;
  editConversion: boolean;


  constructor(
    public mainframe: MainframeService,
    public api: ApiService,
    public toast: ToastService,
  ) { }

  ngOnInit() {
  }

  saveConversion() {
    this.toast.showToast('warning', 5000, 'Please select a currency!');
    if (this.mainframe.conversionCountry === 'Pick a Currency') {
      this.toast.showToast('warning', 5000, 'Please select a currency!');
      this.errorMessage = 'Please select a currency!';
      alert(this.errorMessage);
    } else {
    if (this.mainframe.historyOverflowTwo.length > 2) {
      this.toast.showToast('danger', 5000, 'History full. Please delete atleast one segment.');
      this.errorMessage = 'History full. Please delete atleast one segment.';
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
          conversionLeft: this.mainframe.leftHandSide,
          conversionRight: this.mainframe.resultRightHandSide,
          symbolLeft: this.mainframe.conversionBaseCountry,
          symbolRight: this.mainframe.conversionSymbol,
          editMode: false
        });
      } else if (this.mainframe.history.length > 2) {
        this.mainframe.historyOverflow.unshift(this.mainframe.history[2]);
        this.mainframe.history.splice(2, 1);
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.currentCountry.base,
          countryRight: this.mainframe.conversionCountry,
          conversionLeft: this.mainframe.leftHandSide,
          conversionRight: this.mainframe.resultRightHandSide,
          symbolLeft: this.mainframe.conversionBaseCountry,
          symbolRight: this.mainframe.conversionSymbol,
          editMode: false
        });
      } else {
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.currentCountry.base,
          countryRight: this.mainframe.conversionCountry,
          conversionLeft: this.mainframe.leftHandSide,
          conversionRight: this.mainframe.resultRightHandSide,
          symbolLeft: this.mainframe.conversionBaseCountry,
          symbolRight: this.mainframe.conversionSymbol,
          editMode: false
        });
      }
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
    this.mainframe.storedHistory = this.mainframe.history;
    this.mainframe.storedHistoryOverflow = this.mainframe.historyOverflow;
    this.mainframe.storedHistoryOverflowTwo = this.mainframe.historyOverflowTwo;
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
    this.mainframe.conversionSymbol = this.mainframe.resultSymbolsArray[this.mainframe.randomNumber];
  }


  edit(index: number, arrays: string) {
    console.log('edit');
    if (arrays === 'base') {
    this.mainframe.history[index].editMode = true;
    console.log(this.mainframe.history[index]);
    } else if (arrays === 'overflow') {
      this.mainframe.historyOverflow[index].editMode = true;
      console.log(this.mainframe.historyOverflow[index]);
    } else {
      this.mainframe.historyOverflowTwo[index].editMode = true;
      console.log(this.mainframe.historyOverflowTwo[index]);
    }
  }

  save(index: number, arrays: string) {
    if (arrays === 'base') {
      this.mainframe.conversionCountryEdit = this.mainframe.history[index].countryRight;
      this.mainframe.history[index].editMode = false;
      this.mainframe.editConversion = true;
      console.log(this.mainframe.history[index]);
      this.mainframe.convert(this.mainframe.history[index].conversionLeft);
      this.mainframe.history.splice(index, 1,
        {countryLeft: this.mainframe.history[index].countryLeft,
          countryRight: this.mainframe.history[index].countryRight,
          conversionLeft: this.mainframe.history[index].conversionLeft,
          conversionRight: this.mainframe.rightHandSide,
          symbolLeft: this.mainframe.history[index].symbolLeft,
          symbolRight: this.mainframe.history[index].symbolRight,
          editMode: false}
        );
      } else if (arrays === 'overflow') {
        this.mainframe.conversionCountryEdit = this.mainframe.historyOverflow[index].countryRight;
        this.mainframe.historyOverflow[index].editMode = false;
        this.mainframe.editConversion = true;
        console.log(this.mainframe.historyOverflow[index]);
        this.mainframe.convert(this.mainframe.historyOverflow[index].conversionLeft);
        this.mainframe.historyOverflow.splice(index, 1,
          {countryLeft: this.mainframe.historyOverflow[index].countryLeft,
            countryRight: this.mainframe.historyOverflow[index].countryRight,
            conversionLeft: this.mainframe.historyOverflow[index].conversionLeft,
            conversionRight: this.mainframe.rightHandSide,
            symbolLeft: this.mainframe.historyOverflow[index].symbolLeft,
            symbolRight: this.mainframe.historyOverflow[index].symbolRight,
            editMode: false}
          );
      } else {
        this.mainframe.conversionCountryEdit = this.mainframe.historyOverflowTwo[index].countryRight;
        this.mainframe.historyOverflowTwo[index].editMode = false;
        console.log(this.mainframe.historyOverflowTwo[index]);
        this.mainframe.editConversion = true;
        console.log(this.mainframe.historyOverflowTwo[index]);
        this.mainframe.convert(this.mainframe.historyOverflowTwo[index].conversionLeft);
        this.mainframe.historyOverflowTwo.splice(index, 1,
          {countryLeft: this.mainframe.historyOverflowTwo[index].countryLeft,
            countryRight: this.mainframe.historyOverflowTwo[index].countryRight,
            conversionLeft: this.mainframe.historyOverflowTwo[index].conversionLeft,
            conversionRight: this.mainframe.rightHandSide,
            symbolLeft: this.mainframe.historyOverflowTwo[index].symbolLeft,
            symbolRight: this.mainframe.historyOverflowTwo[index].symbolRight,
            editMode: false}
          );
      }
  }

}


