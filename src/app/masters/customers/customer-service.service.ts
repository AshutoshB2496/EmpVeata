import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class CustomerService {
    base_url = 'http://sfa.demoplatform.simplifii.com/api/v1';
    private http: HttpClient;


    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }

    getCustomer(name: string, date: string) {
        // const t = 'bearer ' + this.token;
        // const header = new HttpHeaders().set('Authorization', t);
        // return this.http.get<any>(this.base_url + '/cards/all?type=Distributor', {
        //     headers: header,
        //     params: {
        //         Name: name,
        //         Date: date
        //     }
        // })
        //     .map((value) => {
        //         return value;
        //     });
    }

    getCustomers() {
        const t = 'Bearer ' + localStorage.getItem('my_login_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = this.base_url + '/cards/all?type=Client';
        return this.http.get<any>(url, header)
            .map(value => {
                return value.response.data;
            });
    }

    addCustomer(customer) {
        const t = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = this.base_url + '/cards';
        return this.http.post<any>(url, {
            'action': 'Create',
            'entity': 'Client',
            'spoc': customer.spoc,
            'name': customer.name,
            'address': customer.address,
            'mobile': customer.mobile.toString()
        }, header).map(value => {
            return value.response.data;
        });
    }

    editCustomer(customer) {
        const t = 'Bearer ' + localStorage.getItem('admin_token');
        const header = {
            headers: new HttpHeaders().set('Authorization', t),
            'Content-Type': 'application/json',
        }
        const url = this.base_url + '/cards';
        return this.http.patch<any>(url, {
            'action': 'Edit',
            'entity': 'Client',
            'spoc': customer.spoc,
            'name': customer.name,
            'address': customer.address,
            'mobile': customer.mobile.toString(),
            'card_unique_code': customer.customer_unique_code
        }, header).map(value => {
            return value.response.data;
        });
    }
}
