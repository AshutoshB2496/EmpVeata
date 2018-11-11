import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RateListRoutes} from './ratelist.routing';

@NgModule({
    imports: [
        RouterModule.forChild(RateListRoutes)
    ],
    declarations: []
})

export class RatelistModule {}
