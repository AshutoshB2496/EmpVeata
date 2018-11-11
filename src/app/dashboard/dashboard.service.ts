import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';
const base_month_value = 31;

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {
    }

    getSales(zone, period): Observable<any> {
        const min = base_month_value - period;
        const max = base_month_value - 1;
        return this.http.get<any>(base_url + 'get/performance_data?geography_type=Zone&rtj_from=' + min + '&rtj_to=' + max).map(value => {
            return value.response.data;
        });
    }

// geography_type=Pan India&geography=India
    getPerDay(): Observable<any> {
        const min = base_month_value - 6;
        const max = base_month_value - 1;
        return this.http.get<any>(base_url + 'get/performance_data?geography_type=Pan India&geography=India&rtj_from=' + min + '&rtj_to=' + max).map(value => {
            return value.response.data;
        });
    }

    gettaskCount() {
        return this.http.get<any>('http://sfa.demoplatform.simplifii.com/api/v1/custom/getmytasks').map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    getAR(zone, period): Observable<any> {
        const min = base_month_value - period;
        const max = base_month_value - 1;
        if (zone === 'India') {
            return this.http.get<any>(base_url + 'get/performance_data?geography_type=Pan India&geography=India&rtj_from=' + min + '&rtj_to=' + max).map(value => {
                return value.response.data;
            });
        } else {
            return this.http.get<any>(base_url + 'get/performance_data?geography_type=Zone&rtj_from=' + min + '&rtj_to=' + max).map(value => {
                return value.response.data;
            });
        }
    }

    getOrderIssues(): Observable<any> {
        const min = base_month_value - 3;
        const max = base_month_value - 1;
        return this.http.get<any>(base_url + 'get/performance_data?geography_type=Pan India&geography=India&rtj_from=' + min + '&rtj_to=' + max).map(value => {
            return value.response.data;
        });
    }

    getOverDueData(year, month): Observable<any> {
        return this.http.get<any>(base_url + 'get/performance_data?geography_type=Pan India&geography=India&year=' + year + '&month=' + month).map(value => {
            return value.response.data;
        });
    }

    getWorstSales(): Observable<any> {
        const max = base_month_value - 1;
        return this.http.get<any>(base_url + 'get/performance_data?rtj=' + max + '&geography_type=Region&sortby=-sales_target_achieved&limit=4').map(value => {
            return value.response.data;
        });
    }
}