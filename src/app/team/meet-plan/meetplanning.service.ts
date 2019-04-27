import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class MeetplanningService {

    constructor(private http: HttpClient) {
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

    PatchActionSchedule(uniqueid: string, comment: string, action: string): Observable<any> {
        return this.http.patch<any>(base_url + 'cards',
            {
                card_unique_code: uniqueid,
                due_date: comment,
                action: action
            }
        ).map((value) => {
            return value.msg;
        });
    }

    PatchActionReminder(uniqueid: string, comment: string, action: string): Observable<any> {
        return this.http.patch<any>(base_url + 'cards',
            {
                card_unique_code: uniqueid,
                reminder_date: comment,
                action: action
            }
        ).map((value) => {
            return value.msg;
        });
    }

    getTeamList(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Employee&show_columns=string1,int1,username&equalto___rm='
            + id)
            .map(value => {
                return value.response.data;
            });
    }

    getUpdates(id): Observable<any> {
        return this.http.get<any>(base_url + 'custom/actions?action[1]=Schedule&ac' +
            'tion[2]=Comment&action[3]=MarkDone&action[4]=LogVisit&action[5]=Delete&action[6]=MarkComplete&action[7]=Reopen&fk_card='
            + id)
            .map(value => {
                return value.response.data;
            });
    }

    getLabels(): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Label&equalto___label_type=Task')
            .map(value => {
                return value.response.data;
            });
    }

// Team's Task API========================================================================================================
    getBeatPlan(date1, date2): Observable<any[]> {
        const myteam_url = base_url + 'custom/myteamtasks?embed=tasks&beatplan_date_from=' + date1 + '&beatplan_date_to=' + date2;
        return this.http.get<any>(myteam_url).map(value => {
            console.log(value.response.data);
            return value.response.data;
        });
    }

    getDistributers(): Observable<any[]> {
        const url = base_url + 'cards/all?type=Client';
        return this.http.get<any>(url)
            .map(value => {
                return value.response.data;
            });
    }

    AddTeamsTask(data: any, day, emp_id): Observable<any> {
        return this.http.post<any>(base_url + 'cards',
            {
                'entity': 'Tasks',
                'action': 'Create',
                'selftask': 0,
                'assignee': emp_id,
                'task': data.task,
                'type': data.label,
                'priority': data.priority,
                'due_date': day
            }
        ).map((value) => {
            return value.msg;
        });
    }

    AddTeamsTaskAll(data: any, day): Observable<any> {
        return this.http.post<any>(base_url + 'cards',
            {
                'entity': 'Tasks',
                'action': 'Create',
                'selftask': 0,
                'assignee': data.assignee,
                'task': data.task,
                'type': data.label,
                'priority': data.priority,
                'due_date': day
            }
        ).map((value) => {
            return value.msg;
        });
    }
    getPersonsTask(empid, date) {
        const myteam_url = base_url + 'cards/all?type=Tasks&embed=inversecards,creator,history&equalto___assignee=' +
            empid + '&equalto___due_date=' + date;
        return this.http.get<any>(myteam_url).map(value => {
            return value.response.data;
        });
    }
}
