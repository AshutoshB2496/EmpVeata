import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class RequestsService {
    constructor(private http: HttpClient) {
    }

    getSalesReturn(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Request&sort_by=-created_at&embed=creator').map(value => {
            return value.response.data;
        });
    }

    getExcessDiscount(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=ExcessDiscount&sort_by=-created_at&embed=creator').map(value => {
            return value.response.data;
        });
    }

    getCreditLimit(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=CreditLimitExtension&sort_by=-created_at&embed=creator').map(value => {
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
}
