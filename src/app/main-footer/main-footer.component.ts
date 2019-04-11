import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})

export class MainFooterComponent implements OnInit {

  leftCountry: string;
  righttCountry: string;
  leftDenomination: string;
  rightDenomination: string;
  leftSymbol: string;
  rightSymbol: string;
  leftAmount: number;
  rightAmount: number;
  errorMessage = '';
  equal = '=';

  constructor(
    public mainframe: MainframeService,
    // public flexModal: FlexModalService
  ) { }

  ngOnInit() {
  }

  saveConversion() {
    console.log('this.resultRightHandSide', this.mainframe.resultRightHandSide,
      'this.resultLeftHandSide', this.mainframe.resultLeftHandSide);
    console.log('nationleft', this.mainframe.conversionLHS.denomination,
      'nationright', this.mainframe.conversionRHS.denomination);
    if (this.mainframe.historyOverflow.length > 3) {
      this.errorMessage = 'Delete one segment';
      alert(this.errorMessage);
    } else {
      if (this.mainframe.history.length > 3) {
        this.mainframe.historyOverflow.unshift(this.mainframe.history[3]);
        this.mainframe.history.splice(3, 1);
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.conversionLHS.country,
          countryRight: this.mainframe.conversionRHS.country,
          denominationLeft: this.mainframe.conversionLHS.denomination,
          denominationRight: this.mainframe.conversionRHS.denomination,
          equalSign: this.mainframe.equal,
          symbolLeft: this.mainframe.conversionLHS.symbol,
          symbolRight: this.mainframe.conversionRHS.symbol,
          conversionLeft: this.mainframe.resultLeftHandSide,
          conversionRight: this.mainframe.resultRightHandSide
        });

        console.log(this.mainframe.historyOverflow);

      } else {
        this.mainframe.history.unshift({
          countryLeft: this.mainframe.conversionLHS.country,
          countryRight: this.mainframe.conversionRHS.country,
          denominationLeft: this.mainframe.conversionLHS.denomination,
          denominationRight: this.mainframe.conversionRHS.denomination,
          equalSign: this.mainframe.equal,
          symbolLeft: this.mainframe.conversionLHS.symbol,
          symbolRight: this.mainframe.conversionRHS.symbol,
          conversionLeft: this.mainframe.resultLeftHandSide,
          conversionRight: this.mainframe.resultRightHandSide
        });
        console.log(this.mainframe.history);
      }
    }
  }

  delete(index: number, arrays: string) {
    if (arrays === 'base') {
      this.mainframe.history.splice(index, 1);
      this.mainframe.history.push(this.mainframe.historyOverflow[0]);
      this.mainframe.historyOverflow.splice(0, 1);
    } else {
      this.mainframe.historyOverflow.splice(index, 1);
    }
  }

  delete2(index: number) {
    this.mainframe.historyOverflow.splice(index, 1);
  }

  clearHistory() {
    this.mainframe.history = [];
    this.mainframe.historyOverflow = [];
  }

}


