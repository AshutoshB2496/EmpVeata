import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Employee} from '../Models/employee.model';

const base_Url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class EmployeeServices {

    public rootTree = new Subject<Employee>();
    public sendEmployeeName = new Subject<string>();
    private http: HttpClient;

    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }

    getEmployees() {
        const t = 'Bearer ' + localStorage.getItem('my_login_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = base_Url + 'custom/myteam';
        return this.http.get<any>(url, header)
            .map(value => {
                return value.response.data;
            });
    }

    getAdminEmployees() {
        const t = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = base_Url + 'cards/all?type=Employee&state=Added&sort_by=-updated_at&items_per_page=100&equalto___rm=91429';
        return this.http.get<any>(url, header)
            .map(value => {
                return value.response.data;
            });
    }


    getCustomers(spoc) {
        const t = 'Bearer ' + localStorage.getItem('my_login_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = base_Url + '/cards/all?type=Client&equalto___spoc=' + spoc;
        return this.http.get<any>(url, header)
            .map(value => {
                return value.response.data;
            });
    }


    addadminEmployee(employee) {
        const t = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = base_Url + 'cards';
        return this.http.post<any>(url, {
            'entity': 'Employee',
            'action': 'CreateTLE',
            'name': employee.name,
            'email': employee.email,
            'mobile': employee.mobile,
            'employee_code': employee.code,
            'approver_mobile': '7300000000',
            'job_type': 'Onroll',
            'territory': 'Moga',
            'password': '123456',
            'level': '4',
            'is_approver': '1',
            'vehicle_ownership': 'self',
            'vehicle_type': 'mc',
            'per_km_rate': '15',
            'max_allowed_fuel': '15',
            'max_allowed_km': '15',
            'plant': 'Ludhiana Branch'
        }, header).map(value => {
            return value.response.data;
        });
    }

    addfeildEmployee(employee) {
        const token = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', token),
            'Content-Type': 'application/json',
        };
        const url = base_Url + 'cards';
        return this.http.post<any>(url, {
            'entity': 'Employee',
            'action': 'CreateTLE',
            'name': employee.name,
            'email': employee.email,
            'mobile': employee.mobile,
            'employee_code': employee.code,
            'approver_mobile': JSON.parse(localStorage.getItem('user')).mobile,
            'job_type': 'Onroll',
            'territory': 'Moga',
            'password': '123456',
            'level': '4',
            'is_approver': '0',
            'vehicle_ownership': 'self',
            'vehicle_type': 'mc',
            'per_km_rate': '15',
            'max_allowed_fuel': '15',
            'max_allowed_km': '15',
            'plant': 'Ludhiana Branch'
        }, header).map(value => {
            return value.response.data;
        });
    }

    editEmpName(employee) {
        const token = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', token),
            'Content-Type': 'application/json',
        };
        const url = base_Url + 'cards';
        return this.http.patch<any>(url, {
            'entity': 'Employee',
            'action': 'EditName',
            'name': employee.name,
            'card_unique_code': employee.code,
            'id': employee.id
        }, header).map(value => {
            return value.response.data;
        });
    }

    editEmpMobile(employee) {
        const token = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', token),
            'Content-Type': 'application/json',
        };
        const url = base_Url + 'cards';
        return this.http.patch<any>(url, {
            'entity': 'Employee',
            'action': 'EditMobile',
            'mobile': employee.mobile,
            'card_unique_code': employee.code,
            'id': employee.id
        }, header).map(value => {
            return value.response.data;
        });
    }

    editEmpEmail(employee) {
        const token = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', token),
            'Content-Type': 'application/json',
        };
        const url = base_Url + 'cards';
        return this.http.patch<any>(url, {
            'entity': 'Employee',
            'action': 'EditEmail',
            'email': employee.email,
            'card_unique_code': employee.code,
            'id': employee.id
        }, header).map(value => {
            return value.response.data;
        });
    }
}
