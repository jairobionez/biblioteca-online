import { AllocateTabComponent } from './components/allocate-tab/allocate-tab.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BibliotecaComponent } from "./biblioteca.component";
import { BooksTabComponent } from "./components/books-tab/books-tab.component";
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '', component: BibliotecaComponent, children: [
            {
                path: '', redirectTo: 'login'
            },
            {
                path: 'login', component: LoginComponent
            },
            {
                path: 'home', component: HomeComponent
            },
            { 
                path: 'books', component: BooksTabComponent,
            },
            {
                path: 'allocate', component: AllocateTabComponent
            }
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BibliotecaRoutingModule {}