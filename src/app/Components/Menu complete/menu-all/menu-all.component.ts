import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-all',
  templateUrl: './menu-all.component.html',
  styleUrls: ['./menu-all.component.css']
})
export class MenuAllComponent {
  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    {field: 'menu_id',sortable: true , filter: true ,editable: true},
    {field: 'menuName',sortable: true , filter: true ,editable: true},
    {field: 'menuGroup',sortable: true , filter: true ,editable: true},
  ];
  httpService: any;
  @ViewChild(AgGridAngular) agGrid! : AgGridAngular;
  constructor(private http:HttpClient){}

  ngOnInit(){
    this.rowData$ = this.http.get<any[]>(" http://localhost:9090/visitor/menu");
  }
   
  onCellClicked( event:CellClickedEvent){
  console.log(event)
  }

  clearSelection(){
  this.agGrid.api.deselectAll();
  }
 
  menus: any[] = [];
  menu: any = {};
  baseUri: string = 'http://localhost:5050/asm';

  viewComponent: string = 'displayall';
  httpClient: any;

  // constructor(private httpService: MainService) {
  //   httpService.getAllmenus((data: any[]) => {
  //     this.menus = data;
  //   });
  // }

  public onViewClick(menuGroupId: number) {
    this.httpService.getmenu(menuGroupId, (data: any) => {
      this.menu = data;
    });
    this.viewComponent = 'display';
  }
  public onAddmenu(): void {
    this.menu = {};
    this.viewComponent = 'add';
  }
  public addCompanyProcess(): void {
    this.httpService.addmenu(this.menu, (data: any[]) => {
      this.menus = data;
    });

    this.viewComponent = 'displayall';
  }

  public onDeleteClick(menuGroupId: number) {
    this.httpService.deletemenu(menuGroupId, (data: any[]) => {
      this.menus = data;
    });
    this.viewComponent = 'displayall';
  }

  public onUpdateClick(menuGroupId: number): void {
    this.httpService.getmenu(menuGroupId, (data: any) => {
      this.menu = data;
    });
    this.viewComponent = 'update'; 
  }

  public updateCompanyProcess(menuGroupId: number): void {
    this.httpService.updatemenu(menuGroupId, this.menu, (data: any) => {
      this.menus = data;
    });
    this.viewComponent = 'displayall';
  }
}
