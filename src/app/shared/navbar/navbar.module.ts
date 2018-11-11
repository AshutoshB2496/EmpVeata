import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar.component';
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
    imports: [RouterModule, CommonModule, MatButtonModule, MatProgressSpinnerModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})

export class NavbarModule {
}
