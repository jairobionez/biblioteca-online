import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { base } from "../../endpoint/base.constants";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Login } from "../../models/login.entity";

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {
        
    }

    public getLoginByUsername(username: string): Observable<Login>{
        return this.http.get(base.url + '/login/' + username)
            .pipe(
                map((login: Login) => {return login}),
                catchError((error) => {
                    return throwError("Usário não existe");
                })
            );
    }

    public getUsers(): Observable<Login[]>{
        return this.http.get(base.url + '/login/')
            .pipe(
                map((login: Login[]) => {return login}),
                catchError((error) => {
                    return throwError("Usário não existe");
                })
            );
    }

    public saveLogin(login: Login): Observable<string>{
        debugger;
        return this.http.post(base.url + '/login/', login, {responseType: 'text'})
            .pipe(
                map((response: string) => {return response}),
                catchError((error) => {
                    return throwError("Usário não existe");
                })
            );
    }
}