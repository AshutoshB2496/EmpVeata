import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://tms.demoplatform.simplifii.xyz/api/v1/';

@Injectable()
export class DaywiseplanningService {

    constructor(private http: HttpClient) {
    }

    getJobPlan(date1, date2): Observable<any[]> {
        const myteam_url = base_url + 'custom/myteamjobs?embed=FieldJob&beatplan_date_from=' + date1 + '&beatplan_date_to=' + date2;
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    getTeamJobs(date, page): Observable<any> {
        const myteam_url = base_url + 'custom/myteam_schedule?date=' + date + '&items_per_page=4&page=' + page;
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response);
            return value.response;
        });
    }

    getJobs(date): Observable<any[]> {
        const myteam_url = base_url + 'cards/all?type=FieldJob&state=Unassigned&greaterthanequa' +
            'lto___start_time_value=900&lessthanequalto___end_time_value=1800&date=' + date;
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    getAssignedJobs(empid, date): Observable<any[]> {
        const myteam_url = base_url + 'static/assignedjobs';
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    getJobsOfFreeSlot(date, time1, time2): Observable<any[]> {
        const myteam_url = base_url + 'cards/all?type=FieldJob&state=Unassigned&greaterthanequa' +
            'lto___start_time_value=' + time1 + '&lessthanequalto___end_time_value=' + time2 + '&date=' + date;
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    getJobsStatic(date, time1, time2): Observable<any[]> {
        const myteam_url = base_url + 'static/daywise'
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    assignJobMany(uniqueids: any[], empid): Observable<any> {
        return this.http.patch<any>(base_url + 'cards',
            {
                card_unique_code: uniqueids,
                assignee: empid,
                action: 'Assign'
            }
        ).map((value) => {
            return value.msg;
        });
    }
}
