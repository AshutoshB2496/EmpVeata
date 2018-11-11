import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableData} from '../../md/md-table/md-table.component';
import {EmployeeServices} from '../../shared/employee-services.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {DomSanitizer} from '@angular/platform-browser';
// import {DomSanitizer} from '@angular/platform-browser';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-hierarchy',
    templateUrl: './hierarchy.component.html',
    styleUrls: ['hierarchy.component.css']
})

export class HierarchyComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable;
    flag = false;
    name = '';
    showMap = false;
    employeeName = '';
    employeeId = '';
    public tableData1: TableData;
    employees: any[];
    token;

    constructor(private router: Router, private sanitizer: DomSanitizer,
                private route: ActivatedRoute,
                private employeesService: EmployeeServices,
                private loaderService: Ng4LoadingSpinnerService) {
    }

    getFrameUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('http://mapview.dashboard.simplifii.xyz/#/list-view?view=map&startFromAttendance=0&id='
            + this.employeeId + '&token=' + this.token + '&url=http://sfa.demoplatform.simplifii.com/api/v1/');
    }

    ngOnInit() {
        this.token = localStorage.getItem('my_login_token');
        this.employeesService.sendEmployeeName
            .subscribe(data => {
                this.employeeName = data;
            });
        this.loaderService.show();
        this.employeesService.getEmployees()
            .subscribe(data => {
                this.loaderService.hide();
                this.employees = data;
                console.log(this.employees);
                /*this.createTree(this.employees[0]);*/
                this.employees = this.employees[0].reportees;
                $(function () {
                    console.log('worked');
                    $('.tree li:has(ul.sub_ul)').addClass('parent_li')
                        .find(' > span').attr('title', 'Collapse this branch')
                        .find(' > i').addClass('fa fa-folder-open');
                    $('.tree li:not(ul.sub_ul)')
                        .find(' > span')
                        .find(' > i').addClass('fa fa-leaf');
                    var child = $('.tree li.parent_li')
                        .find(' > app-tree > ul > li');
                    child.hide();
                    $('.tree li.parent_li > span').on('click', function (e) {
                        var children = $(this).parent('li.parent_li').find(' > app-tree > ul > li');
                        if (children.is(':visible')) {
                            children.hide('fast');
                            $(this).attr('title', 'Expand this branch')
                                .find(' > i')
                                .addClass('fa-plus-square')
                                .removeClass('fa-minus-square');
                        } else {
                            children.show('fast');
                            $(this).attr('title', 'Collapse this branch')
                                .find(' > i')
                                .addClass('fa-minus-square')
                                .removeClass('fa-plus-square');
                        }
                        e.stopPropagation();
                    });
                });
                $(function () {
                    $('.tree .dropdown-menu a').click(function () {
                        $('#treeView').addClass('col-md-4');
                        $('a.collapseBtn').css('display', 'block');
                    });
                    $('a.collapseBtn').click(function () {
                        $('#treeView').removeClass('col-md-4');
                        $('#treeView').addClass('col-md-1');
                        $(this).hide();
                        $('#treeList').hide();
                        $('.badge').hide();
                        $('a.expBtn').css('display', 'block');
                    });

                    $('a.expBtn').click(function () {
                        $('#treeView').removeClass('col-md-1');
                        $('#treeView').addClass('col-md-4');
                        $(this).hide();
                        $('#treeList').show();
                        $('.badge').show();
                        $('a.collapseBtn').css('display', 'block');
                    });

                    $('#showEmp_detail').click(function () {
                        $('#emp_detail').css('display', 'block');
                        $('#locations').hide();
                    });
                });
            });
        this.loaderService.show();
        this.employeesService.rootTree
            .subscribe(data => {
                this.loaderService.hide();
                this.flag = true;
                this.employees = [{
                    'name': data.name,
                    'id': data.id,
                    'reportees': data.reportees
                }];
                $(function () {
                    console.log('worked');
                    $('.tree li:has(ul.sub_ul)').addClass('parent_li')
                        .find(' > span').attr('title', 'Collapse this branch')
                        .find(' > i').addClass('fa fa-folder-open');
                    $('.tree li:not(ul.sub_ul)')
                        .find(' > span')
                        .find(' > i').addClass('fa fa-leaf');
                    var child = $('.tree li.parent_li')
                        .find(' > app-tree > ul > li');
                    child.hide();
                    $('.tree li.parent_li > span').on('click', function (e) {
                        var children = $(this).parent('li.parent_li').find(' > app-tree > ul > li');
                        if (children.is(':visible')) {
                            children.hide('fast');
                            $(this).attr('title', 'Expand this branch')
                                .find(' > i')
                                .addClass('fa-plus-square')
                                .removeClass('fa-minus-square');
                        } else {
                            children.show('fast');
                            $(this).attr('title', 'Collapse this branch')
                                .find(' > i')
                                .addClass('fa-minus-square')
                                .removeClass('fa-plus-square');
                        }
                        e.stopPropagation();
                    });
                });
            });
        this.dataTable = {
            headerRow: ['Name', 'Email', 'Manager', 'Performance', 'View'],
            footerRow: ['Name', 'Email', 'Manager', 'Performance', 'View'],

            dataRows: [
                ['Anshul Garg', 'anshul@simplifii.com', 'Munish Bansal', '+20%', ''],
                ['Anshul Garg', 'anshul@simplifii.com', 'Munish Bansal', '+20%', ''],
                ['Anshul Garg', 'anshul@simplifii.com', 'Munish Bansal', '+20%', ''],
                ['Anshul Garg', 'anshul@simplifii.com', 'Munish Bansal', '+20%', ''],
                ['Anshul Garg', 'anshul@simplifii.com', 'Munish Bansal', '+20%', '']
            ]
        };

        this.tableData1 = {
            headerRow: ['Name', 'Country', 'City', 'Sale(₹)'],
            dataRows: [
                ['Dakota Rice', 'India', 'Delhi', '36,738'],
                ['Minerva Hooper', 'India', 'Gurgaon', '23,789'],
                ['Sage Rodriguez', 'India', 'Noida', '56,142'],
                ['Philip Chaney', 'India', 'Faridabad', '38,735'],
                ['Doris Greene', 'India', 'Jabalpur', '63,542'],
                ['Mason Porter', 'India', 'Ghaziabad', '78,615']
            ]
        }

        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',


            onInit: function (tab: any, navigation: any, index: any) {

                // check number of tabs and fill the entire row
                let $total = navigation.find('li').length;
                let $wizard = navigation.closest('.card-wizard');

                let $first_li = navigation.find('li:first-child a').html();
                let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);

                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
                $('.moving-tab').css('transition', 'transform 0s');
            },


            onTabShow: function (tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function () {
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if (index !== 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        $('.set-full-height').css('height', 'auto');

    }

    makeRoot(emp: any) {
        this.flag = true;
        this.employees = [{
            'name': emp.name,
            'id': emp.id,
            'reportees': emp.reportees
        }];
        $(function () {
            console.log('worked');
            $('.tree li:has(ul.sub_ul)').addClass('parent_li')
                .find(' > span').attr('title', 'Collapse this branch')
                .find(' > i').addClass('fa fa-folder-open');
            $('.tree li:not(ul.sub_ul)')
                .find(' > span')
                .find(' > i').addClass('fa fa-leaf');
            var child = $('.tree li.parent_li')
                .find(' > app-tree > ul > li');
            child.hide();
            $('.tree li.parent_li > span').on('click', function (e) {
                const children = $(this).parent('li.parent_li').find(' > app-tree > ul > li');
                if (children.is(':visible')) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch')
                        .find(' > i')
                        .addClass('fa-plus-square')
                        .removeClass('fa-minus-square');
                } else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch')
                        .find(' > i')
                        .addClass('fa-minus-square')
                        .removeClass('fa-plus-square');
                }
                e.stopPropagation();
            });
        });
    };

    showLocations(id: string, name: string) {
        this.employeeName = name;
        this.employeeId = id;
        this.showMap = true;
        console.log(id);
        this.router.navigate(['locations'], {
            relativeTo: this.route, queryParams: {
                id: id
            }
        });
    }

    showDetails(name: string) {
        this.employeeName = name;
        this.router.navigate(['details'], {relativeTo: this.route});
    }

    showAttendance(id: string, name: string) {
        this.employeeName = name;
        this.router.navigate(['attendance', id], {relativeTo: this.route});
    }

    showCalendar(id: string, name: string) {
        this.showMap = false;
        this.employeeName = name;
        this.router.navigate(['calendar'], {relativeTo: this.route, queryParams: {id: id}});
    }

    ngAfterViewInit() {
        // Initialize moving navigation
        $(window).resize(() => {
            $('.card-wizard').each(function () {

                const $wizard = $(this);
                const index = $wizard.bootstrapWizard('currentIndex');
                let $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
                });

                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });
    }

    reload() {
        $(function () {
            location.reload();
        });
        this.router.navigate(['team', 'hierarchy']);
    }
}
