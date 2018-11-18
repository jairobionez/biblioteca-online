import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { base } from "../../endpoint/base.constants";
import { Book } from "../../models/book.entity";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class BooksService{
    constructor(
        private http: HttpClient
    ) {}

    public getBooks(): Observable<Book[]>{
        return this.http.get(base.url + '/books')
            .pipe(
                map((data: Book[]) => {
                    return data;
                }), catchError( error => {
                    return throwError('Erro ao buscar os livros');
                })
            );
    }

    public saveBook(book: Book):Observable<string>{
        return this.http.post(base.url + '/books/', book, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao inserir o livro");
                })
            );
    }

    public updateBook(book: Book):Observable<string>{
        return this.http.put(base.url + '/books/', book, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao atualizar o livro");
                })
            );
    }

    public deleteBook(id: string):Observable<string>{
        return this.http.delete(base.url + '/books?id=' + id, {responseType: 'text'})
            .pipe(
                map((data: string) =>  data),
                catchError( error =>{
                    return throwError("Erro ao deletar o livro");
                })
            );
    }
}