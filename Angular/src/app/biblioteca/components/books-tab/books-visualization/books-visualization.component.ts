import { Component, ViewChild, OnInit, AfterViewInit, SimpleChanges, ErrorHandler } from "@angular/core";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FakeData } from "src/app/biblioteca/models/fake-data.entity";
import { SelectionModel } from "@angular/cdk/collections";
import { BooksService } from "src/app/biblioteca/services/books.service";

@Component({
    selector: 'books-visualization',
    templateUrl: './books-visualization.component.html',
    styleUrls: ['./books-visualization.component.scss']
})

export class BooksVisualizationComponent implements OnInit {

    displayedColumns: string[] = ['id', 'titulo', 'autor', 'datapublicacao', 'descricao', 'editora', 'actions'];
    dataSource = new MatTableDataSource<FakeData>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    loadingfinish: boolean = false;
    selection = new SelectionModel<FakeData>(true, []);

    constructor(private _bookServe: BooksService) {
    }

    ngOnInit(): void {
        this.loadingfinish = false;
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(Data)
            this.setPaginator();
            this.loadingfinish = true;
        }, 1000);
    }

    setPaginator() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    edit(id: number): void {
        this._bookServe.updateBook(this.dataSource.data.find(d => d.id == id));
    }

    delete(id: number): void {
        const index = this.dataSource.data.findIndex(k => k.id == id);
        this.dataSource.data.splice(index, 1);
        this.refresh();
    }

    refresh() {
        this.dataSource = new MatTableDataSource(Data);
    }
}

const Data: FakeData[] = [
    { id: 1, titulo: 'Hydrogen', autor: 'teste1', datapublicacao: '05/04/2018', descricao: 'ual', editora: 2 },
    { id: 2, titulo: 'Helium', autor: 'teste2', datapublicacao: '05/05/2018', descricao: 'teste2', editora: 1 },
    { id: 3, titulo: 'Lithium', autor: 'teste3', datapublicacao: '05/06/2018', descricao: 'teste2', editora: 1 }
];