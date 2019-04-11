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

  constructor(public mainframe: MainframeService) { }

  ngOnInit() {
  }

  saveConversion() {
    console.log('this.resultRightHandSide', this.mainframe.resultRightHandSide,
      'this.resultLeftHandSide', this.mainframe.resultLeftHandSide);
    console.log('nationleft', this.mainframe.conversionLHS.denomination,
      'nationright', this.mainframe.conversionRHS.denomination);
    this.mainframe.history.unshift({
      countryLeft: this.mainframe.conversionLHS.country,
      countryRight: this.mainframe.conversionRHS.country,
      denominationLeft: this.mainframe.conversionLHS.denomination,
      denominationRight: this.mainframe.conversionRHS.denomination,
      symbolLeft: this.mainframe.conversionLHS.symbol,
      symbolRight: this.mainframe.conversionRHS.symbol,
      conversionLeft: this.mainframe.resultLeftHandSide,
      conversionRight: this.mainframe.resultRightHandSide
    });
    console.log(this.mainframe.history);
  }

  delete(index: number) {
    this.mainframe.history.splice(index, 1);
  }

  clearHistory() {
    this.mainframe.history = [];
  }

}


