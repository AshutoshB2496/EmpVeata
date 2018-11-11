import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {Molecule} from '../../Models/molecule.model';
import {TableService} from './tableService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-table',
    templateUrl: 'table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

    category: string;
    stocks: any[];
    molecules: Molecule[];
    molecules2: Molecule[] = [];
    units: any[];
    tableType: string;
    constructor(private service: TableService,
                private route: ActivatedRoute,
                private loaderService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.loaderService.show();
        this.route.params
            .subscribe(params => {
                this.loaderService.hide();
                this.tableType = params['type'];
            });
        if (this.tableType === 'stock') {
            this.printStock();
        } else if (this.tableType === 'ratelist') {
            this.printRatelist();
        }
    }
    printStock() {
        this.loaderService.show();
        this.route.queryParams
            .subscribe(params => {
                localStorage.setItem('category', params['category']);
                localStorage.setItem('region', params['region']);
                this.service.getstock().subscribe(value => {
                    this.stocks = value;
                    this.service.getMolecule().subscribe(value2 => {
                        this.loaderService.hide();
                        this.molecules = value2;
                        for (let i = 0; i < this.molecules.length; i++) {
                            for (let j = 0; j < this.stocks.length; j++) {
                                if (this.molecules[i].molecule === this.stocks[j].molecule) {
                                    this.molecules[i].stocks = this.stocks[j];
                                    this.molecules2.push(this.molecules[i]);
                                }
                            }
                        }
                        this.service.getunits().subscribe(value1 => {
                            this.units = value1;
                        })
                    });
                });
            });
    }
    printRatelist() {
        this.loaderService.show();
        this.route.queryParams
            .subscribe(params => {
                localStorage.setItem('category', params['category']);
                localStorage.setItem('region', params['region']);
                this.service.getratelist().subscribe(value => {
                    this.stocks = value;
                    this.service.getMolecule().subscribe(value2 => {
                        this.loaderService.hide();
                        this.molecules = value2;
                        for (let i = 0; i < this.molecules.length; i++) {
                            for (let j = 0; j < this.stocks.length; j++) {
                                if (this.molecules[i].molecule === this.stocks[j].molecule) {
                                    this.molecules[i].stocks = this.stocks[j];
                                    this.molecules2.push(this.molecules[i]);
                                }
                            }
                        }
                        this.service.getunits().subscribe(value1 => {
                            this.units = value1;
                        })
                    });
                });
            });
    }
    ngAfterViewInit() {


        $('#fixedTable tbody').scroll(function(e) {

            $('#fixedTable thead').css("left", -$("tbody").scrollLeft());
            $('#fixedTable thead th:nth-child(1)').css("left", $("tbody").scrollLeft());
            $('#fixedTable tbody td:nth-child(1)').css("left", $("tbody").scrollLeft());
        });
    }

}
