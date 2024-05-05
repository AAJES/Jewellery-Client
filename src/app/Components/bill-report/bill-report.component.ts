import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bill-report',
  templateUrl: './bill-report.component.html',
  styleUrls: ['./bill-report.component.css']
})
export class BillReportComponent {


  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    {field: 'billId',sortable: true , filter: true ,editable: true},
    {field: 'billId',sortable: true , filter: true ,editable: true},
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
  displayedColumns: string[] = ['billId', 'billNumber', 'customerName', 'amountPaid' , 'discountAmount' , 'actualAmount' ,'gst','trdate'
];
  bookingList : any[] = [];
  dataSource!: MatTableDataSource<any>;
fromDate: any;
toDate: any;
  customerList: any[]=[]
 customer:any
 customerId:any=0
  shopDetails: any;






  constructor(private http:HttpClient,private service : MainService){}

  ngOnInit(){
   
    this.service.getAllCustomer((data:any)=>{
      this.customerList=data
    })


    this.service.getAllShop((data : any)=>{
      this.shopDetails = data[0];
    })
  }

  @ViewChild('contentToConvert')
  contentToConvert!: ElementRef;

  // downloadPDF(): void {
  //   const doc = new jsPDF();

  //   const options = {
  //     margin: { top: 10, left: 10 },
  //     filename: 'salesreport.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //   };


 

  //   html2canvas(this.contentToConvert.nativeElement, { scale: 2 }).then((canvas) => {
  //     this.imageData = canvas.toDataURL('image/jpeg', 1.0);
  //     doc.addImage(
  //       this.imageData,
  //       'JPEG',
  //       options.margin.left,
  //       options.margin.top,
  //       canvas.width * 0.15, 
  //       canvas.height * 0.15 
  //     );

  //     this.file = "billreports" + '.pdf';

  //     options.filename =  "billreports" + '.pdf';

  //     doc.save(options.filename);
     
  //   });
  // }
   
  downloadPDF(): void {
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    });
  
    const options = {
      margin: { top: 10, left: 10 },
      filename: 'billreports.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
    };
  
    const contentToConvert = this.contentToConvert.nativeElement;
  
    // Get bounding rectangle of content element
    const contentRect = contentToConvert.getBoundingClientRect();
    const contentHeight = contentRect.height;
    
    // Calculate number of entries per page based on the height of each entry
    const entryHeight = 10; // Assuming each entry height is 10mm
    const entriesPerPage = Math.floor((doc.internal.pageSize.getHeight() - options.margin.top) / entryHeight);
  
    html2canvas(contentToConvert, { scale: 1.5 }).then((canvas) => {
      const totalPages = Math.ceil(contentHeight / doc.internal.pageSize.getHeight());
       totalPages/entryHeight;
       
      let yPos = 0;
      let currentPage = 1;
  
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          // If there is content to add on the next page
          if ((contentHeight - yPos) / entryHeight > 0) {
            doc.addPage();
            currentPage++;
          } else {
            break; // No more content, exit loop
          }
        }
  
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        doc.addImage(imgData, 'JPEG', options.margin.left, options.margin.top - yPos, canvas.width * 0.13, canvas.height * 0.11);
  
        // Calculate number of entries to display on this page
        const remainingEntries = Math.min(entriesPerPage, Math.ceil((contentHeight - yPos) / entryHeight));
  
        yPos += remainingEntries * entryHeight;
  
        doc.setPage(currentPage);
        doc.text(`Page ${currentPage} of ${totalPages}`, options.margin.left, doc.internal.pageSize.getHeight() - 18);
      }
  
      doc.save(options.filename);
    });
  }



  
  
  
  
  onCellClicked( event:CellClickedEvent){
  console.log(event)
  }

  clearSelection(){
  this.agGrid.api.deselectAll();
  }



  onCustomerSelectionChange(customerId: any) {
    console.log(customerId+".........................")
   this. customerId=customerId

    }
      getBillReportBydate() {
      console.log(this.fromDate+".."+this.toDate+"......"+this.customerId)

      this.service.getAllBillsByCustomerIdAndFromandToDate(this.customerId,this.fromDate,this.toDate,(data:any)=>{
        this.dataSource=data;
      })
      

    }
}
