import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";
import { AllocateEditService } from "src/app/biblioteca/services/allocate/allocate-edit.service";
import { AllocateService } from "src/app/biblioteca/services/allocate/allocate.service";

@Component({
    selector: 'allocate-visualization',
    templateUrl: './allocate-visualization.component.html',
    styleUrls: ['./allocate-visualization.component.scss'],
})

export class AllocateVisualizationComponent implements OnInit {

    displayedColumns: string[] = ['id', 'usuario', 'livro', 'data_locacao', 'data_devolucao', 'actions'];
    dataSource = new MatTableDataSource<any>();
    @ViewChild('AllocatePaginator') paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);

    constructor(private _allocateEditService: AllocateEditService,
                private _allocateService: AllocateService) {
    }

    ngOnInit(): void {
        this.getAllocate();
    }

    getAllocate(){
        this._allocateService.getAllocate()
            .subscribe(response => {
                this.dataSource = new MatTableDataSource(response)
                this.setPaginator();
            });
    }

    setPaginator() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    edit(id: number): void {
        this._allocateEditService.updateAllocateBooks(this.dataSource.data.find(d => d.id == id));
    }

    delete(id: string): void {
        this._allocateService.deleteAllocate(id)
            .subscribe(response => {
                console.log(response)
                this.refresh();
            });
    }

    refresh() {
        this.getAllocate();
    }
}