import { Injectable } from "@angular/core";
import { PublishingCompany } from "../../models/publishing-company.entity";
import { Subject } from "rxjs";

@Injectable()
export class PublishingCompanyEditService{
    subject = new Subject<PublishingCompany>();

    record: PublishingCompany;

    constructor() {        
    }

    updateBook(data: PublishingCompany){
        this.record = data;
        this.subject.next(this.record);
    }
}