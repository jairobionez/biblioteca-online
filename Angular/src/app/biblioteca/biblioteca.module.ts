import { NgModule } from "@angular/core";
import { BibliotecaComponent } from "./biblioteca.component";
import { CommonModule } from "@angular/common";
import { BibliotecaRoutingModule } from "./biblioteca-routing.module";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
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
         MatTableModule,
         MatPaginatorModule,
         MatProgressSpinnerModule,
         MatCheckboxModule,
         MatDialogModule,
         MAT_DIALOG_DEFAULT_OPTIONS,
         MatButtonToggleModule,
         MatCardModule,
         } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { BooksTabComponent } from "./components/books-tab/books-tab.component";
import { BooksRegisterComponent } from "./components/books-tab/books-register/books-register.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { BooksVisualizationComponent } from "./components/books-tab/books-visualization/books-visualization.component";
import { AllocateTabComponent } from './components/allocate-tab/allocate-tab.component';
import { AllocateVisualizationComponent } from './components/allocate-tab/allocate-visualization/allocate-visualization.component';
import { LoaderInterceptorService } from './services/loader-intercept.service';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BooksEditService } from './services/books/books-edit.service';
import { BooksService } from './services/books/books.service';
import { LoginService } from './services/login/login.service';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from "./pages/home/home.component";
import { LoginRegisterComponent } from "./components/login-dialog/login-register/login-register.component";
import { SobreComponent } from "./pages/sobre/sobre.component";
import { AllocateService } from "./services/allocate/allocate.service";
import { AllocateEditService } from "./services/allocate/allocate-edit.service";
import { AllocateRegisterComponent } from "./components/allocate-tab/allocate-register/allocate-register.component";
import { PublishingCompanyTabComponent } from "./components/publishing-company-tab/publishing-company-tab.component";
import { PublishingCompanyEditService } from "./services/publishing-company/publishing-company-edit.service";
import { PublishingCompanyService } from "./services/publishing-company/publishing-company.service";
import { PublishingCompanyRegisterComponent } from "./components/publishing-company-tab/publishing-company-register/publishing-company-register.component";
import { PublishingCompanyVisualizationComponent } from "./components/publishing-company-tab/publishing-company-visualization/publishing-company-visualization.component";

const COMPONENTS = [
    BibliotecaComponent,
    BooksVisualizationComponent,
    BooksTabComponent,
    BooksRegisterComponent,
    HomeComponent,
    AllocateTabComponent,
    AllocateVisualizationComponent,
    LoginDialogComponent,
    LoginComponent,
    LoginRegisterComponent,
    SobreComponent,
    AllocateRegisterComponent,
    PublishingCompanyTabComponent,
    PublishingCompanyRegisterComponent,
    PublishingCompanyVisualizationComponent
];

const SERVICES = [
    PublishingCompanyService,
    PublishingCompanyEditService,
    BooksService,
    BooksEditService,
    AllocateEditService,
    AllocateService,
    LoaderService,
    LoaderInterceptorService,
    LoginService
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
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatCardModule
    ],
    providers: [
        ...SERVICES,
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true},
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    entryComponents: [LoginDialogComponent, LoginRegisterComponent]
})

export class BibliotecaModule { }