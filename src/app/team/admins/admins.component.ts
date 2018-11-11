import {AfterViewInit, Component, OnInit} from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
    styleUrls: ['admins.component.css']
})

export class AdminsComponent implements OnInit, AfterViewInit {
    public dataTable: DataTable;

    ngOnInit() {

        this.dataTable = {
            headerRow: [ '#', 'Name', 'Email', 'Mobile', 'Type', 'Actions'],
            footerRow: [ '#', 'Name', 'Email', 'Mobile', 'Type', 'Actions'],

            dataRows: [
                ['1', 'IILHQ Admin', 'hq@iil.com', '7000008769', 'Org Admin', '' ],
                ['2', 'Admin', 'rmsadmin@example.com', '7000008770', 'Org Admin', '' ],
                ['3', 'Depot Manager Tech AP', 'dmtechap@iil.com', '--', 'Org Admin', ''],
                ['4', 'Sonipat DM', 'dmsomipat@example.com', '--', 'Depot Manager', '' ],
                ['5', 'Ludhiana Depot Manager', 'LDM@iil.com', '--', 'Depot Manager', '']

            ]
        };

        $("#showFilter").click(function(){
            $("#filterContainer").slideToggle();
        });

        

        
        $('.set-full-height').css('height', 'auto');

    }

    ngAfterViewInit() {
        $('#datatables').DataTable({
            'searching': false,
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [2, 5, 10, -1],
                [2, 5, 10, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Free text search',
            }

        });

        const table = $('#datatables').DataTable();

        $('.card .material-datatables label').addClass('form-group');

    }

    currentType: string[];
    types = [
      {value: 'typeid-0', viewValue: 'Type 001'},
      {value: 'typeid-1', viewValue: 'Type 002'},
      {value: 'typeid-2', viewValue: 'Type 003'},
      {value: 'typeid-3', viewValue: 'Type 004'},
      {value: 'typeid-4', viewValue: 'Type 005'},
      {value: 'typeid-5', viewValue: 'Type 006'},
    ];


}
