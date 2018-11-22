import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LoaderService } from "./services/loader.service";
import { LoaderState } from "./interface/loader.interface";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { LoginComponent } from "./components/login/login.component";
import { finalize, tap } from "rxjs/operators";

@Component({
    selector: 'biblioteca',
    templateUrl: './biblioteca.component.html'
})

export class BibliotecaComponent implements OnInit, OnDestroy {
    isLoading = false;
    disableApplication: boolean = true;

    private subscription: Subscription;

    loginDialog: MatDialogRef<LoginComponent>;

    constructor(
        private loaderService: LoaderService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.isLoading = state.show;
            })
        
        this.openLoginDialog();
    }

    openLoginDialog(){
        this.loginDialog = this.dialog.open(LoginComponent, {
            hasBackdrop: true,
            disableClose: true,
            height: '40%',
            width: '30%'
        });

        this.loginDialog.afterOpen()
        .subscribe(() => {
            this.disableApplication = this.dialog.openDialogs != null;
        })

        this.loginDialog.afterClosed()
        .pipe(
            finalize(() => this.loginDialog = undefined)
        ).subscribe(() => {
            this.disableApplication = false;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}