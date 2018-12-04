import { Component } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";
import { LoginRegisterComponent } from "./login-register/login-register.component";

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})

export class LoginDialogComponent{

    formLogin: FormGroup;
    fb: FormBuilder = new FormBuilder();
    loginRegisterDialogRef: MatDialogRef<LoginRegisterComponent>;

    constructor(public loginDialogRef: MatDialogRef<LoginDialogComponent>,
                public dialog: MatDialog,
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
                    if(response['username'] == this.formLogin.value.username 
                        && response['senha'] == this.formLogin.value.senha) {
                        this.loginDialogRef.close();
                        this.router.navigate(['/home']);
                    }
                    this.clear();
                });
    }

    clear(){
        this.formLogin.reset();
    }

    openLoginRegisterDialog(){
        this.loginRegisterDialogRef = this.dialog.open(LoginRegisterComponent, {
            hasBackdrop: true,
            disableClose: true,
            height: '45vh',
            width: '30vw'
        });
    }
}