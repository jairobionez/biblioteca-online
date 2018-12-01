import { Injectable } from "@angular/core";
import { Allocate } from "../../models/allocate.entity";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { base } from "../../endpoint/base.constants";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AllocateService{
    constructor(
        private http: HttpClient
    ) {}

    public getAllocate(): Observable<Allocate[]>{
        return this.http.get(base.url + '/allocate')
            .pipe(
                map((data: Allocate[]) => {
                    return data;
                }), catchError( error => {
                    return throwError('Erro ao buscar os livros');
                })
            );
    }

    public saveAllocate(allocate: Allocate):Observable<string>{
        return this.http.post(base.url + '/allocate/', allocate, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao inserir ao alocar o livro");
                })
            );
    }

    public updateAllocate(allocate: Allocate):Observable<string>{
        return this.http.put(base.url + '/allocate/', allocate, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao atualizar alocação");
                })
            );
    }

    public deleteAllocate(id: string):Observable<string>{
        return this.http.delete(base.url + '/allocate?id=' + id, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao deletar alocação");
                })
            );
    }
}