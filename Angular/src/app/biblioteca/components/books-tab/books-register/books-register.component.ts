import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'books-register',
    templateUrl: './books-register.component.html',
    styleUrls: ['./books-register.component.scss']
})

export class BooksRegisterComponent {
    formBook: FormGroup;
    fb: FormBuilder = new FormBuilder();

    editoras: any = [
        {"id": 1, "nome": "Editora1"},
        {"id": 2, "nome": "Editora2"}
    ]

    locado: any = [
        {"id": 1, "nome": "SIM"},
        {"id": 2, "nome": "NÃO"}
    ]

    constructor() {
        this.createForm();
    }

    createForm(){
        this.formBook = this.fb.group({
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            editora: [0, Validators.required],
            descricao: ['', Validators.required],
            anopublicacao:['', Validators.required]
        });
    }


    save(){
        console.log(this.formBook);
    }

    clear(){
        this.formBook.reset();
    }
}