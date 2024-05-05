import { Component, ViewChild } from "@angular/core";
import { MainService } from "../../main.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-stockall",
  templateUrl: "./stockall.component.html",
  styleUrls: ["./stockall.component.css"],
})
export class StockallComponent {
  displayedColumns: string[] = [
    "StockId",
    "product",
    "MinQty",
    "StockQtyInHand",
    "TotalStock",
    "Count",
    "action"
  ];
  stockList: any[] = [];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private service: MainService,private router:Router) {
    this.service.getAllStock((response: any) => {
      this.stockList = response;
      this.dataSource = new MatTableDataSource(this.stockList);
      this.dataSource.paginator = this.paginator;
    });
  }




  editItem(element: any) {
    this.router.navigate(["/stock", { data: element.stockId }]);
  }
}
