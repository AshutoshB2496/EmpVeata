import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()

export class CalendarService {

    constructor(private http: HttpClient) {}
    getAttendance(empId, date1, date2) {
        return this.http.get<any>(base_url + 'cards/all?type=Location&sort_by=-datetime1&lessthanequalto___recorded_at_date='
            + date1 + '&greaterthanequalto___recorded_at_date=' + date2 + '&liesin___attendance=0,1&creator='
            + empId)
            .map(value => {
                return value.response.data;
            });
    }
}