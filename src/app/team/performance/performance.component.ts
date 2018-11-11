import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  username: string;
  link: string;
  constructor() { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.link = 'http://performance.dashboard.simplifii.xyz/#/targets?manager_username=' + this.username;
    $('#myframe').attr('src', this.link);
    console.log(this.link);
  }

}
