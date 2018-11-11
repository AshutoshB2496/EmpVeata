import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class AttendanceService {
    constructor(private http: HttpClient) {
    }

    getTeamList(id): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Employee&show_columns=string1,int1,username&equalto___rm='
            + id)
            .map(value => {
                return value.response.data;
            });
    }
    getLocations(empId: string): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Location&embed=creator&sort_by=-datetime1&liesin___attendance=0,1&creator='
            + empId)
            .map(value => {
                return value.response.data;
            });
    }
    filterByDate (empId: string, date1: string, date2: string) {
        return this.http.get<any>(base_url + 'cards/all?type=Location&sort_by=-datetime1&lessthanequalto___recorded_at_date='
            + date1 + '&greaterthanequalto___recorded_at_date=' + date2 + '&liesin___attendance=0,1&creator='
            + empId)
            .map(value => {
                return value.response.data;
            });
    }
}
