import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { AllocateEditService } from "src/app/biblioteca/services/allocate/allocate-edit.service";
import { DateConvert } from "src/app/biblioteca/shared/date-convert";
import { AllocateService } from "src/app/biblioteca/services/allocate/allocate.service";
import { Allocate } from "src/app/biblioteca/models/allocate.entity";
import { Book } from "src/app/biblioteca/models/book.entity";
import { BooksService } from "src/app/biblioteca/services/books/books.service";
import { Login } from "src/app/biblioteca/models/login.entity";
import { LoginService } from "src/app/biblioteca/services/login/login.service";

@Component({
    selector: 'allocate-register',
    templateUrl: './allocate-register.component.html',
    styleUrls: ['./allocate-register.component.scss']
})

export class AllocateRegisterComponent{
        // Event Emmiter
        @Output()
        onConfirm: EventEmitter<any> = new EventEmitter<any>();
    
        formAllocate: FormGroup;
        fb: FormBuilder = new FormBuilder();
    
        modeEdit: boolean = false;
        books: Book[];
        users: Login[];
    
        constructor(private adapter: DateAdapter<any>,
            private _allocateEditService: AllocateEditService,
            private _allocateService: AllocateService,
            private _bookService: BooksService,
            private _loginService: LoginService
        ) {
            this.adapter.setLocale('pt')
            this.createForm();
        }
    
        ngOnInit() {
            this._allocateEditService.subject.subscribe(value => {
                this.modeEdit = true;
                this.formAllocate.setValue(value);
            });

            this._bookService.getBooks()
            .subscribe(response => {
                this.books = response;
            });

            this._loginService.getUsers().subscribe(response => {
                    this.users = response;
                });
        }
    
        createForm() {
            this.formAllocate = this.fb.group({
                id: [0],
                usuario: ['', Validators.required],
                livro: ['', Validators.required],
                data_locacao: ['', Validators.required],
                data_devolucao: ['', Validators.required]
            });
        }
    
    
        save() {
            if (this.formAllocate.valid) {
                this.formAllocate.value.data_locacao = DateConvert.convert(this.formAllocate.value.data_locacao._i)
                this.formAllocate.value.data_devolucao = DateConvert.convert(this.formAllocate.value.data_devolucao._i)


                if (this.formAllocate.value.id == 0 || this.formAllocate.value.id == null) {
                    this._allocateService.saveAllocate(<Allocate>this.formAllocate.value)
                        .subscribe(response => {
                            console.log(response);
                            this.onConfirm.emit();
                        });
                } else {
                    this._allocateService.updateAllocate(<Allocate>this.formAllocate.value)
                        .subscribe(response => {
                            console.log(response);
                            this.onConfirm.emit();
                            this.modeEdit = false;
                        });
                }
                this.formAllocate.reset();
            }
        }
    
        clear() {
            this.formAllocate.reset();
        }
}