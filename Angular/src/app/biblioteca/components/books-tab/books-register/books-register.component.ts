import { Component, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { BooksEditService } from "src/app/biblioteca/services/books/books-edit.service";
import { BooksService } from "src/app/biblioteca/services/books/books.service";
import { Book } from "src/app/biblioteca/models/book.entity";
import { DateConvert } from "src/app/biblioteca/shared/date-convert";
import { PublishingCompany } from "src/app/biblioteca/models/publishing-company.entity";
import { PublishingCompanyService } from "src/app/biblioteca/services/publishing-company/publishing-company.service";

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

    editoras: PublishingCompany[];

    constructor(private adapter: DateAdapter<any>,
        private _booksEditService: BooksEditService,
        private _booksService: BooksService,
        private _publishService: PublishingCompanyService
    ) {
        this.adapter.setLocale('pt')
        this.createForm();
    }

    ngOnInit() {
        this._booksEditService.subject.subscribe(value => {
            this.modeEdit = true;
            this.formBook.setValue(value);
        });

        this._publishService.getPublishing().subscribe(response => {
            this.editoras = response;
        });
    }

    createForm() {
        this.formBook = this.fb.group({
            id: [0],
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            editora: ['', Validators.required],
            descricao: ['', Validators.required],
            datapublicacao: ['', Validators.required]
        });
    }


    save() {
        if (this.formBook.valid) {
            this.formBook.value.datapublicacao = DateConvert.convert(this.formBook.value.datapublicacao._i)

            if (this.formBook.value.id == 0 || this.formBook.value.id == null) {
                this._booksService.saveBook(<Book>this.formBook.value)
                    .subscribe(response => {
                        console.log(response);
                        this.onConfirm.emit();
                    });
            } else {
                this._booksService.updateBook(<Book>this.formBook.value)
                    .subscribe(response => {
                        console.log(response);
                        this.onConfirm.emit();
                        this.modeEdit = false;
                    });
            }
            this.formBook.reset();
        }
    }

    clear() {
        this.formBook.reset();
    }
}