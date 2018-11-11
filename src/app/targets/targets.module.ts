import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TargetsRouting } from './targets.routing';
import { MonthlytargetComponent } from '../sales/monthlytarget/monthlytarget.component';
import { QuarterlytargetComponent } from '../sales/quarterlytarget/quarterlytarget.component';
import {MaterialModule} from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    TargetsRouting,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
  ],
  declarations: []
})
export class TargetsModule { }
