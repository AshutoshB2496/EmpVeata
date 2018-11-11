import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class SalesService {
    constructor(private http: HttpClient) {
    }

    getOpenOrders(searchparam): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Order&state=Unprocessed&sort_by=-updated_at&embed=creator' + searchparam).map(value => {
            return value.response.data;
        });
    }

    getAccptedOrders(searchparam): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Order&state=Accepted&sort_by=-updated_at&embed=creator' + searchparam).map(value => {
            return value.response.data;
        });
    }

    getInvoicedOrders(searchparam): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Order&state=Invoiced&sort_by=-updated_at&embed=creator' + searchparam).map(value => {
            return value.response.data;
        });
    }

    getRejectedOrders(searchparam): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Order&state=Rejected&sort_by=-updated_at&embed=creator' + searchparam).map(value => {
            return value.response.data;
        });
    }

    PatchAction(uniqueid: string, comment: string, action: string): Observable<any> {
        return this.http.patch<any>(base_url + 'cards',
            {
                card_unique_code: uniqueid,
                comment: comment,
                action: action
            }
        ).map((value) => {
            console.log(value.msg);
            return value.msg;
        });
    }

    PatchApprove(uniqueid: string): Observable<any> {
        return this.http.patch<any>(base_url + 'cards',
            {
                card_unique_code: uniqueid,
                action: 'Approve'
            }
        ).map((value) => {
            console.log(value.msg);
            return value.msg;
        });
    }

// get filter prefilled values api
    getEmployees(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Employee').map(value => {
            return value.response.data;
        });
    }

    getCustomers(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Distributor').map(value => {
            return value.response.data;
        });
    }

    getPlant(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Plant').map(value => {
            return value.response.data;
        });
    }
}
