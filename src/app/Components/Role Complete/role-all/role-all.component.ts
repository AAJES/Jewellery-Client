import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MyCellComponent } from 'src/app/my-cell/my-cell.component';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { MyCellRoleComponent } from 'src/app/my-cell-role/my-cell-role.component';

@Component({
  selector: 'app-role-all',
  templateUrl: './role-all.component.html',
  styleUrls: ['./role-all.component.css'],
})
export class RoleAllComponent {
  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    {field: 'roleId',sortable: true , filter: true ,editable: true,cellRenderer:MyCellRoleComponent},
    {field: 'roleName',sortable: true , filter: true ,editable: true},
    {field: 'menuGroup',sortable: true , filter: true ,editable: true},
  ];

  httpService: any;
  @ViewChild(AgGridAngular) agGrid! : AgGridAngular;
  

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.rowData$ = this.http.get<any[]>(" http://localhost:9090/Role");
  }
   
  onCellClicked( event:CellClickedEvent){
  console.log(event)
  }

  clearSelection(){
  this.agGrid.api.deselectAll();
  }


  roles: any[] = [];
  menus: any[] = [];
  role: any = {};
  baseUri: string = 'http://localhost:5050/asm';

  viewComponent: string = 'displayall';
  httpClient: any;

  // constructor(private httpService: MainService) {
  //   httpService.getAllroles((data: any[]) => {
  //     this.roles = data;
  //   });
  //   httpService.getAllmenus((data: any[]) => {
  //     this.menus = data;
  //   });
  // }

  public onViewClick(id: number) {
    this.httpService.getrole(id, (data: any) => {
      this.role = data;
    });
    this.viewComponent = 'display';
  }
  public onAddrole(): void {
    this.role = {};
    this.viewComponent = 'add';
  }

  public addCompanyProcess(frm: any): void {
    let data = frm.value;
    data.menuGroup.menuGroupId = parseInt(data.menuGroup.menuGroupId);
    console.log(data);
    this.httpService.addrole(data, (data: any[]) => {
      this.roles = data;
    });

    this.viewComponent = 'displayall';
  }

  // public addCompanyProcess(): void {
  //   this.httpService.addrole(this.role, (data: any[]) => {
  //     this.roles = data;
  //   });

  //   this.viewComponent = 'displayall';
  // }

  public onDeleteClick(id: number) {
    this.httpService.deleterole(id, (data: any[]) => {
      this.roles = data;
    });
    this.viewComponent = 'displayall';
  }

  public onUpdateClick(id: number): void {
    this.httpService.getrole(id, (data: any) => {
      this.role = data;
    });
    this.viewComponent = 'update';
  }

  public updateCompanyProcess(id: number): void {
    this.httpService.updaterole(id, this.role, (data: any) => {
      this.roles = data;
    });
    this.viewComponent = 'displayall';
  }
}
