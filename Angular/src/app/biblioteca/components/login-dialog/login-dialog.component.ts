import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})

export class LoginDialogComponent{

    formLogin: FormGroup;
    fb: FormBuilder = new FormBuilder();

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
                private _loginService: LoginService,
                private router: Router) 
    {
        this.createForm();
    }

    createForm() {
        this.formLogin = this.fb.group({
            username: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    login(){
        if(this.formLogin.valid)
            this._loginService.getLoginByUsername(this.formLogin.value.username)
                .subscribe(response => {
                    if(response['username'] == this.formLogin.value.username) {
                        this.dialogRef.close();
                        this.router.navigate(['/home']);
                    }
                    this.clear();
                });
    }

    clear(){
        this.formLogin.reset();
    }
}