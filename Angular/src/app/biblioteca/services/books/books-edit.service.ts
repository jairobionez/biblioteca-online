import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "../../models/book.entity";

@Injectable()
export class BooksEditService{

    subject = new Subject<Book>();

    record: Book;

    constructor() {        
    }

    updateBook(data: Book){
        this.record = data;
        this.subject.next(this.record);
    }
}