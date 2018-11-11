import {AfterViewInit, Component, OnInit} from '@angular/core';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-teams-location',
  templateUrl: './teams-location.component.html',
    styleUrls: ['teams-location.component.css']
})

export class TeamsLocationComponent implements OnInit, AfterViewInit {
    public dataTable: DataTable;

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

}
