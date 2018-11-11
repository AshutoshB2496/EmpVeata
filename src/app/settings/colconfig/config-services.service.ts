import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

const baseUrl = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()

export class ConfigServices {

    constructor(private http: HttpClient) {}

    getEntities() {
        const url = baseUrl + 'static/entities';
        return this.http.get<any>(url)
            .map(value => {
                return value.response.data;
            });
    }
    getColumns(entity: string) {
        const url = baseUrl + 'configurations/entity_columns?entity=' + entity;
        return this.http
            .get<any>(url)
            .map(value => {
                return value.response;
            });
    }
    addColumns(request) {
        const url = baseUrl + 'configurations/entity_columns';
        return this.http.post<any>(url, request)
            .map(value => {
                return value.response;
            });
    }
}
