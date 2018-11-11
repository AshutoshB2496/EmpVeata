import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {LocationService} from './locationService.service';
import {ActivatedRoute} from '@angular/router';
import {EmployeeServices} from '../employee-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import swal from 'sweetalert2';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}
declare interface TipData {
    recorded_at_formatted: string,
    dvfga_formatted_address: string
}
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {

    markers: google.maps.Marker[] = [];
    visits = ['Customer Visits only', 'All Visits'];
    visitsFilter = 'All Visits';
    employeeId = '91451';
    iconCounter = 0;
    employees: any;
    locations: any[];
    cords: string[][] = [];
    formattedDate = '';
    selectedDate: Date;
    @ViewChild('map') mapElement: any;
    @ViewChild('start_time') dateFilter: any;
    map: google.maps.Map;

    constructor(private locationService: LocationService,
                private empService: EmployeeServices,
                private route: ActivatedRoute,
                private loaderService: Ng4LoadingSpinnerService) {}
    mapInit() {
        if (this.cords.length > 0) {
            var lati = parseFloat(this.cords[this.cords.length - 1][0]);
            var lang = parseFloat(this.cords[this.cords.length - 1][1]);
            var mapProp = {
                center: { lat: lati, lng: lang },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
        } else {
            lati = 28.613185;
            lang = 77.229499;
            var mapPro = {
                center: { lat: lati, lng: lang },
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapPro);
        }
    }
    preday() {
        const d = new Date(this.formattedDate);
        d.setDate(d.getDate() - 1);
        this.selectedDate = d;
        this.formattedDate = '';
        this.formattedDate += this.selectedDate.getFullYear() + '-';
        this.formattedDate += (+this.selectedDate.getMonth() + 1 < 10 ? '0' : '') + (+this.selectedDate.getMonth() + 1) + '-';
        this.formattedDate += (this.selectedDate.getDate() < 10 ? '0' : '') + this.selectedDate.getDate();
        this.planModel.start_time = this.formattedDate;
        this.getLocs();
    }

    nextday() {
        const d = new Date(this.formattedDate);
        d.setDate(d.getDate() + 1);
        this.selectedDate = d;
        this.formattedDate = '';
        this.formattedDate += this.selectedDate.getFullYear() + '-';
        this.formattedDate += (+this.selectedDate.getMonth() + 1 < 10 ? '0' : '') + (+this.selectedDate.getMonth() + 1) + '-';
        this.formattedDate += (this.selectedDate.getDate() < 10 ? '0' : '') + this.selectedDate.getDate();
        this.planModel.start_time = this.formattedDate;
        this.getLocs();
    }
    showSwal(type) {
        if (type === 'success') {
            swal({
                type: 'success',
                title: 'Successfully Submitted!',
                text: 'The configurations of the incentive wizard have been set',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'

            }).catch(swal.noop);
        } else if (type === 'error') {
            swal({
                type: 'error',
                title: 'Oops',
                text: 'No Locations Found for this day',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'

            }).catch(swal.noop);
        }
    }
    addMarker (lati: number, lang: number, content: string, custVisit: string, num: number) {
        console.log('add marker: ' + num);
        if (custVisit) {
            console.log('customer visit present');
            var marker = new google.maps.Marker(
                {position: { lat: lati, lng: lang },
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    icon: '../../assets/img/cust_icon.png'
                });
        } else if (num === 0) {
            var marker = new google.maps.Marker(
                {position: { lat: lati, lng: lang },
                    map: this.map,
                    icon: '../../assets/img/attendance.png',
                    animation: google.maps.Animation.DROP
                });
            content = '<p><b>Attendance Marked</b></p>' + content;
        } else {
            var marker = new google.maps.Marker(
                {position: { lat: lati, lng: lang },
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    icon: '../../assets/img/markers/' + (num + 1) + '.png'
                });
        }
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        var that = this;
        marker.addListener('mouseover', function() {
            infoWindow.open(this.map, marker);
        });
        marker.addListener('mouseout', function() {
            infoWindow.close();
        });
        this.markers.push(marker);
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params['id'] === undefined) {
                    this.employeeId = JSON.parse(localStorage.getItem('user')).id;
                } else {
                    this.employeeId = params['id'];
                }
                if (params['date'] === undefined) {
                    this.formattedDate = '';
                    var today = new Date();
                    this.formattedDate += today.getFullYear() + '-';
                    this.formattedDate += (+today.getMonth() + 1 < 10 ? '0' : '') + (+today.getMonth() + 1) + '-';
                    this.formattedDate += (today.getDate() < 10 ? '0' : '') + today.getDate();
                } else {
                    this.formattedDate = params['date'];
                    this.planModel.start_time = new Date(this.formattedDate);
                }
                this.getLocs();
            });
        /*this.route.queryParams
            .subscribe(param => {
                this.formattedDate = '';
                if (param['date'] === undefined) {
                    var today = new Date();
                    this.formattedDate += today.getFullYear() + '-';
                    this.formattedDate += (+today.getMonth() + 1 < 10 ? '0' : '') + (+today.getMonth() + 1) + '-';
                    this.formattedDate += (today.getDate() < 10 ? '0' : '') + today.getDate();
                } else {
                    this.formattedDate = param['date'];
                    this.planModel.start_time = new Date(this.formattedDate);
                }
                this.getLocs();
            });*/
    }
    applyStatusFilter() {
        this.iconCounter = 0;
        this.markers = [];
        /*console.log(this.visitsFilter);*/
        if (this.visitsFilter === 'Customer Visits only') {
            lati = 28.613185;
            lang = 77.229499;
            var mapPro = {
                center: { lat: lati, lng: lang },
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapPro);
            for (let i = 0; i < this.locations.length - 1; i++) {
                var lati = parseFloat(this.cords[i][0]);
                var lang = parseFloat(this.cords[i][1]);
                var contentString = '<p>Time: ' + this.locations[i].recorded_at_formatted
                    + '</p><p>Address: ' + this.locations[i].dvfga_formatted_address + '</p>';
                if (this.locations[i].customer_visit) {
                    contentString = '<p>Time: ' + this.locations[i].recorded_at_formatted +
                        '</p><p>Address: ' + this.locations[i].dvfga_formatted_address + '</p>' +
                        '<p>Customer name: ' + this.locations[i].cdata.customer_name + '</p>'
                }
                if (this.locations[i].customer_visit) {
                    this.addMarker(lati, lang, contentString, this.locations[i].customer_visit, i);
                }
            }
            /*var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < this.markers.length; i++) {
                bounds.extend(this.markers[i].getPosition());
            }
            this.map.fitBounds(bounds);*/
        } else {
            this.makeMap();
        }
    }
    calcCrow(lt1: number, lon1: number, lt2: number, lon2: number) {
        const R = 6371; // km
        let dLat = this.toRad(lt2 - lt1);
        let dLon = this.toRad(lon2 - lon1);
        let lat1 = this.toRad(lt1);
        let lat2 = this.toRad(lt2);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c * 1000;
        return d;
    }

    // Converts numeric degrees to radians
    toRad(Value) {
        return Value * Math.PI / 180;
    }
    getLocs() {
        this.cords = [];
        this.markers = [];
        this.iconCounter = 0;
        this.loaderService.show();
        this.locationService.getLocations(this.employeeId, this.formattedDate)
            .subscribe(response => {
                this.loaderService.hide();
                this.locations = response.data;
                console.log(this.locations);
                let flag = false;
                var i;
                for (i = 0; i < this.locations.length; i++) {
                    const location = this.locations[i];
                    if (location.attendance === 0 || location.attendance === 1) {
                        flag = true;
                        break;
                    }
                }
                var temp: string[] = [];
                var c1 = 0;
                var c2 = 0;
                if (this.locations.length > i) {
                    console.log(i);
                    temp.push(this.locations[i].lat);
                    temp.push(this.locations[i].lng);
                    temp.push(i);
                    this.cords.push(temp);
                    c1 = +this.locations[i].lat;
                    c2 = +this.locations[i].lng;
                }
                for (let j = i + 1; j < this.locations.length; j++) {
                    console.log(j);
                    var t1: string[] = [];
                    t1.push(this.locations[j].lat);
                    t1.push(this.locations[j].lng);
                    t1.push(j);
                    console.log(this.calcCrow(c1, c2, +this.locations[j].lat, +this.locations[j].lng));
                    console.log(c1, c2, +this.locations[j].lat, +this.locations[j].lng);
                    if (this.calcCrow(c1, c2, +this.locations[j].lat, +this.locations[j].lng) > 50) {
                        /*console.log(c1, c2, +this.locations[j].lat, +this.locations[j].lng);*/
                        /*console.log(this.calcCrow(c1, c2, +this.locations[j].lat, +this.locations[j].lng));*/
                        this.cords.push(t1);
                        c1 = +this.locations[j].lat;
                        c2 = +this.locations[j].lng;
                    }
                }
                /*console.log(this.cords);*/
                console.log('total coords ' + this.cords.length);
                if (this.cords.length > 0) {
                    this.makeMap();
                } else {
                    this.mapInit();
                    this.showSwal('error');
                    /*console.log('No Location found');*/
                }
            });
    }

    makeMap() {
        this.mapInit();
        let count = 0;
        for (let i = 0; i < this.cords.length - 1; i++) {
            var lati = parseFloat(this.cords[i][0]);
            var lang = parseFloat(this.cords[i][1]);
            var contentString = '<p>Time: ' + this.locations[this.cords[i][2]].recorded_at_formatted
                + '</p><p>Address: ' + this.locations[this.cords[i][2]].dvfga_formatted_address + '</p>';
            if (this.locations[this.cords[i][2]].cdata.customer_visit) {
                console.log(this.locations[this.cords[i][2]].cdata.customer_name);
                contentString = '<p>Time: ' + this.locations[this.cords[i][2]].recorded_at_formatted +
                    '</p><p>Address: ' + this.locations[this.cords[i][2]].dvfga_formatted_address + '</p>' +
                    '<p>Customer name: ' + this.locations[this.cords[i][2]].customer_name + '</p>'
            }
            this.addMarker(lati, lang, contentString, this.locations[this.cords[i][2]].customer_visit, i);
            count = i;
        }
        /*To keep the last marker info-window open*/
        if (this.cords.length > 0) {
            var lati = parseFloat(this.cords[this.cords.length - 1][0]);
            var lang = parseFloat(this.cords[this.cords.length - 1][1]);
            var contentString = '<p>Time: ' + this.locations[this.cords[count][2]].recorded_at_formatted
                + '</p><p>Address: ' + this.locations[this.cords[count][2]].dvfga_formatted_address + '</p>';
            if (this.locations[this.cords[count][2]].cdata.customer_visit) {
                console.log(this.locations[this.cords[count][2]].cdata.customer_name);
                contentString = '<p>Time: ' + this.locations[this.cords[count][2]].recorded_at_formatted +
                    '</p><p>Address: ' + this.locations[this.cords[count][2]].dvfga_formatted_address + '</p>' +
                    '<p>Customer name: ' + this.locations[this.cords[count][2]].customer_name + '</p>'
            }
            var marker = new google.maps.Marker(
                {
                    position: { lat: lati, lng: lang },
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    icon: '../../assets/img/markers/' + (count + 2) + '.png'
                });
            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            infoWindow.open(this.map, marker);
            setTimeout(function () {
                infoWindow.close();
            }, 5000);
            this.markers.push(marker);
            marker.addListener('mouseover', function () {
                infoWindow.open(this.map, marker);
            });
            marker.addListener('mouseout', function () {
                infoWindow.close();
            });

            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < this.markers.length; i++) {
                bounds.extend(this.markers[i].getPosition());
            }
            this.map.fitBounds(bounds);
        }
        this.drawPath();
    }
    drawPath() {
        const allCoordinates = [];
        const polylines = [];
        for (let i = 0; i < this.cords.length; i++) {
            allCoordinates.push(new google.maps.LatLng(+this.cords[i][0], +this.cords[i][1]));
        }
        for (let i = 0, n = allCoordinates.length; i < n; i++) {

            const coordinates = new Array();
            for (let j = i; j < i + 2 && j < n; j++) {
                coordinates[j - i] = allCoordinates[j];
            }
            var polyline = new google.maps.Polyline({
                path: coordinates,
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                geodesic: true,
                icons: [{
                    icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
                    offset: '100%',
                    repeat: '100px'
                }]
            });
            polyline.setMap(this.map);
            polylines.push(polyline);
        }
    }
    ngAfterViewInit() {
        this.empService.sendEmployeeName
            .subscribe(name => {
                console.log(name);
            });
    }

    dateSelected() {
        this.visitsFilter = 'All Visits';
        this.formattedDate = '';
        this.selectedDate = this.dateFilter.value;
        this.formattedDate += this.selectedDate.getFullYear() + '-';
        this.formattedDate += (+this.selectedDate.getMonth() + 1 < 10 ? '0' : '') + (+this.selectedDate.getMonth() + 1) + '-';
        this.formattedDate += (this.selectedDate.getDate() < 10 ? '0' : '') + this.selectedDate.getDate();
        this.getLocs();
        /*console.log('Selected Date: ' + this.formattedDate);*/
    }
    currentPerson: string[];
    persons = [
        {value: 'personid-0', viewValue: 'Anshul Garg'},
        {value: 'personid-1', viewValue: 'Yogesh Chaudhary'},
        {value: 'personid-2', viewValue: 'Vipul Deora'},
        {value: 'personid-3', viewValue: 'Chandresh Kumar'},
        {value: 'personid-4', viewValue: 'Dhananjay Kumar'}
    ];

    currentVisit: string[];
    planModel: any = {start_time: new Date() };
}
