import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
@Injectable()
export class CustomerService {
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjkxNDUxLCJpc3MiOiJodHRwOi8vc2ZhLmRlbW9wbGF0Zm9ybS5zaW1wbGlmaWkuY29tL2FwaS92MS9hZG1pbi9hdXRoZW50aWNhdGUiLCJpYXQiOjE1Mjc2MDIwNjksImV4cCI6MTU4ODA4MjA2OSwibmJmIjoxNTI3NjAyMDY5LCJqdGkiOiI4NWtnc0NZaVI2YTZhSUxYIn0.8hbpdaeTccrf4WKtgharJKeQVfWG6V2c7qrC-7ZziOQ';
    base_url = 'http://sfa.demoplatform.simplifii.com/api/v1';
    constructor(private http: HttpClient) {
    }

    getCustomers(name: string, date: string) {
        const t = 'bearer ' + this.token;
        const header = new HttpHeaders().set('Authorization', t);
        return this.http.get<any>(this.base_url + '/cards/all?type=Distributor', {
            headers: header,
            params: {
                Name: name,
                Date: date
            }
        })
            .map((value) => {
                return value;
            });
    }
    getInvoice(token: string, id: string) {
        const t = 'bearer ' + token;
        const header = new HttpHeaders().set('Authorization', t);
        return this.http.get<any>(this.base_url + '/cards/all?type=Invoice&equalto___customer_sap_id=' + id, {
            headers: header
        })
            .map((value: any) => {
                return value;
            });
    }
    getItems(token: string, id: string) {
        const t = 'bearer ' + token;
        const header = new HttpHeaders().set('Authorization', t);
        return this.http.get<any>(this.base_url + '/static/invoiceitems?mapped_to=' + id, {
            headers: header
        })
            .map((value: any) => {
                return value;
            });
    }

    submitRequest(token: string, req: any) {
        const t = 'bearer ' + token;
        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': t
            })
        };
        return this.http.post<any>(this.base_url + '/cards', req, options)
            .map((value: any) => {
                return value;
            });
    }
}
