import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BibliotecaComponent } from "./biblioteca.component";
import { BooksVisualizationComponent } from "./components/books-visualization/books-visualization.component";

const routes: Routes = [
    {
        path: '', component: BibliotecaComponent, children: [
            {
                path: 'visualization', component: BooksVisualizationComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BibliotecaRoutingModule {}