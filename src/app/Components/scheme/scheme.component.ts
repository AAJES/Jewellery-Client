import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { MainService } from "../main.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Scheme } from "src/app/commons/common.objects";
import { formatDate } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-scheme",
  templateUrl: "./scheme.component.html",
  styleUrls: ["./scheme.component.css"],
})
export class SchemeComponent {
  scheme: Scheme = {
    schemeId: 0,
    schemeName: "",
    schemeAmount: 0,
    startDate: "",
    endDate: "",
    trDate: "",
    amountPerMonth: 0,
    totalSizeCustomer: 0
  };
  public calculatedMonths: number = 0;
  displayedColumns: string[] = ["schemeId", "schemeName", "schemeAmount", "startDate", "endDate", "amountPerMonth"];
  schemeList: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService, private router: Router) {
    const currentDate = new Date();
    const startDate = formatDate(currentDate, "yyyy-MM-dd", "en-US");
    const endDate = formatDate(currentDate, "yyyy-MM-dd", "en-US");

    this.service.getAllSchemes((response: any) => {
      
      this.schemeList = response;
      this.dataSource = new MatTableDataSource(this.schemeList);
      this.dataSource.paginator = this.paginator;
    });
  }

  public totalSchemeAmount(amt: number) {
    this.scheme.schemeAmount = amt * 12;
  }

  public onSubmit() {
    this.service.addScheme(this.scheme, (data: any) => {
      console.log(data);
      this.scheme ={
        schemeId: 0,
        schemeName: "",
        schemeAmount: 0,
        startDate: "",
        endDate: "",
        trDate: "",
        amountPerMonth: 0,
        totalSizeCustomer: 0,
      }
      this.calculatedMonths = 0;
      // this.router.navigate(["/home3"]);
      this.service.getAllSchemes((response: any) => {
      
        this.schemeList = response;
        this.dataSource = new MatTableDataSource(this.schemeList);
        this.dataSource.paginator = this.paginator;
      });
     
    });
  }

  public calculateSchemeAmount() {
    const start = new Date(this.scheme.startDate);
    const end = new Date(this.scheme.endDate);

    // Calculate the difference in months
    const diffInMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;
    this.calculatedMonths = diffInMonths;
    this.scheme.schemeAmount = this.scheme.amountPerMonth * diffInMonths;
  }

  // public onSubmit() {
  //   // Assuming startDate and endDate are in the format 'YYYY-MM-DD'
  //   const start = new Date(this.scheme.startDate);
  //   const end = new Date(this.scheme.endDate);

  //   // Calculate the difference in months
  //   const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  //   // Calculate schemeAmount based on the difference in months
  //   this.scheme.schemeAmount = this.scheme.amountPerMonth * diffInMonths;

  //   this.service.addScheme(this.scheme, (data : any)=>{
  //     console.log(data);
  //     this.router.navigate(['/home3'])
  //     this.scheme = data;
  //   })
  // }
}
