import { Component } from '@angular/core';
import { } from '@types/googlemaps';
import {Router} from '@angular/router';

@Component({
  selector: 'app-daywise',
  templateUrl: './daywise.component.html',
    styleUrls: ['daywise.component.css']
})

export class DaywiseComponent {
  constructor(private router: Router) {}
    toggleView() {
      this.router.navigate(['userslocation', 'daywise-list']);
    }
}
