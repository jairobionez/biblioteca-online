import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllocateService } from "../../services/allocate.service";

@Component({
    selector: 'allocate-tab',
    templateUrl: './allocate-tab.component.html',
    styleUrls: ['./allocate-tab.component.scss']
})

export class AllocateTabComponent { 
    newData: any;
    mytab: number;

    isActivate: boolean = false;

    constructor(private _allocateService: AllocateService) {
        this._allocateService.subject.subscribe(value => {
            this.isActivate = true;
            this.mytab = 1;
        })
    }

    confirmEdit(event){
        this.isActivate = false; 
        this.mytab = 0;
    }
}