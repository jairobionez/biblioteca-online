import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from '../../enums/menu.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router
    ) { }
    
    navigate(indice: number){
        switch(indice){
            case Menu.home:
                this.router.navigate(['/home'])
                break;
            case Menu.livros:
                this.router.navigate(['/books'])
                break;
            case Menu.alugar: 
                this.router.navigate(['/allocate'])               
                break;
        }
    }
}
