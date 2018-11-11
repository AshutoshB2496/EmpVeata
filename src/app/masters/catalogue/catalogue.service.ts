import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class CatalogueService {

    constructor(private http: HttpClient) {
    }

    getCategory(category): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Molecule&sort_by=-updated_at&embed=cards,inversecards&equalto___category=' + category
        ).map(value => {
            return value.response.data;
        });
    }

    getUnits(category): Observable<any> {
        return this.http.get<any>(base_url + 'cards/all?type=Unit&equalto___category=' + category
        ).map(value => {
            return value.response.data;
        });
    }

    AddBasic(data: any): Observable<any> {
        return this.http.post<any>(base_url + 'cards',
            {
                'entity': 'Molecule',
                'action': 'Create',
                'molecule': data.molecule,
                'category': data.category,
                'image': data.image,
                'group': data.group
            }
        ).map((value) => {
            console.log(value.msg);
            return value.msg;
        });
    }

    AddPacking(data: any): Observable<any> {
        return this.http.post<any>(base_url + 'cards/bulk?data_array=packings&mode=synchronous',
            {
                'action': 'Create',
                'entity': 'Packing',
                'packings': data
            }
        ).map((value) => {
            console.log(value.msg);
            return value.msg;
        });
    }

    AddCollatoral(data: any): Observable<any> {
        return this.http.post<any>(base_url + 'cards',
            {
                'action': 'Create',
                'entity': 'Collateral',
                'group': data.group,
                'title': data.title,
                'description': data.description,
                'image': data.image
            }
        ).map((value) => {
            console.log(value.msg);
            return value.msg;
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
