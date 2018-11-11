import {Component, OnInit, ViewChild} from '@angular/core';
import {TableData} from '../../md/md-table/md-table.component';
import {LocationService} from '../../shared/map/locationService.service';
import {EmployeeServices} from '../../shared/employee-services.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

declare interface List {
    'num': number,
    'addr': string,
    'from': string,
    'till': string,
    'duration': string,
}
@Component({
    selector: 'app-daywise-list',
    templateUrl: './daywise-list.component.html',
    styleUrls: ['./daywise-list.component.scss']
})
export class DaywiseListComponent implements OnInit {

    currentVisit: string[];
    planModel: any = {start_time: new Date() };
    markers: google.maps.Marker[] = [];
    public tableData1: TableData;
    visits = ['Customer Visits only', 'All Visits'];
    visitsFilter = 'All Visits';
    employeeId = '91451';
    employees: any;
    locations: any[];
    cords: List[] = [];
    iconNumber = 1;
    formattedDate = '';
    selectedDate: Date;
    @ViewChild('map') mapElement: any;
    @ViewChild('start_time') dateFilter: any;
    map: google.maps.Map;

    constructor(private locationService: LocationService,
                private empService: EmployeeServices,
                private route: ActivatedRoute,
                private loaderService: Ng4LoadingSpinnerService,
                private router: Router) {}
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
    toggleView() {
        this.router.navigate(['userslocation', 'daywise-map']);
    }
    ngOnInit() {
        this.tableData1 = {
            headerRow: ['#', 'From', 'Till', 'Duration', 'Address'],
            dataRows: []
        };
        this.route.params
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
                    this.planModel.start_time = new Date(this.formattedDate);
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
    // Converts numeric degrees to radians
    toRad(Value) {
        return Value * Math.PI / 180;
    }
    getLocs() {
        this.cords = [];
        this.markers = [];
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
                var temp: List = {
                    'num': 0,
                    'addr': '',
                    'from': '',
                    'till': '',
                    'duration': '',
                };
                var c1 = 0;
                var c2 = 0;
                var counter = 0;
                if (this.locations.length > i) {
                    console.log(i);
                    temp.num = 1;
                    temp.addr = this.locations[i].dvfga_formatted_address;
                    temp.from = this.locations[i].recorded_at_formatted;
                    temp.till = '';
                    this.cords.push(temp);
                    c1 = +this.locations[i].lat;
                    c2 = +this.locations[i].lng;
                }
                for (let j = i + 1; j < this.locations.length; j++) {
                    console.log(j);
                    var t1: List = {
                        'num': 0,
                        'addr': '',
                        'from': '',
                        'till': '',
                        'duration': '',
                    };
                    t1.addr = this.locations[j].dvfga_formatted_address;
                    t1.from = this.locations[j].recorded_at_formatted;
                    t1.till = this.locations[j].recorded_at_formatted;
                    console.log(this.calcCrow(c1, c2, +this.locations[j].lat, +this.locations[j].lng));
                    console.log(c1, c2, +this.locations[j].lat, +this.locations[j].lng);
                    if (this.calcCrow(c1, c2, +this.locations[j].lat, +this.locations[j].lng) > 50) {
                        this.cords[counter].till = this.locations[j - 1].recorded_at_formatted;
                        const d = new Date(this.cords[counter].from);
                        const d2 = new Date(this.cords[counter].till);
                        this.cords[counter].duration = '' + Math.round((d2.getTime() - d.getTime()) / 60000);
                        console.log(d2.getTime() - d.getTime());
                        if (this.cords[counter].till === this.cords[counter].from) {
                            this.cords[counter].till = '---';
                        }
                        /*console.log(c1, c2, +this.locations[j].lat, +this.locations[j].lng);*/
                        /*console.log(this.calcCrow(c1, c2, +this.locations[j].lat, +this.locations[j].lng));*/
                        t1.num = counter + 2;
                        this.cords.push(t1);
                        counter++;
                        c1 = +this.locations[j].lat;
                        c2 = +this.locations[j].lng;
                    }
                }
                /*console.log(this.cords);*/
                console.log('total coords ' + this.cords.length);
            });
    }

    /*makeMap() {
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
        /!*To keep the last marker info-window open*!/
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
    }*/
    /*drawPath() {
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
    }*/

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
}
