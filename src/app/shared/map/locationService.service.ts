import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';
@Injectable()
export class LocationService {

    constructor(private http: HttpClient) {}

    getLocations (id: string, date: string) {
        const url = base_url + 'cards/all?type=Location&' +
            'sort_by=datetime1&creator=' + id + '&equalto___recorded_at_date=' + date;
        /*const token = 'bearer ' + localStorage.getItem('token');*/
        /*const headers = new HttpHeaders().set('Authorization', token);*/
        return this.http.get<any>(url).map(value => {
            return value.response;
        });
    }

    getEmployees (id: string) {
        const url = base_url + 'cards/all?type=Employee&show_columns=string1,int1,username&equalto___rm=' + id;
        const token = 'bearer ' + localStorage.getItem('token');
        /*const headers = new HttpHeaders().set('Authorization', token);*/
        return this.http.get<any>(url).map(value => {
            return value.response;
        });
    }
    /*setDateFilter(date: string) {
        const url = base_url + 'cards/all?type=Location&items_per_page=100&equalto___recorded_at_date=' + date + '&show_columns=float1,float2,datetime1,fk_creator&embed=creator';
        return this.http.post<any>(url, );
    }*/
}
