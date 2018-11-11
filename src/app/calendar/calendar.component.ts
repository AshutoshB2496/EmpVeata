// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {CalendarService} from './calendar-service.service';
import {ActivatedRoute} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as moment from 'moment';
/*declare const swal: any;*/
declare const $: any;

@Component({
    selector: 'app-calendar-cmp',
    templateUrl: 'calendar.component.html'
})

export class CalendarComponent implements OnInit {

    empId: string;
    firstDay: string;
    lastDay: string;
    eventData = [];
    swalData = [];
    attendance = [];
    constructor(private service: CalendarService,
                private route: ActivatedRoute,
                private loaderService: Ng4LoadingSpinnerService) {}
    getDays(dateToday: Date) {
        this.firstDay = '' + dateToday.getFullYear() + '-' +
            (+dateToday.getMonth() + 1 < 10 ? '0' + (+dateToday.getMonth() + 1) : (+dateToday.getMonth() + 1)) + '-' +
            '01';
        this.lastDay = '' + dateToday.getFullYear() + '-' +
            (+dateToday.getMonth() + 1 < 10 ? '0' + (+dateToday.getMonth() + 1) : (+dateToday.getMonth() + 1)) + '-' +
            new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 0).getDate();
    }
    ngOnInit() {
        const dateToday = new Date();
        this.getDays(dateToday);
        console.log(this.firstDay, this.lastDay);
        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();

        this.loaderService.show();
        this.route.queryParams
            .subscribe(params => {
                this.loaderService.hide();
                this.attendance = [];
                if (params['id'] === undefined) {
                    this.empId = JSON.parse(localStorage.getItem('user')).id;
                } else {
                    this.empId = params['id'];
                }
                this.getAttendance(today)
            });
    }
    getAttendance(date: Date) {
        this.eventData = [];
        this.attendance = [];
        this.swalData = [];
        this.loaderService.show();
        this.service.getAttendance(this.empId, this.lastDay, this.firstDay)
            .subscribe(data => {
                this.loaderService.hide();
                this.attendance = data;
                console.log(this.attendance);
                for (let data of this.attendance) {
                    this.swalData.push((new Date(data.recorded_at_date)).toString());
                    var temp = {
                        title: data.attendance === 0 ? 'Late' : 'On-time',
                        start: new Date(data.recorded_at_date),
                        className: data.attendance === 0 ? 'event-red' : 'event-green'
                    };
                    this.eventData.push(temp);
                }
                this.createCalendar(date);
            });
    }
    createCalendar(today: Date) {
        const $calendar = $('#fullCalendar');
        const that = this;
        $calendar.fullCalendar({
            viewRender: function(view: any, element: any) {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name !== 'month') {
                    const $fc_scroller = $('.fc-scroller');
                    $fc_scroller.perfectScrollbar();
                }
                let curDate = $calendar.fullCalendar('getDate');
                curDate = curDate.toDate();
                that.getDays(curDate);
                that.getAttendance(curDate);
                $calendar.fullCalendar('removeEvents');
                $calendar.fullCalendar('addEventSource', that.eventData);
            },
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            defaultDate: today,
            editable: false,
            displayEventTime: false,
            selectable: true,
            selectHelper: true,
            views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                },
                week: {
                    titleFormat: ' MMMM D YYYY'
                },
                day: {
                    titleFormat: 'D MMM, YYYY'
                }
            },
            eventClick: function(eventObj) {
                var time = eventObj.start.toString();
                time = time + ' (India Standard Time)';
                console.log(time);
                console.log(that.swalData);
                const addr = that.attendance[that.swalData.indexOf(time)].dvfga_formatted_address;
                const t = that.attendance[that.swalData.indexOf(time)].recorded_at.substr(11);
                /*console.log(this.swalData.findIndex({new Date(eventObj.start)}));*/
                /*const addr = that.attendance[this.swalData.findIndex(time)].dvfga_formatted_address;*/
                swal({
                    title: 'Attendance Info',
                    html: '<div><b>Time: </b>' + t + '</div><div><b>Address: </b>' + addr + '</div>',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                })
            },
            eventLimit: true, // allow "more" link when too many events


            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            eventSources: [this.eventData],
            eventRender: function(event, element) {
                element.find('.fc-title').prepend('<b>');
                element.find('.fc-title').append('</b>');
            }
        });
        $calendar.fullCalendar('removeEvents');
        $calendar.fullCalendar('addEventSource', this.eventData);
    }
}
