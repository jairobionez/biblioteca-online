import { Injectable } from "@angular/core";
import { FakeData } from "../models/fake-data.entity";
import { Observable, Subject, of } from "rxjs";

@Injectable()
export class BooksService{

    subject = new Subject<FakeData>();

    record: FakeData;

    constructor() {        
    }

    updateBook(data: FakeData){
        this.record = data;
        this.subject.next(this.record);
    }
}