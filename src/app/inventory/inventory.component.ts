import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../shared/table/tableService.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-inventory-cmp',
    templateUrl: 'inventory.component.html',
    styleUrls: ['inventory.component.css']
})

export class InventoryComponent implements OnInit, AfterViewInit {

    stocks: any[];
    selectedCat = 'Dust';
    selectedPlant = '1111';
    plantsCode = ['1111', '1105'];
    units: any[];
    message: any;
    region: any;
    plants: any[];
    public dataTable: DataTable;

    constructor(private service: TableService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    Next(name) {
        /*var name = this.selectedCat;*/
        for (let i = 0; i < this.plants.length; i++) {
            if (this.plants[i].name === name) {
                this.region = this.plants[i].possible_units;
                break;
            }
        }
        localStorage.setItem('units', JSON.stringify(this.region));
        localStorage.setItem('category', name);
        console.log('entered with: ' + name);
        this.router.navigate(['table', 'stock'], {relativeTo: this.route,
            queryParams: {
                category: name,
                plant: localStorage.getItem('plant'),
                token: localStorage.getItem('my_login_token')
            }});
    }

    plantNext(name) {
        for (let i = 0; i < this.plants.length; i++) {
            if (this.plants[i].name === name) {
                this.region = this.plants[i].possible_units;
                break;
            }
        }
        localStorage.setItem('units', JSON.stringify(this.region));
        localStorage.setItem('plant', name);
        console.log('entered with: ' + name);
        this.router.navigate(['table', 'stock'], {relativeTo: this.route,
            queryParams: {
                category: localStorage.getItem('category'),
                plant: name,
                token: localStorage.getItem('my_login_token')
            }});
    }

    ngOnInit(): void {
        this.message = this.route.queryParams.subscribe(params => {
            this.service.getCategories().subscribe(value => {
                this.plants = value;
            });
        });
        this.router.navigate(['table', 'stock'], {relativeTo: this.route,
            queryParams: {
                category: 'Dust',
                plant: '1111',
                token: localStorage.getItem('my_login_token')
            }});
        $("#showFilter").click(function() {
            $("#filterContainer").slideToggle();
        });
    }

    ngAfterViewInit() {


        $('#fixedTable tbody').scroll(function(e) { //detect a scroll event on the tbody

            $('#fixedTable thead').css("left", -$("tbody").scrollLeft());
            $('#fixedTable thead th:nth-child(1)').css("left", $("tbody").scrollLeft());
            $('#fixedTable tbody td:nth-child(1)').css("left", $("tbody").scrollLeft());
        });
    }
    currentId: string[];
    placedids = [
        {value: 'placedid-0', viewValue: 'Today'},
        {value: 'placedid-1', viewValue: 'Yesterday'},
        {value: 'placedid-2', viewValue: 'Last 7 Days'},
        {value: 'placedid-3', viewValue: 'Last 30 Days'}
    ];

    currentStatus: string[];
    statusids = [
        {value: 'statusid-0', viewValue: 'Open'},
        {value: 'statusid-1', viewValue: 'Accepted'},
        {value: 'statusid-2', viewValue: 'Invoiced'},
        {value: 'statusid-3', viewValue: 'Rejected'}
    ];
    currentDepot: string[];
    depotids = [
        {value: 'depotid-0', viewValue: 'Depot 001'},
        {value: 'depotid-1', viewValue: 'Depot 002'},
        {value: 'depotid-2', viewValue: 'Depot 003'},
        {value: 'depotid-3', viewValue: 'Depot 004'}
    ];
    doubleSlider1 = [10000, 30000];
}
