import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent {

  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    { field: "salesId", sortable: true, filter: true, editable: true },
    { field: "totalAmount", sortable: true, filter: true, editable: true },
    { field: "discountAmount", sortable: true, filter: true, editable: true },
    { field: "paymentStatus", sortable: true, filter: true, editable: true },
    { field: "wastage", sortable: true, filter: true, editable: true },
    { field: "grossWeight", sortable: true, filter: true, editable: true },
    { field: "netWeight", sortable: true, filter: true, editable: true },
    { field: "actualAmount", sortable: true, filter: true, editable: true },
    { field: "quantity", sortable: true, filter: true, editable: true },
    {
      field: "billGeneratedOrNo",
      sortable: true,
      filter: true,
      editable: true,
    },
  ];
  httpService: any;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  imageData: string = "";
  sales: any[] = [];
  file: string = "";

  displayedColumns: string[] = [
    "salesId",
    "totalAmount",
    "discountAmount",
    "paymentStatus",
    "wastage",
    "grossWeight",
    "netWeight",
    "actualAmount",
    "quantity",
    "billGeneratedOrNo",
  ];
  bookingList: any[] = [];
  dataSource!: MatTableDataSource<any>;
  fromDate: any;
  toDate: any;
  shopDetails: any;

  constructor(private http: HttpClient, private service: MainService) {}

  ngOnInit() {
    this.rowData$ = this.http.get<any[]>(
      "http://localhost:5050/jewellery/stock/"
    );


    this.service.getAllShop((data : any)=>{
      this.shopDetails = data[0];
    })
  }

  @ViewChild("contentToConvert")
  contentToConvert!: ElementRef;

  downloadPDF(): void {
    const doc = new jsPDF();

    const options = {
      margin: { top: 10, left: 10 },
      filename: "salesreport.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // this.service.getAllLessPaidSales((data : any)=>{
    //    this.sales = data;
    // })

    html2canvas(this.contentToConvert.nativeElement, { scale: 2 }).then(
      (canvas) => {
        this.imageData = canvas.toDataURL("image/jpeg", 1.0);
        doc.addImage(
          this.imageData,
          "JPEG",
          options.margin.left,
          options.margin.top,
          canvas.width * 0.1, // Adjust width to fit content (you can change the scale as needed)
          canvas.height * 0.1 // Adjust height to fit content
        );

        this.file = "stock" + ".pdf";

        options.filename = "stock" + ".pdf";

        doc.save(options.filename);
        //this.downloadPdf();
        //  this.emailDetails.msgBody = JSON.stringify("This is appointment details");
        //                       this.emailDetails.subject = "Confirmation mail";
        //                       this.emailDetails.recipient = this.visitor.visitor_email;
        //                       this.emailDetails.attachment = "D:/downloads/"+this.file;
        //                       this.emailDetails.msgBody = "This is your appointment details"
        //                       this.http.post("http://localhost:9090/mail/sendMailWithAttachment",this.emailDetails)
        //                                .subscribe(
        //                                 response => {
        //                                   console.log('Upload and email sent:', response);
        //                                 },
        //                                 error => {
        //                                   console.error('Error uploading and sending email:', error);
        //                                 })
      }
    );
  }

  onCellClicked(event: CellClickedEvent) {
    console.log(event);
  }

  clearSelection() {
    this.agGrid.api.deselectAll();
  }

  
  
  

  public getStockReportBydate() {
    console.log(this.fromDate + this.toDate);

    this.service.getSalesFromDateToDate(
      this.fromDate,
      this.toDate,
      (data: any) => {
        console.log(data);

        this.dataSource = data;
     // this.dataSource.paginator = this.paginator;
      }
    );
  }

}
