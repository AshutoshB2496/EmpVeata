import {Component, OnInit} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {Router} from '@angular/router';
import {AuthService} from '../auth-service.service';
import swal from 'sweetalert2';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [

//     {
//     path: '/dashboard',
//     title: 'Dashboard',
//     type: 'link',
//     icontype: 'dashboard'
// },
//
    {
        path: '/masters',
        title: 'Masters',
        type: 'sub',
        icontype: 'apps',
        collapse: 'masters',
        children: [
            {path: 'customers', title: 'Customers', ab: 'C'},
            {path: 'catalogue', title: 'Catalogue', ab: 'C'},
            {path: 'employees', title: 'Employees', ab: 'E'}
        ]
    }, {
        path: '/team',
        title: 'Team',
        type: 'sub',
        icontype: 'supervisor_account',
        collapse: 'team',
        children: [
            {path: 'teams-tasks', title: 'Tasks', ab: 'T'},
            {path: 'beatplanning', title: 'Beat Plan', ab: 'BP'},
            {path: 'jobplanning', title: 'Weekly Plan', ab: 'WP'},
            {path: 'hierarchy', title: 'My Team', ab: 'MT'}
        ]
    },
//     {
//     path: '/userslocation',
//     title: 'User Location',
//     type: 'sub',
//     icontype: 'settings',
//     collapse: 'User Location',
//     children: [
//         {path: 'daywise-map', title: 'Daywise Map', ab: 'D'}
//         ]
// },
    {
        path: '/sales',
        title: 'Other Info',
        type: 'sub',
        icontype: 'settings',
        collapse: 'Other Info',
        children: [
            {path: 'leads', title: 'Leads', ab: 'L'}
        ]
    },
//   {
//         path: '/sales',
//         title: 'Sales',
//         type: 'sub',
//         icontype: 'timeline',
//         collapse: 'sales',
//         children: [
//             {path: 'monthlytarget', title: 'Monthly Target', ab: 'MT'},
//             {path: 'orders', title: 'Orders', ab: 'O'},
//             {path: 'leads', title: 'Leads', ab: 'L'}
//         ]
//     }, {
//         path: '/performance',
//         title: 'Performance',
//         type: 'link',
//         icontype: 'av_timer'
//     }
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    name: string;
    loading: boolean;

    constructor(private router: Router, private authService: AuthService) {
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    openTasks() {
        this.router.navigate(['tasks', 'my-tasks']);
    }

    openBulk() {
        this.router.navigate(['bulkform']);
    }

    openProfile() {
        this.router.navigate(['myprofile']);
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.name = JSON.parse(localStorage.getItem('user')).name;
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
        }
    }

    logout() {
        this.loading = true;
        this.authService.logout().subscribe(value => {
            this.loading = false;
            localStorage.clear();
            this.router.navigate(['login']);
        }, error1 => {
            this.loading = false;
            this.router.navigate(['login']);
            localStorage.clear();
            swal({
                type: 'error',
                text: error1.error.msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'
            }).catch(swal.noop);
        });
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
