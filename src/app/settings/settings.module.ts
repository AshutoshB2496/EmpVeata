import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { SettingsRoutes } from './settings.routing';
import {IncentiveWizardComponent} from './incentivewizard/incentivewizard.component';
import { ClaimlimitsComponent } from './claimlimits/claimlimits.component';
import { ColconfigComponent } from './colconfig/colconfig.component';
import {ConfigServices} from './colconfig/config-services.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
    providers: [ConfigServices],
  declarations: [
      IncentiveWizardComponent,
      ClaimlimitsComponent,
      ColconfigComponent
  ]
})

export class SettingsModule {}
