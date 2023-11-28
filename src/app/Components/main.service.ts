import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartComponent } from './cart/cart.component';
import { Product } from '../commons/common.objects';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUri: string = 'http://localhost:9090/asm';

  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  //  Complete company
  public getAllCompanies(callback: any) {
    this.httpClient.get(this.baseUri + '/company/').subscribe((data) => {
      callback(data);
    });
  }

  public getCompany(id: number, callback: any) {
    this.httpClient
      .get(this.baseUri + '/company/' + id)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addCompany(company: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/company', company)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/company/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public deleteCompany(id: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/company/' + id)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/company/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updateCompany(id: number, company: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + '/company/' + id, company)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/company/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }
  // Ending of company

  //complete companyEntity

  public getAllCompaniesentity(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/companyEntity/')
      .subscribe((data) => {
        callback(data);
      });
  }

  public getCompanyentity(entityId: number, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/companyEntity/' + entityId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addCompanyentity(companyEntity: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/companyEntity', companyEntity)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/companyEntity/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public deleteCompanyentity(entityId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/companyEntity/' + entityId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/companyEntity/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updateCompanyentity(
    entityId: number,
    companyEntity: any,
    callback: any
  ) {
    this.httpClient
      .put(this.baseUri + '/companyEntity/' + entityId, companyEntity)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/companyEntity/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }
  // End of companyEntity

  //  Complete Department
  public getAlldepartments(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/department/')
      .subscribe((data) => {
        callback(data);
      });
  }

  public getdepartment(departmentId: number, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/department/' + departmentId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public adddepartment(department: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/department', department)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/department/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public deletedepartment(departmentId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/department/' + departmentId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/department/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updatedepartment(
    departmentId: number,
    department: any,
    callback: any
  ) {
    this.httpClient
      .put(this.baseUri + '/department/' + departmentId, department)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/department/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public getDepartmentByEntity(entityId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + '/department/companyEntity/' + entityId)
      .subscribe((data: any) => {
        callback(data);
      });
  }
  // Ending of Department

  // Complete Employee

  getDepList(): Observable<any[]> {
    return this.httpClient.get<any>(this.baseUri + '/employee/');
  }

  public getAllemployees(callback: any) {
    this.httpClient.get(this.baseUri + '/employee').subscribe((data) => {
      callback(data);
    });
  }

  public addemployee(employee: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/employee', employee)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/employee/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  // public addemployee(employee: any, callback: any): void {
  //   const url = `${this.baseUri}/employee`;

  //   this.httpClient
  //     .post(url, { ...employee, departmentId: employee.Department })
  //     .subscribe((data: any) => {
  //       this.httpClient
  //         .get(this.baseUri + '/employee/')
  //         .subscribe((data: any) => {
  //           callback(data);
  //         });
  //     });
  // }

  public getemployee(employeeId: number, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/employee/' + employeeId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public deleteemployee(employeeId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/employee/' + employeeId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/employee')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updateemployee(employeeId: number, employee: any, callback: any) {
    this.httpClient
      .put(this.baseUri + '/employee/' + employeeId, employee)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/employee')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  //  End  of Employee

  // Complete  role
  public getAllroles(callback: any) {
    this.httpClient.get(this.baseUri + '/roles/').subscribe((data) => {
      callback(data);
    });
  }

  public getrole(roleId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + '/roles/' + roleId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addrole(roles: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/roles', roles)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + '/roles/').subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public deleterole(roleId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/roles/' + roleId)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + '/roles/').subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public updaterole(roleId: number, roles: any, callback: any) {
    this.httpClient
      .put(this.baseUri + '/roles/' + roleId, roles)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + '/roles/').subscribe((data: any) => {
          callback(data);
        });
      });
  }
  // Ending of Role

  //complete Designation

  public getAllDesignation(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/designation/')
      .subscribe((data) => {
        callback(data);
      });
  }

  public getDesignation(designationId: number, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/designation/' + designationId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addDesignation(designation: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/designation', designation)
      .subscribe((data: any) => {
        // this.httpClient
        //   .get(this.baseUri + '/designation/')
        //   .subscribe((data: any) => {
        //     callback(data);
        //   });
        callback(data);
      });
  }

  public deleteDesignation(designationId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/designation/' + designationId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/designation/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updateDesignation(
    designationId: number,
    designation: any,
    callback: any
  ) {
    this.httpClient
      .put(this.baseUri + '/designation/' + designationId, designation)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/designation/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }
  // End of Designation

  // Complete Section

  public getAllsections(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/section/')
      .subscribe((data) => {
        callback(data);
      });
  }

  public getsection(sectionId: number, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/section/' + sectionId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addsection(section: any, callback: any) {
    this.httpClient
      .post(this.baseUri + '/section', section)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/section/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public deletesection(sectionId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/section/' + sectionId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/section/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updatesection(sectionId: number, section: any, callback: any) {
    this.httpClient
      .put(this.baseUri + '/section/' + sectionId, section)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/section/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public getSectionByDepartment(departmentId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + '/section/department/' + departmentId)
      .subscribe((data: any) => {
        callback(data);
      });
  }
  // End of Section

  // Complete menu

  public getAllmenus(callback: any) {
    this.httpClient.get(this.baseUri + '/menuGroup/').subscribe((data) => {
      callback(data);
    });
  }

  public getmenu(menuGroupId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + '/menuGroup/' + menuGroupId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addmenu(menu: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/menuGroup', menu)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/menuGroup/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public deletemenu(menuGroupId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/menuGroup/' + menuGroupId)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/menuGroup/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }

  public updatemenu(menuGroupId: number, menu: any, callback: any) {
    this.httpClient
      .put(this.baseUri + '/menuGroup/' + menuGroupId, menu)
      .subscribe((data: any) => {
        this.httpClient
          .get(this.baseUri + '/menuGroup/')
          .subscribe((data: any) => {
            callback(data);
          });
      });
  }
  // End of Menu

  // Complete User
  public getAllusers(callback: any) {
    this.httpClient.get(this.baseUri + '/user/').subscribe((data) => {
      callback(data);
    });
  }

  public getuser(menuGroupId: number, callback: any) {
    this.httpClient
      .get(this.baseUri + '/user/' + menuGroupId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public adduser(user: any, callback: any) {
    this.httpClient
      .post(this.baseUri + '/user', user)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + '/user/').subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public deleteuser(menuGroupId: number, callback: any) {
    this.httpClient
      .delete(this.baseUri + '/user/' + menuGroupId)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + '/user/').subscribe((data: any) => {
          callback(data);
        });
      });
  }

  public updateuser(menuGroupId: number, user: any, callback: any) {
    this.httpClient
      .put(this.baseUri + '/user/' + menuGroupId, user)
      .subscribe((data: any) => {
        this.httpClient.get(this.baseUri + '/user/').subscribe((data: any) => {
          callback(data);
        });
      });
  }

  // End of User

  baseUri1: string = 'http://localhost:9090/Visitor';
  baseUri2: string = 'http://localhost:9090/Appointment';
  baseUri3: string = 'http://localhost:9090/Section';
  baseUri4: string = 'http://localhost:9090/Facility';
  baseUri5: string = 'http://localhost:9090/Vehicle';
  baseUri6: string = 'http://localhost:9090/User/Userexist/';
  baseUri7: string = 'http://localhost:9090/Item';
  baseUri8: string = 'http://localhost:9090/User';
  baseUri9: string = 'http://localhost:9090';
  baseUri10: string = 'http://localhost:9090/SectionVisited';
  baseUri11: string = 'http://localhost:9090/FacilityVisited';

  public addVisitor(Visitor: any, callback: any) {
    this.httpClient.post(this.baseUri1, Visitor).subscribe((data: any) => {
      console.log(data);
      callback(data);
    });
  }

  public addAppointment(Appointment: any, callback: any) {
    this.httpClient.post(this.baseUri2, Appointment).subscribe((data: any) => {
      console.log(data);
      callback(data);
    });
  }

  public addVehicle(Vehicle: any, callback: any) {
    this.httpClient.post(this.baseUri5, Vehicle).subscribe((data: any) => {
      console.log(data);
      callback(data);
    });
  }

  public addItem(Item: any, callback: any) {
    this.httpClient.post(this.baseUri7, Item).subscribe((data: any) => {
      console.log(data);
      callback(data);
    });
  }

  public getAllSection(callback: any) {
    this.httpClient.get(this.baseUri3).subscribe((data: any) => {
      callback(data);
      console.log(data);
    });
  }

  public getAllFacility(callback: any) {
    this.httpClient.get(this.baseUri4).subscribe((data: any) => {
      callback(data);
      console.log(data);
    });
  }

  public getAllUser(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/user/').subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public addTemplate(template: any, callback: any) {
    this.httpClient
      .post(this.baseUri9 + '/api/template', template)
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  public checkUserExistByUsername(User_Username: string, callback: any) {
    this.httpClient.get(this.baseUri6 + User_Username).subscribe(
      (data: any) => {
        console.log('Username exists : ' + JSON.stringify(data));
        callback(null, false, data);
      },
      (rg: any) => {
        console.log('Username data does not exist: ' + JSON.stringify(rg));
        callback(rg, true, null);
      }
    );
  }

  public getUserById(userid: number, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/user/' + userid).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getSectionById(sectionid: number, callback: any) {
    this.httpClient
      .get(this.baseUri3 + '/' + sectionid)
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  public getFacilityById(facilityid: number, callback: any) {
    this.httpClient
      .get(this.baseUri4 + '/' + facilityid)
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  public addSectionVisited(SectionVisited: any, callback: any) {
    this.httpClient
      .post(this.baseUri10, SectionVisited)
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  public addFacilityVisited(FacilityVisited: any, callback: any) {
    this.httpClient
      .post(this.baseUri11, FacilityVisited)
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  baseUri20: string = 'http://localhost:9090';
  message: string = '';

  //  Complete company
  // public fetchAllCompany(callback: any) {
  //   this.httpClient.get(this.baseUri + '/company/').subscribe((data) => {
  //     callback(data);
  //   });
  // }

  public fetchAllVisitor(callback: any) {
    this.httpClient.get(this.baseUri20 + '/Visitor').subscribe((data) => {
      callback(data);
    });
  }

  //DashboardCount
  public fetchAllVisitorCount(callback: any) {
    this.httpClient
      .get(this.baseUri20 + '/Appointmentcount')
      .subscribe((data) => {
        callback(data);
      });
  }

  public fetchcheckinVisitorCount(callback: any) {
    this.httpClient
      .get(this.baseUri20 + '/Appointmentcheckincount')
      .subscribe((data) => {
        callback(data);
      });
  }

  public fetchcheckoutVisitorCount(callback: any) {
    this.httpClient
      .get(this.baseUri20 + '/Appointmentcheckoutcount')
      .subscribe((data) => {
        callback(data);
      });
  }

  public fetchYetToVisitVisitorCount(callback: any) {
    this.httpClient
      .get(this.baseUri20 + '/Appointmentyettovisitcount')
      .subscribe((data) => {
        callback(data);
      });
  }

  public getImageFromServer(imageUrl: string) {
    // Replace 'your-java-server-url' with the actual URL of your Java server's endpoint
    return this.httpClient.get(
      'http://localhost:5050/ams/downloadImage/' + imageUrl,
      { params: { imageUrl }, responseType: 'arraybuffer' }
    );
  }

  getImage(appointment_id: any): Observable<any> {
    const headers = new HttpHeaders(); // Add any required headers here

    return this.httpClient
      .get('http://localhost:9090/qr/qrcode/' + appointment_id, {
        headers,
        responseType: 'blob',
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
    formData.append('pdfFile', pdfBlob, 'pdf_filename.pdf');

    return this.httpClient.post<any>(
      'http://localhost:9090/ams/upload-pdf/' + visitor_id,
      formData
    );
  }

  downloadPdf(pdfUrl: string): Observable<Blob> {
    return this.httpClient.get(
      'http://localhost:9090/ams/downloadImage/' + pdfUrl,
      { responseType: 'blob' }
    );
  }

  jewellerybaseUri: string = 'http://localhost:5050/jewellery';

  public getAllMetals(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/metal/')
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  public addMetal(metal: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/metal', metal)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getMetal(metalId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/metal/' + metalId).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public updateMetal(metalId: any, metal: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + '/metal/' + metalId, metal)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllPurity(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/purity/')
      .subscribe((data: any) => {
        console.log(data);
        callback(data);
      });
  }

  public addPurity(purity: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/purity', purity)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getPurity(purityId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/purity/' + purityId)
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
      .put(this.jewellerybaseUri + '/purity/' + purityId, purity)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllBill(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/bill/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addBill(bill: any, callback: any) {
    this.httpClient.post(this.jewellerybaseUri + '/bill', bill).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getAllBooking(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/booking/').subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public getBill(billId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/bill/' + billId).subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public findAllBooking(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/booking/getall/').subscribe(
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
      .get(this.jewellerybaseUri + '/booking/' + bookingId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public addBooking(booking: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/booking', booking)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public updateBooking(bookingId: any, booking: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + '/booking/' + bookingId, booking)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllCategory(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/category/').subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public addCategory(category: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/category', category)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getCategory(categoryId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/category/' + categoryId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getAllModeOfPayment(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/modeOfPayment/').subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
  }

  public addModeOfPayment(modeOfPayment: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/modeOfPayment', modeOfPayment)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllPayment(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/payment/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getPaymentByBookingId(bookingId: any, payment: any, callback: any) {
    console.log(payment);
    this.httpClient
      .post(this.jewellerybaseUri + '/payment/booking/' + bookingId, payment)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public addPayment(Payment: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/Payment', Payment)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public updatePayment(paymentId: any, payment: any, callback: any) {
    this.httpClient
      .put(this.jewellerybaseUri + '/payment/' + paymentId, payment)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getModeOfPayment(modeOfPaymentId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/modeOfPayment/' + modeOfPaymentId)
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
    this.httpClient.get(this.jewellerybaseUri + '/rate/').subscribe(
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
      .post(this.jewellerybaseUri + '/rate', rate)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getRate(rateId: any, callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/rate/' + rateId).subscribe(
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
        this.jewellerybaseUri + '/rate/metal/' + metalId + '/purity/' + purityId
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
      .get(this.jewellerybaseUri + '/rate/metal/' + metalId)
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
      .get(this.jewellerybaseUri + '/rate/today')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllReturn(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/return/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addReturn(Return: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/return', Return)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSales(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/sales/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllLessPaidSales(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/sales/lessPaid')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addSales(Sales: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/sales', Sales)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllStock(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/stock/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addStock(Stock: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/sales', Stock)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllProduct(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/product/').subscribe(
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
      .get(this.jewellerybaseUri + '/product/category/' + categoryId)
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
      .post(this.jewellerybaseUri + '/product', product)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProduct(productId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/product/' + productId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public getProductByMetal(metalId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/product/metal/' + metalId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getProductByPurity(purityId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/product/purity/' + purityId)
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
          '/product/category/' +
          categoryId +
          '/metal/' +
          metalId +
          '/purity/' +
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
          '/product/category1/' +
          categoryId +
          '/metal1/' +
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
          '/product/metal1/' +
          metalId +
          '/purity/' +
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
          '/product/category2/' +
          categoryId +
          '/purity2/' +
          purityId
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addProductPurchase(productPurchase: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/productpurchase', productPurchase)
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
      .post(this.jewellerybaseUri + '/license', license)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addGender(gender : any,callback : any){
     this.httpClient.post(this.jewellerybaseUri+"/gender",gender)
                    .subscribe((data : any)=>{
                        callback(data);
                    })
  }

  public getAllGender(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/gender/').subscribe(
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
      .get(this.jewellerybaseUri + '/gender/' + genderId)
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
      .post(this.jewellerybaseUri + '/customer', customer)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllCustomer(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/customer/').subscribe(
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
      .get(this.jewellerybaseUri + '/customer/' + customerId)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
  }

  public addEmployee(employee: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/employee', employee)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllEmployee(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/employee/').subscribe(
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
      .get(this.jewellerybaseUri + '/employee/' + employeeId)
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
      .post(this.jewellerybaseUri + '/cart', cart)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllCart(callback: any) {
    this.httpClient.get(this.jewellerybaseUri + '/cart/').subscribe(
      (data: any) => {
        callback(data);
      },

      (error: any) => {
        callback(error.error);
      }
    );
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
    let ob = this.httpClient.get(this.jewellerybaseUri + '/productpurchase/');
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
    let ob = this.httpClient.get(this.jewellerybaseUri + '/customer/');
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
    let ob = this.httpClient.get(this.jewellerybaseUri + '/return/');
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
    let ob = this.httpClient.get(this.jewellerybaseUri + '/booking/');
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
    let ob = this.httpClient.get(this.jewellerybaseUri + '/sales/');
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
      width: '400px', // Set the width and other dialog options as needed
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
          '/booking/FromDate/' +
          fromDate +
          '/ToDate/' +
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
          '/productpurchase/FromDate/' +
          fromDate +
          '/ToDate/' +
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
          '/sales/FromDate/' +
          fromDate +
          '/ToDate/' +
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
          '/return/FromDate/' +
          fromDate +
          '/ToDate/' +
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

  public addScheme(scheme: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/scheme', scheme)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addSchemeCustomerReceipt(schemeCustomer: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/schemeCustomerReceipt', schemeCustomer)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemes(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/scheme/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeCustomers(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/schemeCustomerReceipt/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getScheme(schemeId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/scheme/' + schemeId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getSchemeCustomer(schemeCustomerRecId: any, callback: any) {
    this.httpClient
      .get(
        this.jewellerybaseUri + '/schemeCustomerReceipt/' + schemeCustomerRecId
      )
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public addSchemeReceipt(schemeReceipt: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/schemeReceipts', schemeReceipt)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeReceipts(callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/schemeReceipts/')
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeReceiptsByCustomerName(customerName: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/schemeReceipts/customer/' + customerName)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getAllSchemeReceiptsByScheme(schemeId: any, callback: any) {
    this.httpClient
      .get(this.jewellerybaseUri + '/schemeReceipts/scheme/' + schemeId)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  /////////////////////////////LogIn By User/////////////////////
  public getUser(login: any, callback: any) {
    this.httpClient
      .post(this.jewellerybaseUri + '/logIn1', login)
      .subscribe((data: any) => {
        callback(data);
      });
  }

  public getUserByUserName(userName : any,callback : any){
     this.httpClient.get(this.jewellerybaseUri+"/user/userName/"+userName)
                    .subscribe((data : any)=>{
                        callback(data);
                    })
  }
  public getuserbyId(userId: any, callback: any) {
    console.log(userId);
    const numbers = userId.match(/\d+(\.\d+)?/);

    if (numbers !== null) {
      // The `numbers` variable contains an array of matched numbers
      const extractedNumber = parseFloat(numbers[0]);
      console.log(extractedNumber);
      this.httpClient
      .get(this.jewellerybaseUri+'/user/'+extractedNumber)
      .subscribe(
        (data: any) => {
          callback(data);
        },

        (error: any) => {
          callback(error.error);
        }
      );
    }
    
  }

  public addOwner(owner : any,callback : any){
     this.httpClient.post(this.jewellerybaseUri+"/owner",owner)
                    .subscribe((data : any)=>{
                        callback(data);
                    })
  }

  public addIdForm(idForm :any,callback:any){
     this.httpClient.post(this.jewellerybaseUri+"/idForm",idForm)
                    .subscribe((data : any)=>{
                       callback(data);
                    })
  }

  public getAllIdForm(callback : any){
      this.httpClient.get(this.jewellerybaseUri+"/idForm/")
                     .subscribe((data : any)=>{
                        callback(data);
                     })
  }

  public addShop(shop : any,callback : any){
     this.httpClient.post(this.jewellerybaseUri+"/shop",shop)
                    .subscribe((data : any)=>{
                       callback(data);
                    })
  }

  // public getClientIP() :  {
  //   return this.httpClient.get('https://api.ipify.org?format=json');
  // }

  getClientIP(): Observable<string> {
    // Specify the response type as 'text' to ensure it's treated as a string
    return this.httpClient.get('https://api.ipify.org?format=json', { responseType: 'text' });
  }

  public addLogin(login : any,callback : any){
      this.httpClient.post(this.jewellerybaseUri+"/login",login)
                     .subscribe((data : any)=>{
                        callback(data);
                     })
  }

  public getLoginByUser(userId : any,callback : any){
     this.httpClient.get(this.jewellerybaseUri+"/login/user/"+userId)
                    .subscribe((data : any)=>{
                        callback(data);
                    })
  }

  private dataSubject = new BehaviorSubject<any>(0);
data$ = this.dataSubject.asObservable();

setData(newData: any) {
  this.dataSubject.next(newData);
}

  





  public isAuthenticated(): boolean {
    // Check if the user is logged in by verifying if there is a token in local storage
    return localStorage.getItem('token') !== null;
  }

  public logout(){
    localStorage.clear();
  }
}
