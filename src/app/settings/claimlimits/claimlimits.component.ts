import {AfterViewInit, Component, OnInit} from '@angular/core';

declare var $: any;
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-claimlimits',
  templateUrl: './claimlimits.component.html',
    styleUrls: ['claimlimits.component.css']
})

export class ClaimlimitsComponent implements OnInit, AfterViewInit {

    public tableData: TableData;

    ngOnInit() {

        this.tableData = {
            headerRow: [ 'Level', 'Tag', 'Air Travel', 'Hotel(Per day)', 'Phone(Per Month)', 'Outstation DA (Per day)', 'Local DA (Per day)', ''],
            dataRows: [
                ['1', 'Tag1', '', '450', '200', '150', '100', ''],
                ['2', 'Tag2', '', '600', '375', '200', '140', ''],
                ['3', 'Tag3', '', '900', '471', '300', '200', '']
            ]
        };

    }
    ngAfterViewInit() {

    }

    currentRegion: string[];
    regions = [
        {value: 'rid-0', viewValue: 'Region 001'},
        {value: 'rid-1', viewValue: 'Region 002'},
        {value: 'rid-2', viewValue: 'Region 003'},
        {value: 'rid-3', viewValue: 'Region 004'},
        {value: 'rid-4', viewValue: 'Region 005'},
        {value: 'rid-5', viewValue: 'Region 006'},
    ];
}
