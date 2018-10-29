import { NgModule } from "@angular/core";
import { BibliotecaComponent } from "./biblioteca.component";
import { CommonModule } from "@angular/common";
import { BibliotecaRoutingModule } from "./biblioteca-routing.module";
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';


const COMPONENTS = [
    BibliotecaComponent
];

const SERVICES = [

];

@NgModule({
    declarations: [
        ...COMPONENTS,
        NavbarComponent
    ],
    exports: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        BibliotecaRoutingModule,
        MatButtonModule,
        MatMenuModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule
    ],
    providers: []
})

export class BibliotecaModule { }