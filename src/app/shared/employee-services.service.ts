import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Employee} from '../Models/employee.model';

const base_Url = 'http://sfa.demoplatform.simplifii.com/api/v1/';
@Injectable()
 export class EmployeeServices {

    public rootTree = new Subject<Employee>();
    public sendEmployeeName = new Subject<string>();
    constructor(private http: HttpClient) {}
    getEmployees() {
        const url = base_Url + 'custom/myteam';
        return this.http.get<any>(url)
            .map(value => {
                return value.response.data;
            });
    }
}
