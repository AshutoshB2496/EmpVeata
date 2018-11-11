// http://sfa.demoplatform.simplifii.com/api/v1/get/performance_data?manager_username=hqadmin&rtj=28
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';
const base_month = 31;

@Injectable()
export class MonthlytargetService {

    constructor(private http: HttpClient) {
    }

    getMonthlyDataOfcurrent(username): Observable<any> {
        return this.http.get<any>(base_url + 'get/performance_data?manager_username=' + username + '&rtj='
            + base_month).map(value => {
            return value.response.data;
        });
    }

    getMonthlyDataOfpre(username): Observable<any> {
        return this.http.get<any>(base_url + 'get/performance_data?manager_username=' + username + '&rtj='
            + (base_month - 1)).map(value => {
            return value.response.data;
        });
    }

    getMonthlyDataOfpreTopre(username): Observable<any> {
        return this.http.get<any>(base_url + 'get/performance_data?manager_username=' + username + '&rtj='
            + (base_month - 2)).map(value => {
            return value.response.data;
        });
    }
}
