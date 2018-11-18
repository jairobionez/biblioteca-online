import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { BooksEditService } from "src/app/biblioteca/services/books/books-edit.service";
import { BooksService } from "src/app/biblioteca/services/books/books.service";
import { Book } from "src/app/biblioteca/models/book.entity";
import { DateConvert } from "src/app/biblioteca/shared/date-convert";

@Component({
    selector: 'books-register',
    templateUrl: './books-register.component.html',
    styleUrls: ['./books-register.component.scss']
})

export class BooksRegisterComponent {
    // Event Emmiter
    @Output()
    onConfirm: EventEmitter<any> = new EventEmitter<any>();

    formBook: FormGroup;
    fb: FormBuilder = new FormBuilder();

    modeEdit: boolean = false;

    editoras: any = [
        { "id": 1, "nome": "Editora1" },
        { "id": 2, "nome": "Editora2" }
    ]

    locado: any = [
        { "id": 1, "nome": "SIM" },
        { "id": 2, "nome": "NÃO" }
    ]

    constructor(private adapter: DateAdapter<any>,
        private _booksEditService: BooksEditService,
        private _booksService: BooksService
    ) {
        this.adapter.setLocale('pt')
        this.createForm();
    }

    ngOnInit() {
        this._booksEditService.subject.subscribe(value => {
            this.modeEdit = true;
            this.formBook.setValue(value);
        });
    }

    createForm() {
        this.formBook = this.fb.group({
            id: [0],
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            editora: [0, Validators.required],
            descricao: ['', Validators.required],
            datapublicacao: ['', Validators.required]
        });
    }


    save() {
        this.formBook.value.datapublicacao = DateConvert.convert(this.formBook.value.datapublicacao._i)

        if(this.formBook.value.id == 0 || this.formBook.value.id == null){
            this._booksService.saveBook(<Book>this.formBook.value)
                .subscribe(response => {
                    console.log(response);
                    this.onConfirm.emit();
                });
        }else{
            this._booksService.updateBook(<Book>this.formBook.value)
                .subscribe(response => {
                    console.log(response);
                    this.onConfirm.emit();
                    this.modeEdit = false;
                });
        }
        this.formBook.reset();
    }

    clear() {
        this.formBook.reset();
    }
}