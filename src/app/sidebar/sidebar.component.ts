import {Component, OnInit} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {Router} from '@angular/router';

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
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
}, {
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
        {path: 'requests', title: 'Requests', ab: 'A'},
        {path: 'hierarchy', title: 'My Team', ab: 'MT'}
        ]
}, {
    path: '/userslocation',
    title: 'User Location',
    type: 'sub',
    icontype: 'settings',
    collapse: 'User Location',
    children: [
        {path: 'daywise-map', title: 'Daywise Map', ab: 'D'}
        ]
}, {
    path: '/settings',
    title: 'Settings',
    type: 'sub',
    icontype: 'settings',
    collapse: 'Settings',
    children: [
        {path: 'incentivewizard', title: 'Incentive Configuration', ab: 'IC'},
        {path: 'claimlimits', title: 'Claim Limits', ab: 'CL'}
    ]
},{
    path: '/sales',
    title: 'Sales',
    type: 'sub',
    icontype: 'timeline',
    collapse: 'sales',
    children: [
        {path: 'monthlytarget', title: 'Monthly Target', ab: 'MT'},
        {path: 'orders', title: 'Orders', ab: 'O'},
        {path: 'leads', title: 'Leads', ab: 'L'}
    ]
}, {
    path: '/performance',
    title: 'Performance',
    type: 'link',
    icontype: 'av_timer'
}
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    name: string;

    constructor(private router: Router) {
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

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
