import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { BooksService } from "src/app/biblioteca/services/books.service";

@Component({
    selector: 'books-register',
    templateUrl: './books-register.component.html',
    styleUrls: ['./books-register.component.scss']
})

export class BooksRegisterComponent {
    // Event Emmiter

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
        private _bookServce: BooksService
    ) {
        this.adapter.setLocale('pt')
        this.createForm();
    }

    ngOnInit() {
        this._bookServce.subject.subscribe(value => {
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
        if(this.formBook.value.id == 0){
            // save
        }else{
            this.edit();
        }
        this.formBook.reset();
    }

    edit(){
        this.modeEdit = false;
    }

    clear() {
        this.formBook.reset();
    }
}