import { Routes } from '@angular/router';
import {IncentiveWizardComponent} from './incentivewizard/incentivewizard.component';
import { ClaimlimitsComponent } from './claimlimits/claimlimits.component';
import { ColconfigComponent } from './colconfig/colconfig.component';

export const SettingsRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'incentivewizard',
            component: IncentiveWizardComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'claimlimits',
            component: ClaimlimitsComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'colconfig',
            component: ColconfigComponent
        }]
    }
];

export class SettingsModule {}