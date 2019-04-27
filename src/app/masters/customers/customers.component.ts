import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from './customer-service.service';
import swal from 'sweetalert2';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {EmployeeServices} from '../../shared/employee-services.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

declare interface DataTable {
    headerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['customers.component.css']
})

export class CustomersComponent implements OnInit, AfterViewInit {
    isAdmin;
    employees = [];
    empObject = {}
    customers = [];
    doubleSlider1 = [10000, 30000];
    public dataTable: DataTable;
    filters: FormGroup;
    doubleSlider2 = [20000, 45000];
    names = ['Ram Kumar and Sons', 'Krishan Seeds Bandhar', 'Kissan Agros', 'Sri Ram Agros', 'Goyalsons Agros'];
    filteredOptions: Observable<string[]>;
    userName: FormControl = new FormControl();

    name = '';
    date = '';
    addCustomer: FormGroup;
    editCustomer: FormGroup;

    showSwal(type, msg) {
        if (type === 'success-message') {
            swal({
                type: 'success',
                title: 'Success',
                text: msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'

            }).catch(swal.noop);
        }
    };

    showError(type, msg) {
        if (type === 'error') {
            swal({
                type: 'error',
                title: 'Error',
                text: msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-danger'

            }).catch(swal.noop);
        }
    };

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    constructor(private formBuilder: FormBuilder, private empService: EmployeeServices,
                private service: CustomerService) {
        this.addCustomer = formBuilder.group({
            spoc: ['', Validators.required],
            customer_sap_id: [''],
            name: ['', Validators.required],
            address: ['', [Validators.required]],
            mobile: ['', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
            region: ['PB']
        });
        this.editCustomer = this.formBuilder.group({
            spoc: ['', Validators.required],
            customer_unique_code: ['', Validators.required],
            name: ['', Validators.required],
            address: ['', [Validators.required]],
            mobile: ['', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
        })
    }

    editCustomerModal(customer) {
        this.editCustomer.reset();
        this.editCustomer = this.formBuilder.group({
            spoc: [customer.spoc, Validators.required],
            customer_unique_code: [customer.unique_code, Validators.required],
            name: [customer.name, Validators.required],
            address: [customer.address, [Validators.required]],
            mobile: [customer.mobile, [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
        })
    }

    editCustomerApi() {
        if (this.editCustomer.valid) {
            this.service.editCustomer(this.editCustomer.value).subscribe(value => {
                document.getElementById('dismiss-edit-modal').click()
                this.showSwal('success-message', 'The customer details edited successfully!');
                this.getCustomers();
            }, error1 => {
                this.showError('error', error1.error.msg);
            });
        } else {
            this.validateAllFormFields(this.editCustomer);
        }
    }

    getCustomers() {
        this.service.getCustomers().subscribe(value2 => {
            this.customers = value2;
            console.log(this.customers);
        });
    }

    addCustomers() {
        if (this.addCustomer.valid) {
            this.service.addCustomer(this.addCustomer.value).subscribe(value => {
                document.getElementById('dismiss-add-modal').click()
                this.showSwal('success-message', 'A new customer added to the database successfully!');
                this.addCustomer.reset();
                this.getCustomers();
            }, error1 => {
                this.showError('error', error1.error.msg);
            });
        } else {
            this.validateAllFormFields(this.addCustomer);
        }
    }


    filter(val: string): string[] {
        return this.names.filter(option =>
            option.toLowerCase().includes(val.toLowerCase()));
    }

    ngOnInit() {
        this.isAdmin = JSON.parse(localStorage.getItem('user')).role === 'OrgAdmin';
        this.getCustomers();
        if (this.isAdmin) {
            this.empService.getAdminEmployees().subscribe(value => {
                this.employees = value;
                console.log(this.employees);
                for (let i = 0; i < this.employees.length; i++) {
                    this.empObject[this.employees[i].username] = this.employees[i].name
                }
            })
        } else {
            this.empService.getEmployees().subscribe(value => {
                this.employees = value[0].reportees;
                console.log(this.employees);
                for (let i = 0; i < this.employees.length; i++) {
                    this.empObject[this.employees[i].username] = this.employees[i].name
                }
            })
        }


        this.filteredOptions = this.userName.valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
        this.filters = this.formBuilder.group({
            name: [null],
            visited: [null]
        });

        $('#showFilter').click(function () {
            $('#filterContainer').slideToggle();
        });


        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onInit: function (tab: any, navigation: any, index: any) {

                // check number of tabs and fill the entire row
                let $total = navigation.find('li').length;
                let $wizard = navigation.closest('.card-wizard');

                let $first_li = navigation.find('li:first-child a').html();
                let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);

                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
                $('.moving-tab').css('transition', 'transform 0s');
            },


            onTabShow: function (tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function () {
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if (index !== 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        $('.set-full-height').css('height', 'auto');
    }

    ngAfterViewInit() {
        $('.card .material-datatables label').addClass('form-group');


        // Initialize moving navigation
        $(window).resize(() => {
            $('.card-wizard').each(function () {

                const $wizard = $(this);
                const index = $wizard.bootstrapWizard('currentIndex');
                let $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
                });

                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });
    }


    currentCity: string[];
    cities = [
        {value: 'paris-0', viewValue: 'Paris'},
        {value: 'miami-1', viewValue: 'Miami'},
        {value: 'bucharest-2', viewValue: 'Bucharest'},
        {value: 'new-york-3', viewValue: 'New York'},
        {value: 'london-4', viewValue: 'London'},
        {value: 'barcelona-5', viewValue: 'Barcelona'},
        {value: 'moscow-6', viewValue: 'Moscow'},
    ];

    currentName: string[];

    currentId: string[];
    custids = [
        {value: 'cid-0', viewValue: 'CUST 001'},
        {value: 'cid-1', viewValue: 'CUST 002'},
        {value: 'cid-2', viewValue: 'CUST 003'},
        {value: 'cid-3', viewValue: 'CUST 004'},
        {value: 'cid-4', viewValue: 'CUST 005'},
        {value: 'cid-5', viewValue: 'CUST 006'},
    ];

    currentRegion: string[];
    regions = [
        {value: 'rid-0', viewValue: 'Punjab'},
        {value: 'rid-1', viewValue: 'Haryana'},
        {value: 'rid-2', viewValue: 'Chandigarh'},
        {value: 'rid-3', viewValue: 'Himachal Pradesh'},
        {value: 'rid-4', viewValue: 'Jammu & Kashmir'},
        {value: 'rid-5', viewValue: 'Rajasthan'},
    ];

    currentMgr: string[];
    mgrs = [
        {value: 'mgr-0', viewValue: 'Munish Bansal'},
        {value: 'mgr-1', viewValue: 'Anshul Garg'},
        {value: 'mgr-2', viewValue: 'Mahesh Kumar'},
        {value: 'mgr-3', viewValue: 'Dhananjay Kumar'},
        {value: 'mgr-4', viewValue: 'Chandresh'},

    ];


}
