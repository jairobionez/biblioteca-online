import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BibliotecaComponent } from "./biblioteca.component";
import { BooksVisualizationComponent } from "./components/books-visualization/books-visualization.component";
import { BooksTabComponent } from "./components/books-tab/books-tab.component";

const routes: Routes = [
    {
        path: '', component: BibliotecaComponent, children: [
            {
                path: 'registerbook', component: BooksTabComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BibliotecaRoutingModule {}