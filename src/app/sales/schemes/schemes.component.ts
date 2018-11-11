import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {SchemesService} from './schemes.service';

declare var $: any;
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
    styleUrls: ['schemes.component.css']
})

export class SchemesComponent implements OnInit, AfterViewInit {

    public tableData: TableData;
    allReg = [];
    allPro = [];
    schemes: any[];
    regions = ['Region 1', 'Region 2', 'Region 3', 'Region 4', 'Region 5', 'Region 6'];

    constructor(private service: SchemesService,
                private loaderService: Ng4LoadingSpinnerService) {}

    /*createALLSchemes() {
        this.allReg = [];
        this.allPro = [];
        this.schemes = [];
        this.tableData = {
            headerRow: [ '', 'Title', 'Brochure', 'Validity', 'Visibility', 'Valid On', ''],
            dataRows: []
        };
        this.service.getSchemes()
            .subscribe(data => {
                this.schemes = data;
                console.log(this.schemes[0].image);
                for (let i = 0 ; i < this.schemes.length; i++) {
                    const temp = [];
                    temp.push(this.schemes[i].image);
                    temp.push(this.schemes[i].title);
                    temp.push(this.schemes[i].description);
                    temp.push('');
                    temp.push(this.schemes[i].validity);
                    if (this.schemes[i].applicable_all_region === 0) {
                        this.allReg.push(false);
                        const str = this.schemes[i].regions;
                        const reg = str.split(',');
                        temp.push(reg);
                    } else {
                        this.allReg.push(true);
                        temp.push('All Regions')
                    }
                    if (this.schemes[i].applicable_all_products === 0) {
                        this.allPro.push(false);
                        const str = this.schemes[i].products;
                        console.log('splitting');
                        const pro = str.split(',');
                        temp.push(pro);
                    } else {
                        this.allPro.push(true);
                        temp.push('All Products')
                    }
                    temp.push('');
                    this.tableData.dataRows.push(temp);
                }
            });
    }*/
    createExpiredSchemes() {
        this.allReg = [];
        this.allPro = [];
        this.schemes = [];
        this.tableData = {
            headerRow: [ '', 'Title', 'Brochure', 'Validity', 'Visibility', 'Valid On', ''],
            dataRows: []
        };
        this.loaderService.show();
        this.service.getSchemesExpired()
            .subscribe(data => {
                this.loaderService.hide();
                this.schemes = data;
                for (let i = 0 ; i < this.schemes.length; i++) {
                    const temp = [];
                    temp.push(this.schemes[i].image);
                    temp.push(this.schemes[i].title);
                    temp.push(this.schemes[i].description);
                    temp.push('');
                    temp.push(this.schemes[i].validity);
                    if (this.schemes[i].applicable_all_region === 0) {
                        this.allReg.push(false);
                        const str = this.schemes[i].regions;
                        const reg = str.split(',');
                        temp.push(reg);
                    } else {
                        this.allReg.push(true);
                        temp.push('All Regions')
                    }
                    if (this.schemes[i].applicable_all_products === 0) {
                        this.allPro.push(false);
                        const str = this.schemes[i].products;
                        console.log('splitting');
                        const pro = str.split(',');
                        temp.push(pro);
                    } else {
                        this.allPro.push(true);
                        temp.push('All Products')
                    }
                    temp.push('');
                    this.tableData.dataRows.push(temp);
                }
            });
    }
    createCurrentSchemes() {
        this.allReg = [];
        this.allPro = [];
        this.schemes = [];
        this.tableData = {
            headerRow: [ '', 'Title', 'Brochure', 'Validity', 'Visibility', 'Valid On', ''],
            dataRows: []
        };
        this.loaderService.show();
        this.service.getSchemesRunning()
            .subscribe(data => {
                this.loaderService.hide();
                this.schemes = data;
                for (let i = 0 ; i < this.schemes.length; i++) {
                    console.log(this.schemes[i].image);
                    const temp = [];
                    temp.push(this.schemes[i].image);
                    temp.push(this.schemes[i].title);
                    temp.push(this.schemes[i].description);
                    temp.push('');
                    temp.push(this.schemes[i].validity);
                    if (this.schemes[i].applicable_all_region === 0) {
                        this.allReg.push(false);
                        const str = this.schemes[i].regions;
                        const reg = str.split(',');
                        temp.push(reg);
                    } else {
                        this.allReg.push(true);
                        temp.push('All Regions')
                    }
                    if (this.schemes[i].applicable_all_products === 0) {
                        this.allPro.push(false);
                        const str = this.schemes[i].products;
                        console.log('splitting');
                        const pro = str.split(',');
                        temp.push(pro);
                    } else {
                        this.allPro.push(true);
                        temp.push('All Products')
                    }
                    temp.push('');
                    this.tableData.dataRows.push(temp);
                }
            });
    }
    ngOnInit() {
        this.createCurrentSchemes();
        this.tableData = {
            headerRow: [ '', 'Title', 'Brochure', 'Validity', 'Visibility', 'Valid On', ''],
            dataRows: []
        };

    }
    getSchemes(state: string) {
        if (state === 'c') {
            this.createCurrentSchemes();
        } else if (state === 'p') {
            this.createExpiredSchemes();
        }
    }
    ngAfterViewInit() {

    }
}
