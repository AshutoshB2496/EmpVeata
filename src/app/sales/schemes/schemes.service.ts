import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'http://sfa.demoplatform.simplifii.com/api/v1/';
@Injectable()
export class SchemesService {

    constructor(private http: HttpClient) {}

    getSchemes() {
        const url = baseUrl + 'cards/all?type=Scheme&sort_by=-created_at';
        return this.http.get<any>(url)
            .map(value => {
                return value.response.data;
            })
    }
    getSchemesExpired() {
        const url = baseUrl + 'cards/all?type=Scheme&sort_by=-created_at&equalto___expired=1';
        return this.http.get<any>(url)
            .map(value => {
                return value.response.data;
            })
    }
    getSchemesRunning() {
        const url = baseUrl + 'cards/all?type=Scheme&sort_by=-created_at&equalto___expired=0';
        return this.http.get<any>(url)
            .map(value => {
                return value.response.data;
            })
    }
}
