import { Component, ViewChild, OnInit, AfterViewInit, SimpleChanges, ErrorHandler } from "@angular/core";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";
import { BooksEditService } from "src/app/biblioteca/services/books/books-edit.service";
import { BooksService } from "src/app/biblioteca/services/books/books.service";
import { Book } from "src/app/biblioteca/models/book.entity";

@Component({
    selector: 'books-visualization',
    templateUrl: './books-visualization.component.html',
    styleUrls: ['./books-visualization.component.scss']
})

export class BooksVisualizationComponent implements OnInit {

    displayedColumns: string[] = ['id', 'titulo', 'autor', 'datapublicacao', 'descricao', 'editora', 'actions'];
    dataSource = new MatTableDataSource<Book>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    selection = new SelectionModel<Book>(true, []);

    constructor(
        private _booksEditService: BooksEditService,
        private _booksService: BooksService
        ) {
    }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(){
        this._booksService.getBooks()
            .subscribe(response => {
                this.dataSource = new MatTableDataSource(response)
                this.setPaginator();
            });
    }

    setPaginator() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    edit(id: string): void {
        this._booksEditService.updateBook(this.dataSource.data.find(d => d.id == id));
    }

    delete(id: string): void {
        this._booksService.deleteBook(id)
            .subscribe(response => {
                console.log(response)
                this.refresh();
            });
    }

    refresh() {
        this.getBooks();
    }
}