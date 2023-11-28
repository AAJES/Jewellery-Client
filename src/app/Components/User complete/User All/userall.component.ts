import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userall',
  templateUrl: './userall.component.html',
  styleUrls: ['./userall.component.css'],
})
export class UserallComponent {
  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    {field: 'user_id',sortable: true , filter: true ,editable: true},
    {field: 'user_Username',sortable: true , filter: true ,editable: true},
    {field: 'user_email',sortable: true , filter: true ,editable: true},
    {field: 'user_phone1',sortable: true , filter: true ,editable: true},
    {field: 'user_phone2',sortable: true , filter: true ,editable: true},
  ];

  httpService: any;
  @ViewChild(AgGridAngular) agGrid! : AgGridAngular;
  

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.rowData$ = this.http.get<any[]>(" http://localhost:9090/User");
  }
   
  onCellClicked( event:CellClickedEvent){
  console.log(event)
  }

  clearSelection(){
  this.agGrid.api.deselectAll();
  }

  users: any[] = [];
  sections: any[] = [];
  roles: any[] = [];
  user: any = {};
  baseUri: string = 'http://localhost:5050/asm';

  viewComponent: string = 'displayall';
  httpClient: any;

  // constructor(private httpService: MainService) {
  //   httpService.getAllusers((data: any[]) => {
  //     this.users = data;
  //   });
  //   httpService.getAllroles((data: any[]) => {
  //     this.roles = data;
  //   });
  //   httpService.getAllsections((data: any[]) => {
  //     this.sections = data;
  //   });
  // }

  public onViewClick(id: number) {
    this.httpService.getuser(id, (data: any) => {
      this.user = data;
    });
    this.viewComponent = 'display';
  }
  public onAddUser(): void {
    this.user = {};
    this.viewComponent = 'add';
  }
  public addCompanyProcess(frm: any): void {
    let data = frm.value;
    data.roles.roleId = parseInt(data.roles.roleId);
    data.section.sectionId = parseInt(data.section.sectionId);

    this.httpService.adduser(data, (data: any[]) => {
      this.users = data;
    });

    this.viewComponent = 'displayall';
  }

  public onDeleteClick(id: number) {
    this.httpService.deleteuser(id, (data: any[]) => {
      this.users = data;
    });
    this.viewComponent = 'displayall';
  }

  public onUpdateClick(id: number): void {
    this.httpService.getuser(id, (data: any) => {
      this.user = data;
    });
    this.viewComponent = 'update';
  }

  public updateCompanyProcess(id: number): void {
    this.httpService.updateuser(id, this.user, (data: any) => {
      this.users = data;
    });
    this.viewComponent = 'displayall';
  }
}
