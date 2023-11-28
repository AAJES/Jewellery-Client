import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metalall',
  templateUrl: './metalall.component.html',
  styleUrls: ['./metalall.component.css']
})
export class MetalallComponent {

  displayedColumns: string[] = ['metalId', 'metalName','actions'];
  metalList : any[] = [];
  selectedRows: boolean[] = new Array<boolean>();
  selectedRowIndex: number | null = null;

  constructor(private service : MainService,private router : Router){
     this.service.getAllMetals((response : any)=>{
         this.metalList = response;
         this.selectedRows = new Array<boolean>(this.metalList.length).fill(false);
     })
  }

  isSelected(row: any): boolean {
    return this.selectedRows[this.metalList.indexOf(row)];
  }

  toggleRowSelection(index: number) {
    this.selectedRows[index] = !this.selectedRows[index];
  }

  isAllSelected(): boolean {
    return this.selectedRows.every(Boolean);
  }

  toggleSelectAll() {
    const allSelected = this.isAllSelected();
    this.selectedRows.fill(!allSelected);
    this.selectedRowIndex = null; // Reset selectedRowIndex when selecting all rows
  }

  editItem(element: any) {
    // Implement edit logic here
    console.log('Edit item:', element);
    this.router.navigate(['/metal', { data: element.metalId }]);
  }

  deleteItem(element: any) {
    // Implement delete logic here
    console.log('Delete item:', element);
  }

  dataSource = new MatTableDataSource<any>([]); // Replace 'any' with your data type
  selection = new SelectionModel<any>(true, []);

  displaySelectedRow() {
    // Find the index of the selected row
    const selectedIndex = this.selectedRows.findIndex(row => row === true);

    // If a row is selected, display its details
    if (selectedIndex !== -1) {
      const selectedMetal = this.metalList[selectedIndex];
      // Display the details of the selectedMetal as needed
      console.log('Selected Metal:', selectedMetal);
    } else {
      // No row is selected
      console.log('No row selected.');
    }
  }

  



}
