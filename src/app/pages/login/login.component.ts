import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth-service.service';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    styles: [`
    .login-loader{
        display: inline-block;
    }`]
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    returnUrl: string;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    login: FormGroup;
    loading = false;
    error = false;

    constructor(private element: ElementRef,
        private fb: FormBuilder,
        private router: Router,
        private service: AuthService,
        private route: ActivatedRoute) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    Login() {
        this.error = false;
        this.loading = true;
        this.service.login(this.login.get('username').value, this.login.get('password').value)
            .subscribe(
                (user) => {
                    this.loading = false;
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(user);
                    console.log(this.returnUrl);
                    this.router.navigateByUrl(this.returnUrl);
                },
                (error) => {
                    this.loading = false;
                    this.error = true;
                    console.log(error);
                }
            );
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.route.queryParams
            .subscribe(params => {
                this.returnUrl = params['nextTo'] || '/';
            });
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
        this.login = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }
}
