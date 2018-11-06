import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";
import { AllocateService } from "src/app/biblioteca/services/allocate.service";

@Component({
    selector: 'allocate-visualization',
    templateUrl: './allocate-visualization.component.html',
    styleUrls: ['./allocate-visualization.component.scss'],
})

export class AllocateVisualizationComponent implements OnInit {

    displayedColumns: string[] = ['id', 'usuario', 'livro', 'dataalocacao', 'datadevolucao', 'actions'];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    loadingfinish: boolean = false;
    selection = new SelectionModel<any>(true, []);

    constructor(private _allocateService: AllocateService) {
    }

    ngOnInit(): void {
        this.loadingfinish = false;
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(Data)
            this.setPaginator();
            this.loadingfinish = true;
        }, 1000);
    }

    setPaginator() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    edit(id: number): void {
        this._allocateService.updateAllocateBooks(this.dataSource.data.find(d => d.id == id));
    }

    delete(id: number): void {
        const index = this.dataSource.data.findIndex(k => k.id == id);
        this.dataSource.data.splice(index, 1);
        this.refresh();
    }

    refresh() {
        this.dataSource = new MatTableDataSource(Data);
    }
}

const Data: any[] = [
    { id: 1, usuario: 'samuel', livro: 'Helium', dataalocacao:'05/05/2018', datadevolucao:'07/5/2018' },
    { id: 2, usuario: 'jairo', livro: 'teste 2', dataalocacao:'05/05/2018', datadevolucao:'07/5/2018' },
    { id: 3, usuario: 'caina', livro: 'teste 3', dataalocacao:'05/05/2018', datadevolucao:'07/5/2018' },   
];