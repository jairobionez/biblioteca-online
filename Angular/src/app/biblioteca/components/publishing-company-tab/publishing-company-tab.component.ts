import { Component } from "@angular/core";
import { PublishingCompanyEditService } from "../../services/publishing-company/publishing-company-edit.service";

@Component({
    selector: 'publishing-company-tab',
    templateUrl: './publishing-company-tab.component.html',
    styleUrls: ['./publishing-company-tab.component.scss']
})

export class PublishingCompanyTabComponent{
    newData: any;
    mytab: number;

    isActivate: boolean = false;

    constructor(private _publishingCompanyEditService: PublishingCompanyEditService) {
        this._publishingCompanyEditService.subject.subscribe(value => {
            this.isActivate = true;
            this.mytab = 1;
        })
    }

    confirmEdit(event){
        this.isActivate = false; 
        this.mytab = 0;
    }
}