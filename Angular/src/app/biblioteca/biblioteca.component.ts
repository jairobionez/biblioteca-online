import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LoaderService } from "./services/loader.service";
import { LoaderState } from "./interface/loader.interface";

@Component({
    selector: 'biblioteca',
    templateUrl: './biblioteca.component.html'
})

export class BibliotecaComponent implements  OnInit, OnDestroy {
    isLoading = false;

    private subscription: Subscription;

    constructor(private loaderService: LoaderService) {}

    ngOnInit(): void {
        this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderState) => {
            this.isLoading = state.show;
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}