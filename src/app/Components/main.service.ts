import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CartComponent } from "./cart/cart.component";
import { Product } from "../commons/common.objects";
import { ToastrService } from "ngx-toastr";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class MainService {
  
  baseUri: string = "http://localhost:9090/asm";

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {}

  public getAllroles(callback: any) {
    this.httpClient.get(this.baseUri + "/roles/").subscribe((data) => {
      callback(data);
    });
  }



  public getrole(roleId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + "/roles/" + roleId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addrole(roles: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/roles", roles)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + "/roles/").subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public deleterole(roleId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + "/roles/" + roleId)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + "/roles/").subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public updaterole(roleId: number, roles: any, callback: any) {
    this.httpClient
      .put(this.baseUri + "/roles/" + roleId, roles)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + "/roles/").subscribe((data: any) => {
          callback(data);
        });
      });
  }
  // Ending of Role

  // Complete menu

  public getAllmenus(callback: any) {
    this.httpClient.get(this.baseUri + "/menuGroup/").subscribe((data) => {
      callback(data);
    });
  }

  public getmenu(menuGroupId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + "/menuGroup/" + menuGroupId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addmenu(menu: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/menuGroup", menu)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + "/menuGroup/")
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public deletemenu(menuGroupId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + "/menuGroup/" + menuGroupId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + "/menuGroup/")
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updatemenu(menuGroupId: number, menu: any, callback: any) {
    this.httpClient
      .put(this.baseUri + "/menuGroup/" + menuGroupId, menu)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + "/menuGroup/")
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }
  // End of Menu

  // Complete User
  public getAllusers(callback: any) {
    this.httpClient.get(this.baseUri + "/user/").subscribe((data) => {
      callback(data);
    });
  }

  public getuser(menuGroupId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + "/user/" + menuGroupId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public adduser(user: any, callback: any) {
    this.httpClient
      .post(this.baseUri + "/user", user)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + "/user/").subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public deleteuser(menuGroupId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + "/user/" + menuGroupId)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + "/user/").subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public updateuser(menuGroupId: number, user: any, callback: any) {
    this.httpClient
      .put(this.baseUri + "/user/" + menuGroupId, user)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + "/user/").subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public getAllUser(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/user/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getUserById(userid: number, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/user/" + userid).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getImageFromServer(imageUrl: string) {
    console.log("?????????????????????????????????????????????????????")
    return this.httpClient.get(
      "http://localhost:5050/ams/downloadImage/" + imageUrl,
      { params: { imageUrl }, responseType: "arraybuffer"}
    );
  }

  getImage(appointment_id: any): Observable<any> {
    const headers = new HttpHeaders(); // Add any required headers here

    return this.httpClient
      .get("http://localhost:9090/qr/qrcode/" + appointment_id, {
        headers,
        responseType: "blob",
      })
      .pipe(
        map((response: Blob) => {
          // Process the response if needed (e.g., convert to base64)
          // You can also extract headers from the response using response.headers
          return response;
        })
      );
  }

  uploadPdf(pdfBlob: Blob, visitor_id: any): Observable<any> {
    const formData = new FormData();
    formData.append("pdfFile", pdfBlob, "pdf_filename.pdf");

    return this.httpClient.post<any>(
      "http://localhost:9090/ams/upload-pdf/" + visitor_id,
      formData
    );
  }

  downloadPdf(pdfUrl: string): Observable<Blob> {
    return this.httpClient.get(
      "http://localhost:9090/ams/downloadImage/" + pdfUrl,
      { responseType: "blob" }
    );
  }

  jewellerybaseUri: string = "http://localhost:5050/jewellery";



  public getAllMetals(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/metal/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addMetal(metal: any, callback: any): void {
    this.httpClient.post(this.jewellerybaseUri + "/metal", metal).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Metal added successfully!", "Close", {
          duration: 3000, // Set the duration for the snackbar
          horizontalPosition: "right",
          verticalPosition: "bottom",
        });
      },
      (error: any) => {
        console.error("Error adding metal:", error);
        this.snackBar.open("Failed to add metal. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], // Optional: Add a custom CSS class for styling
        });
      }
    );
  }

  public getMetal(metalId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/metal/" + metalId).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public updateMetal(metalId: any, metal: any, callback: any): void {
    this.httpClient
      .put(this.jewellerybaseUri + "/metal/" + metalId, metal)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Metal updated successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error updating metal:", error);
          this.snackBar.open(
            "Failed to update metal. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }

  public getAllPurity(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/purity/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addPurity(purity: any, callback: any): void {
    this.httpClient.post(this.jewellerybaseUri + "/purity", purity).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Purity added successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      },
      (error: any) => {
        console.error("Error adding purity:", error);
        this.snackBar.open("Failed to add purity. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"],
        });
      }
    );
  }

  public getPurity(purityId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/purity/" + purityId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public updatePurity(purityId: any, purity: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/purity/" + purityId, purity)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllBill(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/bill/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addBill(bill: any, callback: any) {
    this.httpClient.post(this.jewellerybaseUri + "/bill", bill).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getAllBooking(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/booking/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getBill(billId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/bill/" + billId).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getAllBillsByCustomerIdAndFromandToDate(
    customerId: any,
    formDate: any,
    toDate: any,
    callback: any
  ) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/bill/dates/" +
          customerId +
          "/" +
          formDate +
          "/" +
          toDate
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getPaymentsOnThatday(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/payment/getOnThatDay/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllPendingPaymentsByCustomer(customerId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/payment/pending/" + customerId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public findAllBooking(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/booking/getall/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getBookingById(bookingId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/booking/" + bookingId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public addBooking(booking: any, callback: any): void {
  
    this.httpClient.post(this.jewellerybaseUri + "/booking", booking).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Booking added successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      },
      (error: any) => {
        console.error("Error adding booking:", error);
        this.snackBar.open(
          "Failed to add booking. Please try again.",
          "Close",
          {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snackbar-error"],
          }
        );
      }
    );
  }

  public getAllBookingbyBooked(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/booking/booked/")
                   .subscribe((data: any) => {

        callback(data);
      });
  }

  public getAllBookingbyCancelled(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/booking/booked/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public updateBooking(bookingId: any, booking: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/booking/" + bookingId, booking)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  

  public getAllCategory(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/category/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public  addCategory(category: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/category", category)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getCategory(categoryId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/category/" + categoryId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public updateCategory(categoryId: any, category: any, callback: any): void {
    this.httpClient
      .put(this.jewellerybaseUri + "/category/" + categoryId, category)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Category updated successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error updating Category:", error);
          this.snackBar.open(
            "Failed to update metal. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }

  public getAllModeOfPayment(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/modeOfPayment/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public addModeOfPayment(modeOfPayment: any, callback: any): void {
    this.httpClient
      .post(this.jewellerybaseUri + "/modeOfPayment", modeOfPayment)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Mode of payment added successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error adding mode of payment:", error);
          this.snackBar.open(
            "Failed to add mode of payment. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }

  public updateModeOfPayment(modeOfPaymentId: any, modeOfPayment: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/modeOfPayment/" + modeOfPaymentId, modeOfPayment)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Mode of Payment updated successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },

      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to update Mode of Payment. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }

  public deleteModeOfPayment(modeOfPaymentId : any){
    this.httpClient.delete(this.jewellerybaseUri+'/modeOfPayment/'+modeOfPaymentId)
                   .subscribe((data:any)=>{
                    
                   })
  }

  public getAllPayment(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/payment/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getPaymentByBookingId(bookingId: any, payment: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/payment/booking/" + bookingId, payment)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getAllPendingPayments(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/payment/pendingPayments/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSalesOnThatDay(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/sales/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getAllReturns(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/return/getAll")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllTodayAndTomorrowBookings(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/booking/todayAndTomorrowBookings/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  // public getAllPendingPayments(customerId : any,callback : any){
  //    this.httpClient.get(this.jewellerybaseUri+'/payment/pending/'+customerId)
  //                   .subscribe((data : any)=>{
  //                      callback(data);
  //                   })
  // }

  //   public getAllPendingPaymentsByCustomer(customerId : any,callback : any){
  //     this.httpClient.get(this.jewellerybaseUri+'/payment/pending/'+customerId)
  //                    .subscribe((data : any)=>{
  //                       callback(data);
  //                    })
  //  }

  public addPayment(payment: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/payment", payment)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public updatePayment(paymentId: any, payment: any, callback: any): void {
    console.log("//////////////////////////////////////////////////////////////")
    this.httpClient
      .put(this.jewellerybaseUri + "/payment/" + paymentId, payment)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Payment updated successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error updating payment:", error);
          this.snackBar.open(
            "Failed to update payment. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }
  public getPayment(paymentId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/payment/" + paymentId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getModeOfPayment(modeOfPaymentId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/modeOfPayment/" + modeOfPaymentId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getAllRate(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/rate/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public addRate(rate: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/rate", rate)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getRate(rateId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/rate/" + rateId).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getRateForGold(metalId: any, purityId: any, callback: any) {
    this.httpClient
      .get(
        this.jewellerybaseUri + "/rate/metal/" + metalId + "/purity/" + purityId
      )
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getRateForSilver(metalId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/rate/metal/" + metalId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getRateToday(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/rate/today")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllReturn(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/return/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addReturn(Return: any, callback: any) {
    this.httpClient.post(this.jewellerybaseUri + "/return", Return).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Return updated successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      },
      (error: any) => {
        console.error("Error adding Return:", error);
        this.snackBar.open("Failed to add Return. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"],
        });
      }
    );
  }


  public  getRateByPurityAndMetalToday(metalId : any, purityId : any,callback:any){
    this.httpClient.get(this.jewellerybaseUri+'/rat/metal/'+metalId+'/purity/'+purityId)
                   .subscribe((data:any)=>{
                    callback(data);
                   })
  }



  public addBankDetails( shopId  : any ,bankDetails: any,  callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/bankDetails/"+shopId, bankDetails)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Bank Details Added successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      },
      (error: any) => {
        console.error("Error adding Return:", error);
        this.snackBar.open("Failed to add Bank Details. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"],
        });
      });
  }

  public getAllBankDetails(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/bankDetails/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public updateBankDetails(bankDetailsId: any, bankDetails: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/bankDetails/" + bankDetailsId, bankDetails)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getBankDetailsById(bankDetailsId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/bankDetails/" + bankDetailsId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getAllSales(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/sales/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllLessPaidSales(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/sales/lessPaid")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addSales(Sales: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/sales", Sales)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllStock(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/stock/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addStock(Stock: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/sales", Stock)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getStock(stockId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/stock/" + stockId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
         
        }
      );
  }


  public updateStock(stockId: any, stock: any, callback: any): void {
    this.httpClient
      .put(this.jewellerybaseUri + "/stock/" + stockId, stock)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Stock updated successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error updating payment:", error);
          this.snackBar.open(
            "Failed to update Stock. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }



  public getStockByProductId(productId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/stock/product/" + productId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          
         
          callback(error.error);

        }
      );
  }

  public  getStockFromDateToDate(fromDate: any,
    toDate: string,
    callback: any){

    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/stock/FromDate/" +
          fromDate +
          "/ToDate/" +
          toDate
      )
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );

  }




  public getAllProductPurchase(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/productpurchase/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }


  public getAllProduct(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/product/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getAllProductCategory(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/category/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  

  public getCategoryProduct(categoryId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/product/category/" + categoryId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
         
        }
      );
  }

  public addProduct(product: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/product", product)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Product added successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },

      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to add Product. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }

  public getProduct(productId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/product/" + productId)
      .subscribe( 
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public updateProduct(productId: any, product: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/product/" + productId, product)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Product updated successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },

      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to update Product. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }


  
  public clearProduct(productId: any, product: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/product/" + productId, product)
      .subscribe((data: any) => {
        callback(data);
       
      },

      (error: any) => {
        callback(error.error);
       
      });
  }

  public getProductByMetal(metalId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/product/metal/" + metalId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProductByPurity(purityId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/product/purity/" + purityId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProductByCategoryByMetalByPurity(
    categoryId: any,
    metalId: any,
    purityId: any,
    callback: any
  ) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/product/category/" +
          categoryId +
          "/metal/" +
          metalId +
          "/purity/" +
          purityId
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProductByCategoryByMetal(
    categoryId: any,
    metalId: any,
    callback: any
  ) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/product/category1/" +
          categoryId +
          "/metal1/" +
          metalId
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProductByMetalByPurity(metalId: any, purityId: any, callback: any) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/product/metal1/" +
          metalId +
          "/purity/" +
          purityId
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProductByCategoryByPurity(
    categoryId: any,
    purityId: any,
    callback: any
  ) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/product/category2/" +
          categoryId +
          "/purity2/" +
          purityId
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addProductPurchase(productPurchase: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/productpurchase", productPurchase)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  // public addCompany(company : any,callback : any){
  //   this.httpClient.post(this.jewellerybaseUri+"/company",company)
  //                  .subscribe((data : any)=>{
  //                         callback(data);
  //                  })
  // }

  public addLicense(license: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/license", license)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addGender(gender: any, callback: any): void {
    this.httpClient.post(this.jewellerybaseUri + "/gender", gender).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Gender added successfully!", "Close", {
          duration: 3000, // Set the duration for the snackbar
          horizontalPosition: "right", // You can adjust the position
          verticalPosition: "top",
        });
      },
      (error: any) => {
        console.error("Error adding gender:", error);
        this.snackBar.open("Failed to add gender. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], // Optional: Add a custom CSS class for styling
        });
      }
    );
  }

  public getAllGender(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/gender/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getGender(genderId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/gender/" + genderId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public addCustomer(customer: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/customer", customer)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllCustomer(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/customer/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getCustomer(customerId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/customer/" + customerId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public updateCustomer(customerId: any, customer: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/customer/" + customerId, customer)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Customer Details updated successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },

      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to update Customer Details. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }

  public addEmployee(employee: any, callback: any): void {
    this.httpClient
      .post(this.jewellerybaseUri + "/employee", employee)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Employee added successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error adding employee:", error);
          this.snackBar.open(
            "Failed to add employee. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }


  public updateEmployee(employeeId: any, employee: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/employee/" + employeeId, employee)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Employee Details updated successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },

      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to update Employee Details. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }

  public getAllEmployee(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/employee/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getEmployee(employeeId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/employee/" + employeeId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);  
        }
      );
  }

  public addCart(cart: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/cart", cart)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllCart(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/cart/").subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public updateCart(cartId: any, cart: any, callback: any) {
   
    console.log("updateCart " + JSON.stringify(cart));
    this.httpClient
      .put(this.jewellerybaseUri + "/cart/" + cartId, cart)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Product Added to Cart successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },
      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to Add Product to Cart. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }


  public removeProductFormCart(cartId: any, cart: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/cart/" + cartId, cart)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Product Removed successfully from Cart!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },
      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to Remove Product from Cart. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }



  public clearCart(cartId: any, cart: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/cart/" + cartId, cart)
      .subscribe((data: any) => {
        callback(data);
       
      },
      (error: any) => {
        callback(error.error);
        
      });
  }


  public cartToPayment(cartId: any, cart: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/cart/" + cartId, cart)
      .subscribe((data: any) => {
        callback(data);
      
      },
      (error: any) => {
        callback(error.error);
       
      });
  }

  public getFilteredProducts(
    category: any,
    metal: any,
    purity: any,
    callback: any
  ) {
    // Add your HTTP request to fetch filtered products using query parameters
    // Example: this.http.get<Product[]>(`${this.apiUrl}/filter?category=${category}&metal=${metal}&purity=${purity}`);
    // Make sure to handle errors and return the correct API response.
    this.httpClient.get(this.jewellerybaseUri).subscribe((data: any) => {
      callback(data);
    });
  }

  productpurchase: any;
  customer: any;
  return: any;
  booking: any;
  sale: any;

  getProductPurchase(callback: any) {
    let ob = this.httpClient.get(this.jewellerybaseUri + "/productpurchase/");
    ob.subscribe(
      (value: any) => {
        callback(value);
        let productPurchase: any[] = value as any[];
        callback(productPurchase);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  getCustomerById(cb: any) {
    let ob = this.httpClient.get(this.jewellerybaseUri + "/customer/");
    ob.subscribe(
      (value) => {
        let data: any = value as any;
        cb(data);
        //  console.log(data);
      },

      (error: any) => {
        cb(error.error);
      }
    );
  }

  getReturn(cb: any) {
    let ob = this.httpClient.get(this.jewellerybaseUri + "/return/");
    ob.subscribe(
      (value: any) => {
        cb(value);
        let productPurchase: any[] = value as any[];
        cb(productPurchase);
      },

      (error: any) => {
        cb(error.error);
        
      }
    );
  }

  getBooking(cb: any) {
    let ob = this.httpClient.get(this.jewellerybaseUri + "/booking/");
    ob.subscribe(
      (value) => {
        let data: any = value as any;
        cb(data);
        //  console.log(data);
      },

      (error: any) => {
        cb(error.error);
      }
    );
  }

  getSale(cb: any) {
    let ob = this.httpClient.get(this.jewellerybaseUri + "/sales/");
    ob.subscribe(
      (value) => {
        let data: any = value as any;
        cb(data);
        //  console.log(data);
      },
      (error: any) => {
        cb(error.error);
      }
    );
  }

  openDialog(): void {
    this.dialog.open(CartComponent, {
      width: "400px",
    });
  }

  public getBookingFromDateToDate(
    fromDate: any,
    toDate: string,
    callback: any
  ) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/booking/FromDate/" +
          fromDate +
          "/ToDate/" +
          toDate
      )
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getProductPurchaseFromDateToDate(
    fromDate: any,
    toDate: any,
    callback: any
  ) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/productpurchase/FromDate/" +
          fromDate +
          "/ToDate/" +
          toDate
      )
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getSalesFromDateToDate(fromDate: any, toDate: any, callback: any) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/sales/FromDate/" +
          fromDate +
          "/ToDate/" +
          toDate
      )
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getReturnFromDateToDate(fromDate: any, toDate: any, callback: any) {
    this.httpClient
      .get(
        this.jewellerybaseUri +
          "/return/FromDate/" +
          fromDate +
          "/ToDate/" +
          toDate
      )
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  private dataArraySubject = new BehaviorSubject<any[]>([]);

  // Observable to watch for changes in the array data
  dataArray$ = this.dataArraySubject.asObservable();

  setArrayData(dataArray: any[]) {
    this.dataArraySubject.next(dataArray);
  }

  public addScheme(scheme: any, callback: any): void {
    this.httpClient.post(this.jewellerybaseUri + "/scheme", scheme).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Scheme added successfully!", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      },
      (error: any) => {
        console.error("Error adding scheme:", error);
        this.snackBar.open("Failed to add scheme. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"],
        });
      }
    );
  }

  public addSchemeCustomerReceipt(schemeCustomer: any, callback: any): void {
    this.httpClient
      .post(this.jewellerybaseUri + "/schemeCustomerReceipt", schemeCustomer)
      .subscribe(
        (data: any) => {

          if(data == null){
            this.snackBar.open(
              "Lucky No is already taken!!!. Please try again.",
              "Close",
              {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: ["snackbar-error"],
              }
            );
          }else{
            callback(data);
            this.snackBar.open(
              "Scheme customer receipt added successfully!",
              "Close",
              {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
              }
            );
          }
         
        },
        (error: any) => {
          console.error("Error adding scheme customer receipt:", error);
          this.snackBar.open(
            "Failed to add scheme customer receipt. Please try again.",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }

  public getAllSchemes(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/scheme/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeCustomers(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/schemeCustomerReceipt/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getScheme(schemeId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/scheme/" + schemeId)
      .subscribe((data: any) => {
        callback(data);
      });
  }
  public getSchemeCustomerReceiptByschemeId(schemeId:any,callback:any){
    this.httpClient.get(this.jewellerybaseUri+"/schemeCustomerReceipt/scheme/"+schemeId)
    .subscribe((data:any)=>{
      callback(data)
    })
  }

  public getSchemeCustomer(schemeCustomerRecId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/schemeCustomerReceipt/" + schemeCustomerRecId)
      .subscribe((data: any) => {
        if (data && data.customerName) { 
          callback(data);
        } else {
          console.error("Data or customerName property is undefined.");
        }
      });
  }


  public getPendingAmount(schemeCustomerRecId: any, callback: any){
    this.httpClient.get(this.jewellerybaseUri+"/schemeReceiptsPaidList/schemeCustomerRec/"+schemeCustomerRecId)
                   .subscribe((data:any)=>{
                    callback(data);
                   })
  }
  

  

  public addSchemeReceipt(schemeReceipt: any, callback: any): void {
    this.httpClient
      .post(this.jewellerybaseUri + "/schemeReceipts", schemeReceipt)
      .subscribe(
        (data: any) => {
          callback(data);
          this.snackBar.open("Scheme receipt added successfully!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        (error: any) => {
          console.error("Error adding scheme receipt:", error);
          this.snackBar.open(
            "Failed to add scheme receipt. Please try again.",
            "Close",  
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ["snackbar-error"],
            }
          );
        }
      );
  }

  public getAllSchemeReceipts(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/schemeReceipts/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeReceiptsByCustomerName(customerName: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/schemeReceipts/customer/" + customerName)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeReceiptsByScheme(schemeId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/schemeReceipts/scheme/" + schemeId)
      .subscribe((data: any) => {
        console.log(data)

        callback(data);
      });
  }

  /////////////////////////////LogIn By User/////////////////////
  public getUser(login: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/logIn1", login)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getUserByUserName(userName: any, callback: any) {
    console.log("I AM GETTING USERRRRRRRRRRRRRRRRRR")
    this.httpClient
      .get(this.jewellerybaseUri + "/user/userName/" + userName)
      .subscribe((data: any) => {
        callback(data);
      });
  }


  public getOwnerByUserName(userName: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/owner/user/phone/" + userName)
      .subscribe((data: any) => {
        callback(data);
      });
  }

 ////////////////////Adding new Jewelry to the system////////////////
//  public getCartByUser(userId:any,callback:any){
  
//   this.httpClient.get(this.jewellerybaseUri+"/cart/user/"+userId).subscribe((data:any)=>{
//    callback(data);
//  })
//  }

public getCartByUser(userId: any, callback: any) {
  this.httpClient.get(this.jewellerybaseUri+"/cart/user/"+userId)
    .pipe(
      catchError(error => {
        // Pass the error to the callback function
        callback(null, error);
        // Forward the error to the subscriber (optional)
        return throwError(error);
      })
    )
    .subscribe((data: any) => {
      // Pass the data to the callback function
      callback(data, null);
    });
}


getCartByUserAsyc(userId: any): Observable<any> {
  return this.httpClient.get(this.jewellerybaseUri + "/cart/user/" + userId)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
}

  public getuserbyId(userId: number, callback: any) {
 
      this.httpClient
        .get(this.jewellerybaseUri + "/user/" + userId)
        .subscribe(
          (data: any) => {
            callback(data);
          },

          (error: any) => {
            callback(error.error);
          }
        );
    
  }

  public addOwner(owner: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/owner", owner)
      .subscribe((data: any) => {
        callback(data);
      });
  }


  public getAllOwner(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/owner/")
                   .subscribe((data: any) => {
        callback(data);
      });
  }


  public getOwnerById(ownerId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/owner/" + ownerId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }


  public updateOwner(ownerId: any, owner: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/owner/" + ownerId, owner)
      .subscribe((data: any) => {
        callback(data);
        this.snackBar.open("Owner updated successfully!", "Close", {
          duration: 3000, 
          horizontalPosition: "right", 
          verticalPosition: "top",
        });
      },

      (error: any) => {
        callback(error.error);
        this.snackBar.open("Failed to update Owner. Please try again.", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ["snackbar-error"], 
        });
      });
  }


  public addIdForm(idForm: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/idForm", idForm)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllIdForm(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/idForm/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getschemeCustomerReceipt(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/schemeCustomerReceipt/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addShop(shop: any, callback: any) {
    this.httpClient.post(this.jewellerybaseUri + "/shop", shop).subscribe(
      (data: any) => {
        callback(data);
        this.snackBar.open("Shop added successfully", "Close", {
          duration: 3000,
        });
      },
      (error: any) => {
        console.error("Error adding shop:", error);
        this.snackBar.open("Failed to add shop. Please try again.", "Close", {
          duration: 3000,
        });
      }
    );
  }

  public getAllShop(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/shop/")
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getShopById(shopId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + "/shop/" + shopId).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public updateShop(shopId: any, shop: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + "/shop/" + shopId, shop)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  // public getClientIP() :  {
  //   return this.httpClient.get('https://api.ipify.org?format=json');
  // }

  getClientIP(): Observable<string> {
    // Specify the response type as 'text' to ensure it's treated as a string
    return this.httpClient.get("https://api.ipify.org?format=json", {
      responseType: "text",
    });
  }

  public addLogin(login: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + "/login", login)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getLoginByUser(userId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + "/login/user/" + userId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  private dataSubject = new BehaviorSubject<any>(0);
  data$ = this.dataSubject.asObservable();

  setData(newData: any) {
    this.dataSubject.next(newData);
  }

  checkSchemeNameAvailability(schemeName: string): Observable<boolean> {
    const endpoint = `${this.jewellerybaseUri}/checkSchemeNameAvailability`;
    return this.httpClient.post<boolean>(endpoint, { schemeName });
  }


  getAllSchemeReceiptsByCustomerNameAsync(customerName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const result = this.getAllSchemeReceiptsByCustomerName(customerName,(data:any)=>{
          resolve(data);
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  addProductByBooking(product: any, bookingId: any, callback:any) {
   this.httpClient.post(this.jewellerybaseUri+"/product/booking/"+bookingId,product)
   .subscribe((data:any)=>{
  callback(data)
   })
  }



  private baseUrl09 = 'http://localhost:3000'; // Your backend server URL

  shortenUrl(url: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl09}/shorten`, { url });
  }

  getLongUrl(shortCode: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl09}/${shortCode}`);
  }


  public addQuantity(quantity:any ,callback:any){

this.httpClient.post(this.jewellerybaseUri+"/addQuantity",quantity).subscribe((data:any)=>{
  callback(data)
})


  }
  public getAllQuatity( callback:any){
    this.httpClient.get(this.jewellerybaseUri + "/getAllQuantity").subscribe((data:any)=>{
      callback(data)
    })
  }




  public getByQuantityId(quantityId:any,quantity:any,callback:any){
    this.httpClient.get(this.jewellerybaseUri + "/quantity/"+quantityId,quantity).subscribe((data:any)=>{
      callback(data)
    })
  }


  public modifyByQuantity(quantityId:any,quantity:any,callback:any){
    this.httpClient.put(this.jewellerybaseUri + "/editQuantity/"+quantityId,quantity).subscribe((data:any)=>{
      callback(data)
    })
  }


}
