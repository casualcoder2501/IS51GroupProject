import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
// export class DemoButtonsDisabledComponent {
//   disabled: false;
// }
export class MainHeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // FUNCTION USED FOR NAVIGATING PAGES W/OUT USING HREF
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}

