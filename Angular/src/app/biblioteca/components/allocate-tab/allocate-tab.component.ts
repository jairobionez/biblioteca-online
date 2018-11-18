import { Component, OnInit } from "@angular/core";
import { AllocateEditService } from "../../services/allocate-edit.service";

@Component({
    selector: 'allocate-tab',
    templateUrl: './allocate-tab.component.html',
    styleUrls: ['./allocate-tab.component.scss']
})

export class AllocateTabComponent implements OnInit { 
    newData: any;
    mytab: number;

    isActivate: boolean = false;

    constructor(private _allocateEditService: AllocateEditService) {
    }

    ngOnInit(): void {
        this._allocateEditService.subject.subscribe(value => {
            this.isActivate = true;
            this.mytab = 1;
        })
    }

    confirmEdit(event){
        this.isActivate = false; 
        this.mytab = 0;
    }
}