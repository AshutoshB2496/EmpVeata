import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {myProfileRoutes} from './myProfile.routing';
import {MyProfileService} from './myProfile.service';
import {MyProfileComponent} from './myProfile.component';

@NgModule({
    imports: [
        RouterModule.forChild(myProfileRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ], providers: [MyProfileService],
    declarations: [MyProfileComponent]
})

export class MyProfileModule {
}
