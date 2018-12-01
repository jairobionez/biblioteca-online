import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from '../../enums/menu.enum';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Output()
    onLogout: EventEmitter<any> = new EventEmitter<any>();

    dialogLoginRef: MatDialogRef<LoginDialogComponent>;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        public dialog: MatDialog
    ) { }
    
    navigate(indice: number){
        switch(indice){
            case Menu.home:
                this.router.navigate(['/home']);
                break;
            case Menu.livros:
                this.router.navigate(['/books']);
                break;
            case Menu.alugar: 
                this.router.navigate(['/allocate']);           
                break;
            case Menu.sobre:
                this.router.navigate(['/about']);
                break;
            case Menu.editora:
                this.router.navigate(['/publishing']);
                break;
            case Menu.logout:
                this.router.navigate(['/login']);           
                this.onLogout.emit();
                break;
        }
    }
}
