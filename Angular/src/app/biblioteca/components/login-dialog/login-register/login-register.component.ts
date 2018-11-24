import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { LoginService } from "src/app/biblioteca/services/login/login.service";
import { Login } from "src/app/biblioteca/models/login.entity";

@Component({
    selector: 'login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss']
})

export class LoginRegisterComponent{
    formLoginRegister: FormGroup;
    fb: FormBuilder = new FormBuilder();

    /**
     *
     */
    constructor(public loginRegisterDialogRef: MatDialogRef<LoginRegisterComponent>,
                private _loginService: LoginService) {
        this.createForm();
    }

    createForm(): void {
        this.formLoginRegister = this.fb.group({
            username: ['', Validators.required],
            nome: ['', Validators.required],
            sobrenome: ['', Validators.required],
            email: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    clear(): void{
        this.formLoginRegister.reset();
    }

    close(): void{
        this.clear();
        this.loginRegisterDialogRef.close();
    }

    save(): void{
        this._loginService.saveLogin(<Login>this.formLoginRegister.value)
            .subscribe(response => {
                console.log("Registrado com suceso");
                this.close();
            });
    }
}