import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {MaterialModule} from '../../app.module';
import {LocationService} from './locationService.service';
import {FormsModule} from '@angular/forms';
import {Map2Component} from './map2.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [MapComponent, Map2Component],
    exports: [MapComponent, Map2Component],
    providers: [LocationService]
})
export class MapModule {
}