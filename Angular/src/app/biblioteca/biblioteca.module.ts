import { NgModule } from "@angular/core";
import { BibliotecaComponent } from "./biblioteca.component";
import { CommonModule } from "@angular/common";
import { BibliotecaRoutingModule } from "./biblioteca-routing.module";
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,
         MatSidenavModule,
         MatIconModule,
         MatListModule,
         MatGridListModule,
         MatSelectModule,
         MatChipsModule,
         MatDatepickerModule,
         MAT_DATE_LOCALE,
         DateAdapter,
         MAT_DATE_FORMATS,
         MatDividerModule,
         } from '@angular/material';
import { BooksVisualizationComponent } from "./components/books-visualization/books-visualization.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { BooksTabComponent } from "./components/books-tab/books-tab.component";
import { BooksRegisterComponent } from "./components/books-tab/books-register/books-register.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    BibliotecaComponent,
    BooksVisualizationComponent,
    BooksTabComponent,
    BooksRegisterComponent
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
        MatListModule,
        MatTabsModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatSelectModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule
    ],
    providers: [
        // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    ]
})

export class BibliotecaModule { }