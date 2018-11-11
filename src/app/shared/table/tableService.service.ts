import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class TableService {

    constructor(private http: HttpClient) {
    }

    getstock(): Observable<any[]> {
        const item_url = base_url + 'custom/stock?category=' + localStorage.getItem('category');
        return this.http.get<any>(item_url).map(value => {
            return value.response.data;
        });
    }

    getratelist(): Observable<any[]> {
        const item_url = base_url + 'custom/getratelist?category=' + localStorage.getItem('category');
        return this.http.get<any>(item_url).map(value => {
            return value.response.data;
        });
    }

    getRegions(): Observable<any[]> {
        const item_url = base_url + 'static/regions';
        return this.http.get<any>(item_url).map(value => {
            return value.response.data;
        });
    }

    getCategories(): Observable<any[]> {
        const plant_url = base_url + 'static/categorylist';
        return this.http.get<any>(plant_url).map(value => {
            return value.response.data;
        });
    }

    getunits(): Observable<any[]> {
        const item_url = base_url + 'cards/all?type=Unit&equalto___category=' + localStorage.getItem('category');
        return this.http.get<any>(item_url).map(value => {
            return value.response.data;
        });
    }

    getMolecule(): Observable<any[]> {
        const plant_url = base_url + 'cards/all?type=Molecule&show_columns=string1,string3&state=Created&equalto___category=' + localStorage.getItem('category');
        return this.http.get<any>(plant_url).map(value => {
            return value.response.data;
        });
    }

    deleteBulk(): Observable<any> {
        const orderurl = 'http://sfa.demoplatform.simplifii.com/api/v1/custom/wipeout_ratelist';
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(orderurl,
            {'overwrite': true}, {headers: headers}
        );
    }

    uploadRatelist(data): Observable<any> {
        const orderurl = 'http://sfa.demoplatform.simplifii.com/api/v1/cards/bulk?mode=synchronous';
        return this.http.post<any>(orderurl, data);
    }

    placeOrder(orders: any[], remark): Observable<any> {
        const orderurl = base_url + 'cards';
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(orderurl,
            {
                ordered_items: orders,
                primary_plant_id: localStorage.getItem('plant'),
                region: localStorage.getItem('region'),
                customer_name: localStorage.getItem('customer'),
                customer_sap_id: localStorage.getItem('customerid'),
                remarks: remark,
                entity: 'Order',
                action: 'Create'
            }, {headers: headers}
        );
    }
}