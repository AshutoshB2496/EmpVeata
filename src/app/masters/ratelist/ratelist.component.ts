import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../../shared/table/tableService.service';
import {MatSnackBar} from '@angular/material';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-ratelist',
    templateUrl: './ratelist.component.html',
    styleUrls: ['ratelist.component.css']
})

export class RatelistComponent implements OnInit, AfterViewInit {

    stocks: any[];
    staticRegion = 'AP';
    selectedCat = 'Dust';
    selectedReg = 'AP';
    regions = ['Punjab', 'Andhra Pradesh'];
    regionId = ['PB', 'AP'];
    units: any[];
    message: any;
    region: any;
    plants: any[];
    public dataTable: DataTable;
    file: File;
    username: string;
    target: string;
    type: string;
    public fileup: any;
    public uploadData: any = FormData;

    constructor(private service: TableService,
                private router: Router,
                private route: ActivatedRoute, private snackBar: MatSnackBar) {
    }

    onFileChange(event) {
        console.log(event);

        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
            this.fileup = fileList[0];

            this.uploadData = new FormData();
            this.uploadData.append('file', this.file, this.file.name);
            this.uploadData.append('action', 'Create');
            this.uploadData.append('entity', 'Ratelist');
        }
    }

    SetLoadBulk() {
        this.service.deleteBulk().subscribe(value => {
            this.service.uploadRatelist(this.uploadData).subscribe(value1 => {
                this.snackBar.open('Bulk operation done.You added a new ratelist', 'Success', {
                    duration: 3500,
                    verticalPosition: 'top'
                });
                this.router.navigate(['table', 'ratelist'], {
                    relativeTo: this.route,
                    queryParams: {
                        category: this.selectedCat,
                        region: this.selectedReg,
                        token: localStorage.getItem('my_login_token')
                    }
                });
            }, error1 => {
                this.snackBar.open(error1.error.msg, 'Error', {
                    duration: 3000,
                    verticalPosition: 'top'
                });
            })
        }, err => {
            console.log(err.error.msg);
            this.snackBar.open(err.error.msg, 'Error', {
                duration: 3000,
                verticalPosition: 'top'
            });
        });
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
        this.router.navigate(['table', 'ratelist'], {
            relativeTo: this.route,
            queryParams: {
                category: name,
                region: localStorage.getItem('region'),
                token: localStorage.getItem('my_login_token')
            }
        });
    }

    RegionNext(name) {
        for (let i = 0; i < this.plants.length; i++) {
            if (this.plants[i].name === name) {
                this.region = this.plants[i].possible_units;
                break;
            }
        }
        localStorage.setItem('units', JSON.stringify(this.region));
        localStorage.setItem('region', name);
        console.log('entered with: ' + name);
        this.router.navigate(['table', 'ratelist'], {
            relativeTo: this.route,
            queryParams: {
                category: localStorage.getItem('category'),
                region: name,
                token: localStorage.getItem('my_login_token')
            }
        });
    }

    ngOnInit(): void {
        this.message = this.route.queryParams.subscribe(params => {
            localStorage.setItem('region', this.staticRegion);
            this.service.getCategories().subscribe(value => {
                this.plants = value;
            });
        });
        this.router.navigate(['table', 'ratelist'], {
            relativeTo: this.route,
            queryParams: {
                category: 'Dust',
                region: 'AP',
                token: localStorage.getItem('my_login_token')
            }
        });
    }

    ngAfterViewInit() {


        $('#fixedTable tbody').scroll(function (e) {
            $('#fixedTable thead').css('left', -$('tbody').scrollLeft());
            $('#fixedTable thead th:nth-child(1)').css('left', $('tbody').scrollLeft());
            $('#fixedTable tbody td:nth-child(1)').css('left', $('tbody').scrollLeft());
        });
    }


}
