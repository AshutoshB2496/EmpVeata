import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableData} from '../../md/md-table/md-table.component';
import {EmployeeServices} from '../../shared/employee-services.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {el} from '@angular/platform-browser/testing/src/browser_util';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-customers',
    templateUrl: './employees.component.html',
    styleUrls: ['employees.component.css']
})

export class EmployeesComponent implements OnInit, AfterViewInit {
    public tableData1: TableData;
    public dataTable: DataTable;
    employees = [];
    Manager = '';
    employee: FormGroup;
    editEmployee: FormGroup;
    isAdmin;
    editemp: any = {};
    customers = [];

    showSwal(type, msg) {
        if (type === 'success-message') {
            swal({
                type: 'success',
                title: 'Action Done!',
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

    constructor(private employeeService: EmployeeServices, private fb: FormBuilder) {

        this.employee = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
            code: ['', [Validators.required]]
        });
        this.editEmployee = this.fb.group({
            id: [''],
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
            code: ['', [Validators.required]]
        })
    }

    openEmpModal(employee) {
        this.editemp = {};
        this.editemp = employee;
        this.editEmployee.reset();
        this.editEmployee = this.fb.group({
            id: [employee.id],
            name: [employee.name, [Validators.required]],
            email: [employee.email, [Validators.required, Validators.email]],
            mobile: [employee.mobile, [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
            code: [employee.username, [Validators.required]]
        })
    }

    getEmpCustomer(spoc) {
        this.employeeService.getCustomers(spoc).subscribe(value => {
            console.log(value);
            this.customers = value;
        })
    }

    editEmployeeApi() {
        if (this.editEmployee.valid) {
            if (this.editemp.name !== this.editEmployee.value.name) {
                this.employeeService.editEmpName(this.editEmployee.value).subscribe(value => {
                    this.getEmployees();
                }, error1 => {
                    this.showError('error', error1.error.msg);
                });
            }
            if (this.editemp.email !== this.editEmployee.value.email) {
                this.employeeService.editEmpEmail(this.editEmployee.value).subscribe(value2 => {
                    this.getEmployees();
                }, error1 => {
                    this.showError('error', error1.error.msg);
                });
            }
            if (this.editemp.mobile !== this.editEmployee.value.mobile) {
                this.employeeService.editEmpMobile(this.editEmployee.value).subscribe(value3 => {
                    this.getEmployees();
                }, error1 => {
                    this.showError('error', error1.error.msg);
                });
            }
            document.getElementById('dismiss-edit-modal').click();
            this.showSwal('success-message', 'The employee details edited successfully!');
            this.getEmployees();
        } else {
            this.validateAllFormFields(this.editEmployee);
        }
    }

    addEmployee() {
        document.getElementById('dismiss-add-modal').click()
        this.showSwal('success-message', 'A new employee added to the database successfully!');
        this.employee.reset();
        this.getEmployees();
    }

    submit() {
        if (this.employee.valid) {
            if (this.isAdmin) {
                this.employeeService.addadminEmployee(this.employee.value).subscribe(value => {
                    this.addEmployee();
                }, error1 => {
                    this.showError('error', error1.error.msg);
                });
            } else {
                this.employeeService.addfeildEmployee(this.employee.value).subscribe(value => {
                    this.addEmployee();
                }, error1 => {
                    this.showError('error', error1.error.msg);
                });
            }
        } else {
            this.validateAllFormFields(this.employee);
        }
    }

    getEmployees() {
        if (this.isAdmin) {
            this.employeeService.getAdminEmployees().subscribe(value => {
                this.employees = value;
                this.Manager = 'Admin'
                console.log(this.employees);
            })
        } else {
            this.employeeService.getEmployees().subscribe(value => {
                this.employees = value[0].reportees;
                console.log(this.employees);
                this.Manager = value[0].string1;
            })
        }
    }

    ngOnInit() {

        this.isAdmin = JSON.parse(localStorage.getItem('user')).role === 'OrgAdmin';

        this.getEmployees();

        $('.set-full-height').css('height', 'auto');

    }

    ngAfterViewInit() {
    }

}
