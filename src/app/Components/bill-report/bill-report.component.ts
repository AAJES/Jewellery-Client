import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-bill-report',
  templateUrl: './bill-report.component.html',
  styleUrls: ['./bill-report.component.css']
})
export class BillReportComponent {

  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    {field: 'billId',sortable: true , filter: true ,editable: true},
    {field: 'billNumber',sortable: true , filter: true ,editable: true},
    {field: 'customer.customerName',sortable: true , filter: true ,editable: true},
    {field: 'amountPaid',sortable: true , filter: true ,editable: true},
    {field: 'discountAmount',sortable: true , filter: true ,editable: true},
    {field: 'actualAmount',sortable: true , filter: true ,editable: true},
    {field: 'gst',sortable: true , filter: true ,editable: true},
    {field: 'trdate',sortable: true , filter: true ,editable: true},
  ];
  httpService: any;
  @ViewChild(AgGridAngular) agGrid! : AgGridAngular;
  imageData: string = '';
  sales : any[] = [];
  file: string = '';
  

  constructor(private http:HttpClient,private service : MainService){}

  ngOnInit(){
    this.rowData$ = this.http.get<any[]>("http://localhost:5050/jewellery/bill/");
  }

  @ViewChild('contentToConvert')
  contentToConvert!: ElementRef;

  downloadPDF(): void {
    const doc = new jsPDF();

    const options = {
      margin: { top: 10, left: 10 },
      filename: 'salesreport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };


    this.service.getAllLessPaidSales((data : any)=>{
       this.sales = data;
    })

    html2canvas(this.contentToConvert.nativeElement, { scale: 2 }).then((canvas) => {
      this.imageData = canvas.toDataURL('image/jpeg', 1.0);
      doc.addImage(
        this.imageData,
        'JPEG',
        options.margin.left,
        options.margin.top,
        canvas.width * 0.15, // Adjust width to fit content (you can change the scale as needed)
        canvas.height * 0.15 // Adjust height to fit content
      );

      this.file = "billreports" + '.pdf';

      options.filename =  "billreports" + '.pdf';

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
    });
  }
   
  onCellClicked( event:CellClickedEvent){
  console.log(event)
  }

  clearSelection(){
  this.agGrid.api.deselectAll();
  }

}
