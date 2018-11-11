import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AllocateService{
    subject = new Subject<any>();

    record: any;

    public updateAllocateBooks(data: any){
        this.record = data;
        this.subject.next(this.record);
    }
}