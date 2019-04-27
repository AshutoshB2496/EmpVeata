import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

const LOGIN_TOKEN_KEY = 'my_login_token';
const base_url = 'http://sfa.demoplatform.simplifii.com/api/v1/';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient,
                private router: Router) {
    }

    login(username, password): Observable<any> {
        const Login_url = base_url + 'admin/authenticate';
        return this.http.post<any>(Login_url, {
            username: username,
            password: password
        }).map((value) => {
            return value;
        });
    }

    logout(): Observable<any> {
        const Login_url = base_url + 'logout';
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + localStorage.getItem('my_login_token'));
        return this.http.patch<any>(Login_url,
            {mobile: ''},
            {headers: headers}).map((value) => {
            return value.msg;
        });
    }

    // logout() {
    //     const Login_url = base_url + 'logout';
    //     const headers = new HttpHeaders().set('Authorization', 'bearer ' + localStorage.getItem('my_login_token'));
    //     return this.http.patch(Login_url,
    //         { mobile: '' },
    //         { headers: headers })
    //         .subscribe(val => {
    //                 localStorage.clear();
    //                 this.router.navigate(['login']);
    //                 console.log(val);
    //             },
    //             response => {
    //                 console.log('error: ', response);
    //             });
    // }
}

