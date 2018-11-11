import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class TaskService {

    constructor(private http: HttpClient) {
    }

    getTeamList(): Observable<any> {
        return this.http.get<any>(base_url + 'custom/myteamlist')
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

    getOpenTasks(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=Assigned&equalto___assignee=' + id).map(value => {
            return value.response.data;
        });
    }

    getMarkedTasks(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=MarkedDone&equalto___assignee=' + id).map(value => {
            return value.response.data;
        });
    }

    getCompletedTasks(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=Completed&equalto___assignee=' + id).map(value => {
            return value.response.data;
        });
    }

    getdueTodayTasks() {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&datelessthaneq' +
            'ualto___due_date=now&datelessthanequalto___due_date_format=Y-m-d&state=Assigned&equalto___assignee=' + id).map(value => {
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

    AddTask(data: any, day): Observable<any> {
        return this.http.post<any>(base_url + 'cards',
            {
                'entity': 'Tasks',
                'action': 'Create',
                'selftask': 1,
                'task': data.task,
                'type': data.label,
                'priority': data.priority,
                'due_date': day
            }
        ).map((value) => {
            return value.msg;
        });
    }

// Team's Task API========================================================================================================
    getOpenTeamsTasks(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=Assigned&equalto___selftask=0&creator=' + id).map(value => {
            return value.response.data;
        });
    }

    getMarkedTeamsTasks(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=MarkedDone&equalto___selftask=0&creator=' + id).map(value => {
            return value.response.data;
        });
    }

    getCompletedTeamsTasks(): Observable<any> {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=Completed&equalto___selftask=0&creator=' + id).map(value => {
            return value.response.data;
        });
    }

    getdueTodayTeamsTasks() {
        const id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,histor' +
            'y,inversecards,creator&datelessthaneq' + 'ualto___due_date=now&datelessthanequalto___due_date_format=Y-m-d&state=Assign' +
            'ed&equalto___selftask=0&creator=' + id).map(value => {
            return value.response.data;
        });
    }

    getOpenTasksFiltered(id): Observable<any> {
        const creater_id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=Assigned&equalto___assignee=' + id + '&equalto___selftask=0&creator=' + creater_id).map(value => {
            return value.response.data;
        });
    }

    getMarkedTasksFiltered(id): Observable<any> {
        const creater_id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=MarkedDone&equalto___assignee=' + id + '&equalto___selftask=0&creator=' + creater_id).map(value => {
            return value.response.data;
        });
    }

    getCompletedTasksFiltered(id): Observable<any> {
        const creater_id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&state' +
            '=Completed&equalto___assignee=' + id + '&equalto___selftask=0&creator=' + creater_id).map(value => {
            return value.response.data;
        });
    }

    getdueTodayTasksFiltered(id) {
        const creater_id = JSON.parse(localStorage.getItem('user')).id;
        return this.http.get<any>(base_url + 'cards/all?type=Tasks&sort_by=-updated_at&embed=cards,history,inversecards,creator&datelessthaneq' +
            'ualto___due_date=now&datelessthanequalto___due_date_format=Y-m-d&state=Assigned&equalto___assignee=' + id + '&equalto___selftask=0&creator=' + creater_id).map(value => {
            return value.response.data;
        });
    }

    AddTeamsTask(data: any, day): Observable<any> {
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
}
