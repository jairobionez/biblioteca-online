import { Component, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { PublishingCompany } from "src/app/biblioteca/models/publishing-company.entity";
import { PublishingCompanyEditService } from "src/app/biblioteca/services/publishing-company/publishing-company-edit.service";
import { PublishingCompanyService } from "src/app/biblioteca/services/publishing-company/publishing-company.service";

@Component({
    selector: 'publishing-register',
    templateUrl: './publishing-company-register.component.html',
    styleUrls: ['./publishing-company-register.component.scss']
})

export class PublishingCompanyRegisterComponent {
     // Event Emmiter
     @Output()
     onConfirm: EventEmitter<any> = new EventEmitter<any>();
 
     formPublishing: FormGroup;
     fb: FormBuilder = new FormBuilder();
 
     modeEdit: boolean = false;
 
     constructor(private adapter: DateAdapter<any>,
         private _publishingEditService: PublishingCompanyEditService,
         private _publishingService: PublishingCompanyService
     ) {
         this.adapter.setLocale('pt')
         this.createForm();
     }
 
     ngOnInit() {
         this._publishingEditService.subject.subscribe(value => {
             this.modeEdit = true;
             this.formPublishing.setValue(value);
         });
     }
 
     createForm() {
         this.formPublishing = this.fb.group({
             id: [0],
             nome: ['', Validators.required],
             email: ['', Validators.required],
             telefone: ['', Validators.required],
         });
     }
 
 
     save() {
         if (this.formPublishing.valid) {
             if (this.formPublishing.value.id == 0 || this.formPublishing.value.id == null) {
                 this._publishingService.savePublishing(<PublishingCompany>this.formPublishing.value)
                     .subscribe(response => {
                         console.log(response);
                         this.onConfirm.emit();
                     });
             } else {
                 this._publishingService.updatePublishing(<PublishingCompany>this.formPublishing.value)
                     .subscribe(response => {
                         console.log(response);
                         this.onConfirm.emit();
                         this.modeEdit = false;
                     });
             }
             this.formPublishing.reset();
         }
     }
 
     clear() {
         this.formPublishing.reset();
     }
}