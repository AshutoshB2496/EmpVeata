import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const state: RouterState = this.router.routerState;
        const snapshot: RouterStateSnapshot = state.snapshot;
        request = request.clone({
            setHeaders: {
                Authorization: 'bearer ' + localStorage.getItem('my_login_token')
            }
        });
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 300) {
                    /*window.alert('you have been logged out');*/
                    if (err.error.msg === 'Token invalid') {
                        localStorage.clear();
                        console.log(this.route.snapshot.url);
                        this.router.navigate(['login'], {queryParams: {
                            nextTo: snapshot.url
                            }});
                    }
                }
            }
        });
    }
}
