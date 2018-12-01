import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { base } from "../../endpoint/base.constants";
import { map, catchError } from "rxjs/operators";
import { PublishingCompany } from "../../models/publishing-company.entity";

@Injectable()
export class PublishingCompanyService{
    constructor(
        private http: HttpClient
    ) {}

    public getPublishing(): Observable<PublishingCompany[]>{
        return this.http.get(base.url + '/bookpublish')
            .pipe(
                map((data: PublishingCompany[]) => {
                    return data;
                }), catchError( error => {
                    return throwError('Erro ao buscar os editoras');
                })
            );
    }

    public savePublishing(publishing: PublishingCompany):Observable<string>{
        return this.http.post(base.url + '/bookpublish/', publishing, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao inserir editora");
                })
            );
    }

    public updatePublishing(publishing: PublishingCompany):Observable<string>{
        return this.http.put(base.url + '/bookpublish/', publishing, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao atualizar editora");
                })
            );
    }

    public deletePublishing(id: string):Observable<string>{
        return this.http.delete(base.url + '/bookpublish?id=' + id, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao deletar editora");
                })
            );
    }
}