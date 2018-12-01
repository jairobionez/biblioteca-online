import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { PublishingCompany } from "src/app/biblioteca/models/publishing-company.entity";
import { SelectionModel } from "@angular/cdk/collections";
import { PublishingCompanyEditService } from "src/app/biblioteca/services/publishing-company/publishing-company-edit.service";
import { PublishingCompanyService } from "src/app/biblioteca/services/publishing-company/publishing-company.service";

@Component({
    selector: 'publishing-visualization',
    templateUrl: './publishing-company-visualization.component.html',
    styleUrls: ['./publishing-company-visualization.component.scss']
})
export class PublishingCompanyVisualizationComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'actions'];
    dataSource = new MatTableDataSource<PublishingCompany>();
    @ViewChild('PublishingCompanyPaginator') paginator: MatPaginator;

    selection = new SelectionModel<PublishingCompany>(true, []);

    constructor(
        private _publishingCompanyEditService: PublishingCompanyEditService,
        private _publishingService: PublishingCompanyService
        ) {
    }

    ngOnInit(): void {
        this.getPublishing();
    }

    getPublishing(){
        this._publishingService.getPublishing()
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

    edit(id: string): void {
        this._publishingCompanyEditService.updateBook(this.dataSource.data.find(d => d.id == id));
    }

    delete(id: string): void {
        this._publishingService.deletePublishing(id)
            .subscribe(response => {
                console.log(response)
                this.refresh();
            });
    }

    refresh() {
        this.getPublishing();
    }
}