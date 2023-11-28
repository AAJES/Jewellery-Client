import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailDetails, Visitor } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css']
})
export class Template2Component {

  receivedData : any = {};
  appointment : any = {};
  address : any = {};
  fromdate : string = '';
  todate : any = {};
  image : string = '';
  imageUrl : string = '';
  image1 : string = '';
  cleanedString : string = '';
  visitor : Visitor = {
    visitor_id: 0,
    visitor_name: '',
    visitor_address: '',
    visitor_email: '',
    visitor_phone1: '',
    visitor_phone2: '',
    visitor_photo: '',
    visitor_aadhar: ''
  }

  list : any[] = [];

  name : string = '';
  @Input() dataFromParent: number = 0;

  localVariable : number = 0;
  imageData: string | ArrayBuffer | null = null;

  // ngOnChanges() {
  //   // When the input property 'transferredNumber' changes,
  //   // the ngOnChanges() lifecycle hook will be called.
  //   // You can assign the value to the local variable here.
  //   this.localVariable = this.dataFromParent;
  //   console.log(this.localVariable);
  //   this.http.get("htttp:localhost:9090/Visitor/"+this.localVariable)
  //            .subscribe((data : any)=>{
  //               this.visitor = data;
  //            }) 
  // }  

  constructor(private route: ActivatedRoute,private http : HttpClient,private service : MainService,private renderer: Renderer2, private el: ElementRef,private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.receivedData = params.get('data');
       this.http.get("http://localhost:9090/visitor/start/"+this.receivedData)
                .subscribe(
                  (response: any) => {
                    // Handle the successful response here
                    console.log('Response:', response);
                    // Process the response data or update your component properties accordingly
                  },
                  (error: any) => {
                    // Handle the error here
                    console.error('Error:', error);
                    this.fromdate = error.error;
                    // Perform error handling, display error messages, or take other actions based on the error
                  }
                )
                

       this.http.get("http://localhost:9090/visitor/end/"+this.receivedData)
                .subscribe((response: any) => {
                  // Handle the successful response here
                  console.log('Response:', response);
                  // Process the response data or update your component properties accordingly
                },
                (error: any) => {
                  // Handle the error here
                  console.error('Error:', error);
                  this.todate = error.error;
                  // Perform error handling, display error messages, or take other actions based on the error
                })     
                
       this.http.get("http://localhost:9090/appointment/visitor/"+this.receivedData)
                .subscribe((response: any) => {
                  // Handle the successful response here
                  console.log('Response:', response);
                 
                  this.visitor = response;
                  // Process the response data or update your component properties accordingly
                },
                (error: any) => {
                  // Handle the error here
                  console.error('Error:', error);
                  this.visitor = error.error;
                  console.log(this.visitor);
                  this.name = this.visitor.visitor_name;
                  this.address = this.visitor.visitor_address;
                  this.imageUrl = this.visitor.visitor_photo;
                  this.getQR();
                  //imageUrl: string = this.visitor.visitor_photo; // Replace with the actual image URL
                  this.cleanedString = this.imageUrl.replace("D:\\", " ").trim(); 
                  console.log(this.cleanedString);
                  this.service.getImageFromServer(this.cleanedString).subscribe(
                    (imageData: ArrayBuffer) => {
                      const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); // Change to the appropriate type for your image
                      this.imageSrc = URL.createObjectURL(imageBlob);
                      console.log("image"); 
                    },
                    (error) => {
                      console.error('Error fetching image:', error);
                    }
                  );

                  this.http.get("http://localhost:9090/appointment/sectionvisited/"+this.receivedData)
                  .subscribe(

                      (response : any)=>{
                          console.log(response);
                          this.list = response;
                          console.log(this.list);
                      },

                      (error : any)=>{
                          this.list = error.error;
                           console.log(this.list)
                      }
                  )       

                  // const printContent = this.printSection.nativeElement.innerHTML;
                  // this.ngxPrintService.print({ printable: printContent });
                  
                  // this.service.getImageFromServer(this.cleanedString).subscribe(
                  //   (imageData: ArrayBuffer) => {
                  //     const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); // Change to the appropriate type for your image
                  //     this.imageSrc = URL.createObjectURL(imageBlob);
                  //     console.log("image")
                  //   },
                  //   (error) => {
                  //     console.error('Error fetching image:', error);
                  //   }
                  // );
                  
                  // Perform error handling, display error messages, or take other actions based on the error
                  
                })        


         this.http.get("http://localhost:9090/appointment/sectionvisited/"+this.receivedData)
                  .subscribe(

                      (response : any)=>{
                          this.list = response;
                          console.log(this.list);
                      },

                      (error : any)=>{
                          this.list = error.error;
                         // console.log(this.list)
                      }
                  )       
                
              
              
                
                
                         
    });

    

    
   //this.ngOnChanges();
    
  }

  // @ViewChild('printSection', { static: false })
  // printSection!: ElementRef;

  public generatePDF() 
  { 
    // const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' });

    //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  } 

  emailDetails : EmailDetails = {
    mailNo: 0,
    sender: '',
    recipient: '',
    msgBody: '',
    subject: '',
    attachment: ''
  }

  downloadPdf() {
    const pdfUrl = this.file;
    this.service.downloadPdf(pdfUrl).subscribe(
      downloadedPdfBlob => {
        // Call the uploadPdf() function with the downloaded PDF Blob
        this.uploadPdf(downloadedPdfBlob);
      },
      error => {
        console.error('Error downloading PDF:', error);
      }
    );
  }

  uploadPdf(downloadedPdfBlob: Blob) {
    // Upload the downloaded PDF Blob to your Spring Boot backend
    this.service.uploadPdf(downloadedPdfBlob,this.visitor.visitor_id).subscribe(
      response => {
        console.log('Upload and email sent:', response);
      },
      error => {
        console.error('Error uploading and sending email:', error);
      }
    );
  }


  

  place : string = '';
  cleanedString1 : string = '';

  public getQR(){
    console.log("QrCode : .............")
    // this.http.get("http://localhost:9090/qr/appointmentQr/"+this.receivedData)
    //           .subscribe((response: any) => {
    //             // Handle the successful response here
    //             console.log('Response:', response);
    //             console.log("sssssssss")
    //             // Process the response data or update your component properties accordingly
    //           },
    //           (error: any) => {
    //             // Handle the error here
    //             console.error('Error:', error.error);
    //             this.place = error.error;
    //             console.log(this.place);
    //             this.cleanedString1 = this.place.replace("D:\\"," ").trim();
    //            // console.log(this.cleanedString1);
    //            this.service.getImageFromServer(this.cleanedString1).subscribe(
    //             (arrayBuffer: ArrayBuffer) => {
    //               const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Adjust the MIME type
    //               this.image = URL.createObjectURL(blob);
    //             },
    //             (error) => {
    //               console.error('Error fetching image:', error);
    //             }
    //           );
                
    //           })  

    this.service.getImage(this.receivedData).subscribe((imageData: Blob) => {
      // Process the image data here if needed (e.g., convert to base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageData = reader.result;
      };
      reader.readAsDataURL(imageData);
    });
  
  }

  file : any = '';

  @ViewChild('contentToConvert')
  contentToConvert!: ElementRef;

  downloadPDF(): void {
    const doc = new jsPDF();

    const options = {
      margin: { top: 10, left: 10 },
      filename: 'downloaded_pdf.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

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

      this.file = this.receivedData + "_"+ this.visitor.visitor_name+ '.pdf';

      options.filename =  this.receivedData +"_"+ this.visitor.visitor_name+ '.pdf';

      doc.save(options.filename);
      //this.downloadPdf();
       this.emailDetails.msgBody = JSON.stringify("This is appointment details");
                            this.emailDetails.subject = "Confirmation mail";
                            this.emailDetails.recipient = this.visitor.visitor_email;
                            this.emailDetails.attachment = "D:/downloads/"+this.file;
                            this.emailDetails.msgBody = "This is your appointment details"
                            this.http.post("http://localhost:9090/mail/sendMailWithAttachment",this.emailDetails)
                                     .subscribe(
                                      response => {
                                        console.log('Upload and email sent:', response);
                                      },
                                      error => {
                                        console.error('Error uploading and sending email:', error);
                                      })
    });
  }


  // Will remove all non-numeric characters
  //this.cleanedString = cleanedString.trim();

  imageSrc: string = '';
  imageSrc1: string = '';

  //constructor(private imageService: ImageService) { }

  // fetchImage() {
  //   this.service.getImageFromServer(this.imageUrl).subscribe(
  //     (imageData: ArrayBuffer) => {
  //       const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); // Change to the appropriate type for your image
  //       this.displayImage(imageBlob);
  //     },
  //     (error) => {
  //       console.error('Error fetching image:', error);
  //     }
  //   );
  // }

  
  // displayImage(imageBlob: Blob) {
  //   // Use the imageBlob to display the image in your Angular component
  //   // For example, you can create a DOM element dynamically and set its src attribute:
  //   const imageElement = document.createElement('img');
  //   imageElement.src = URL.createObjectURL(imageBlob);
  //   //this.image = imageElement;
  //   // Add the imageElement to the DOM or update the src attribute of an existing <img> element.
  // }

  fetchAndDisplayImage(imageUrl : string) {
    this.service.getImageFromServer(this.cleanedString).subscribe(
      (imageData: ArrayBuffer) => {
        const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); // Change to the appropriate type for your image
        this.imageSrc = URL.createObjectURL(imageBlob);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }


  // private fileUrl = 'localhost:4200/template;data=53';

  // downloadFile() {
  //   const link = document.createElement('a');
  //   link.href = this.fileUrl;
  //   link.download = 'template;data=53.pdf'; 
  //   link.click();
  // }


}
