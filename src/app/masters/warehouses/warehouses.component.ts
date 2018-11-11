import {AfterViewInit, Component, OnInit} from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';

declare interface DataTable {
    headerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
    styleUrls: ['warehouses.component.css']
})

export class WarehousesComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable;

    ngOnInit() {
        /*this.dataTable = {
            headerRow: [],
            dataRows: [
                ['1', 'WARE001', 'Munish Bansal', '7300000003', '<span>Warehouse</span> <span>Sales Office</span>', 'Faridabad', 'Delhi', 'North'],
                ['2', 'WARE002', 'Mahesh Kumar', '8527165400', '<span>Plant</span> <span>Sales Office</span>', 'Faridabad', 'Delhi', 'North'],
                ['3', 'WARE003', 'Chandresh Kumar', '7300000003', '<span>Warehouse</span> <span>Regional HQ</span>', 'Borivali', 'Mumbai', 'North'],
                ['4', 'WARE004', 'Dhananjay Kumar', '8447403937', '<span>Zonal HQ</span> <span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['5', 'WARE005', 'Yogesh Choudhary', '9015248503', '<span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['6', 'WARE006', 'Munish Bansal', '7300000003', '<span>Zonal HQ</span> <span>Plant</span>', 'Faridabad', 'Delhi', 'North'],
                ['7', 'WARE007', 'Mahesh Kumar', '8527165400', '<span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['8', 'WARE008', 'Chandresh Kumar', '7300000003', '<span>Sales Office</span>', 'Borivali', 'Mumbai', 'North'],
                ['9', 'WARE009', 'Dhananjay Kumar', '8447403937', '<span>Plant</span> <span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['10', 'WARE0010', 'Yogesh Choudhary', '9015248503', '<span>National HQ</span> <span>Sales Office</span>', 'Faridabad', 'Delhi', 'North']
            ]
        };*/

         $('#showFilter').click(function(){
            $('#filterContainer').slideToggle();
        });

    }

    ngAfterViewInit() {
        $('#datatables').DataTable({
            'searching': false,
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            data: [
                ['1', 'WARE001', 'Munish Bansal', '7300000003', '<span>Warehouse</span> <span>Sales Office</span>', 'Faridabad', 'Delhi', 'North'],
                ['2', 'WARE002', 'Mahesh Kumar', '8527165400', '<span>Plant</span> <span>Sales Office</span>', 'Faridabad', 'Delhi', 'North'],
                ['3', 'WARE003', 'Chandresh Kumar', '7300000003', '<span>Warehouse</span> <span>Regional HQ</span>', 'Borivali', 'Mumbai', 'North'],
                ['4', 'WARE004', 'Dhananjay Kumar', '8447403937', '<span>Zonal HQ</span> <span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['5', 'WARE005', 'Yogesh Choudhary', '9015248503', '<span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['6', 'WARE006', 'Munish Bansal', '7300000003', '<span>Zonal HQ</span> <span>Plant</span>', 'Faridabad', 'Delhi', 'North'],
                ['7', 'WARE007', 'Mahesh Kumar', '8527165400', '<span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['8', 'WARE008', 'Chandresh Kumar', '7300000003', '<span>Sales Office</span>', 'Borivali', 'Mumbai', 'North'],
                ['9', 'WARE009', 'Dhananjay Kumar', '8447403937', '<span>Plant</span> <span>Warehouse</span>', 'Faridabad', 'Delhi', 'North'],
                ['10', 'WARE0010', 'Yogesh Choudhary', '9015248503', '<span>National HQ</span> <span>Sales Office</span>', 'Faridabad', 'Delhi', 'North']
            ],
            columns: [
                { title: "#" },
                { title: "code" },
                { title: "Contact Person" },
                { title: "Contact Number" },
                { title: "Type" },
                { title: "City" },
                { title: "Region" },
                { title: "Zone" }
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Free text search',
            }

        });

        $('.card .material-datatables label').addClass('form-group');

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

    currentZone: string[];
    zones = [
      {value: 'zoneid-0', viewValue: 'North'},
      {value: 'zoneid-1', viewValue: 'South'},
      {value: 'zoneid-2', viewValue: 'East'},
      {value: 'zoneid-3', viewValue: 'West'}
    ];
}
