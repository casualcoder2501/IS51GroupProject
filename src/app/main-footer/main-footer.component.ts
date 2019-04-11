import { Component, OnInit } from '@angular/core';
import { MainframeService } from '../mainframe.service';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {


  constructor(public mainframe: MainframeService) { }

  ngOnInit() {
  }

  saveConversion() {
    console.log('this.resultRightHandSide', this.mainframe.resultRightHandSide,
                    'this.resultLeftHandSide', this.mainframe.resultLeftHandSide);
    console.log('nationleft', this.mainframe.conversionLHS.denomination,
                    'nationright', this.mainframe.conversionRHS.denomination);
  }

  clearHistory() {
    this.mainframe.history = [];
  }

}


