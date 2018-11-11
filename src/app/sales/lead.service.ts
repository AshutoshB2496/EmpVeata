import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class LeadService {

    constructor(private http: HttpClient) {
    }

    getStage1Leads(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Lead&sort_by=-updated_at&embed=cards,-history,inversecards,creator&state' +
            '=Added').map(value => {
            return value.response.data;
        });
    }

    getStage2Leads(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Lead&sort_by=-updated_at&embed=cards,-history,inversecards,creator&state' +
            '=LevelOneApproved').map(value => {
            return value.response.data;
        });
    }

    getApprovedLeads(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Lead&sort_by=-updated_at&embed=cards,-history,inversecards,creator&state' +
            '=Approved').map(value => {
            return value.response.data;
        });
    }

    getRejectedLeads() {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Lead&sort_by=-updated_at&embed=cards,-history,inversecards,creator&state' +
            '=Rejected').map(value => {
            return value.response.data;
        });
    }

    getUpdates(id): Observable<any> {
        return this.http.get<any>(base_url + 'custom/actions?action[1]=Approve&ac' +
            'tion[2]=Comment&action[3]=Reject&fk_card='
            + id)
            .map(value => {
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
            return value.msg;
        });
    }
}
