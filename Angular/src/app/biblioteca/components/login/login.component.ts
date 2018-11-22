import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent{

    formLogin: FormGroup;
    fb: FormBuilder = new FormBuilder();

    constructor(public dialogRef: MatDialogRef<LoginComponent>) 
    {
        this.createForm();
    }
    
    close(){
        this.dialogRef.close();
    }

    createForm() {
        this.formLogin = this.fb.group({
            username: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    clear(){
        this.formLogin.reset();
    }
}