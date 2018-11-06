import { AllocateTabComponent } from './components/allocate-tab/allocate-tab.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BibliotecaComponent } from "./biblioteca.component";
import { BooksTabComponent } from "./components/books-tab/books-tab.component";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '', component: BibliotecaComponent, children: [
            {
                path: '', redirectTo: 'home', component: HomeComponent 
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