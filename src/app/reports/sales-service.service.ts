import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'http://sfa.demoplatform.simplifii.com/api/v1/';
@Injectable()

export class SalesService {

    constructor(private http: HttpClient) {}

    getZoneData(month: string, year: string) {
        const url = baseUrl + 'get/performance_data?geography_type=zone&month=' + month + '&year=' + year;
        return this.http.get<any>(url)
            .map(value => {
                return value.response;
            });
    }
    getRegionData(zone: string, month: string, year: string) {
        const url = baseUrl + 'get/performance_data?geography_type=region&zone=' + zone + '&month=' + month + '&year=' + year;
        return this.http.get<any>(url)
            .map(value => {
                return value.response;
            });
    }
}