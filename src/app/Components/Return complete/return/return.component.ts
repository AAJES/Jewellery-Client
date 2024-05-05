import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Return } from "src/app/commons/common.objects";
import { MainService } from "../../main.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-return",
  templateUrl: "./return.component.html",
  styleUrls: ["./return.component.css"],
})
export class ReturnComponent implements OnInit {
  metals: any[] = [];
  rates: any[] = [];
  purities: any[] = [];
  categories: any[] = [];
  users: any[] = [];
  idForms: any[] = [];
  loginUserID: any;
  metalVariation: number = 0;
  purityVariation: number = 0;

  constructor(private httpClient: HttpClient,
     private service: MainService,
     private router:Router) {
    this.service.getAllMetals((data: any) => {
      this.metals = data;
    });

    this.service.getRateToday((data: any) => {
      this.rates = data;
      console.log(this.rates);
    });

    this.service.getAllPurity((data: any) => {
      this.purities = data;
    });

    this.service.getAllCategory((data: any) => {
      this.categories = data;
    });

    //   this.service.getAllIdForm((data : any)=>{
    //     this.idForms = data;
    //     this.service.getuserbyId(data[data.length-1].id,(data : any)=>{
    //       console.log(data);
    //       this.return.user = data;
    //   })
    // })
  }

  ngOnInit(): void {
    let username = window.sessionStorage.getItem("userName");
    this.service.getUserByUserName(username, (data: any) => {
      console.log(data);
      this.loginUserID = data.userId;
      this.return.user = data;
      this.service.getLoginByUser(this.loginUserID, (data: any) => {
        console.log(data);

        this.return.login = data;
      });
    });
  }

  userId: any = 0;

  return: Return = {
    returnId: 0,
    wastage: 0,
    grossWeight: 0,
    netWeight: 0,
    description: "",
    returnAmount: 0,
    category: {
      categoryId: 0,
      categoryName: "",
      activeStatus: false,
      categoryImage: "",
    },
    metal: {
      metalId: 0,
      metalName: "",
    },
    purity: {
      purityId: 0,
      purityName: "",
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    login: {
      loginId: 0,
      systemDetails: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
  };

  returnform = new FormGroup({
    wastage: new FormControl("", [Validators.required]),
    grossWeight: new FormControl("", [Validators.required]),
    netWeight: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    returnAmount: new FormControl("", [Validators.required]),
  });

  public get wastage(): FormControl {
    return this.returnform.controls.wastage.get("wastage") as FormControl;
  }

  public get grossWeight(): FormControl {
    return this.returnform.controls.grossWeight.get(
      "grossWeight"
    ) as FormControl;
  }

  public get netWeight(): FormControl {
    return this.returnform.controls.netWeight.get("netWeight") as FormControl;
  }

  public get description(): FormControl {
    return this.returnform.controls.description.get(
      "description"
    ) as FormControl;
  }

  public get returnAmount(): FormControl {
    return this.returnform.controls.returnAmount.get(
      "returnAmount"
    ) as FormControl;
  }

  public netWeight1() {
    this.return.netWeight = this.return.grossWeight - this.return.wastage;
  }

  public onAddMetal(metalId: any) {
    console.log("Entity selected : " + metalId);
    let eid = parseInt(metalId);
    this.service.getMetal(eid, (data: any) => {
      console.log(data);
      this.return.metal = data;
    });
  }

  public onAddPurity(purityId: any) {
    console.log("Entity selected : " + purityId);
    let eid = parseInt(purityId);
    //  this.httpClient.get("http://localhost:5050/purity/"+purityId)
    //                 .subscribe((data : any)=>{
    //                      this.return.purity = data;
    //                 })

    this.service.getPurity(eid, (data: any) => {
      console.log(data);
      this.return.purity = data;
    });
  }

  

  public onAddUser(userId: any) {
    // console.log("Entity selected : "+entityId)
    // let eid = parseInt(entityId);
    this.httpClient
      .get("http://localhost:5050/user/" + userId)
      .subscribe((data: any) => {
        this.return.user = data;
      });
  }

  totalPrice: any;
  public isPurityDisabled: boolean = false;

  public calculateReturnAmount() {
    const grossWeight = parseFloat(this.return.grossWeight.toString()) || 0;
    const wastage = parseFloat(this.return.wastage.toString()) || 0;

    this.metalVariation = this.return.metal?.metalId;
    this.purityVariation = this.return.purity?.purityId;

    if (this.metalVariation && this.purityVariation) {
      this.service.getMetal(this.metalVariation, (metalData: any) => {
        this.return.metal = metalData;
        if (this.return.metal.metalName.toLowerCase() === "silver") {
          this.isPurityDisabled = true;
          this.purityVariation = 0;
          this.return.purity = {
            purityId: 0,
            purityName: "",
          };
          this.totalPrice = this.getMetalPrice(this.return.metal.metalName);
          console.log(this.totalPrice);
          const calculatedReturnAmount = (grossWeight - wastage) * this.totalPrice;
          this.return.returnAmount = calculatedReturnAmount;
        }

        if (this.return.metal.metalName.toLowerCase() === "gold") {
          this.isPurityDisabled = false;
          this.service.getPurity(this.purityVariation, (purityData: any) => {
            this.return.purity = purityData;
            this.totalPrice = this.getPurityPrice(
              this.return.purity.purityName
            );

            const calculatedReturnAmount =
              (grossWeight - wastage) * this.totalPrice;
            this.return.returnAmount = calculatedReturnAmount;
          });
          this.totalPrice = this.getMetalPrice(this.return.metal.metalName);
        }
      });
    } else if (this.metalVariation) {
      console.log(this.metalVariation);
      this.service.getMetal(this.metalVariation, (metalData: any) => {
        this.return.metal = metalData;
        const lowerCaseVariation = this.return.metal.metalName.toLowerCase();

        if (this.return.metal.metalName.toLowerCase() === "gold") {
          this.isPurityDisabled = false;
        }

        if (lowerCaseVariation === "silver") {
          this.totalPrice = this.getMetalPrice(this.return.metal.metalName);

          // If metal is changed to silver, reset purity-related fields
          this.return.purity = {
            purityId: 0,
            purityName: "",
          };
          this.isPurityDisabled = true;
        }

        const calculatedReturnAmount =
          (grossWeight - wastage) * this.totalPrice;
        this.return.returnAmount = calculatedReturnAmount;
      });
    } else {
      console.log("Metal or purity not selected");
    }
  }

  public onMetalChange() {
    if (this.return.metal.metalName.toLowerCase() === "silver") {
      this.isPurityDisabled = true;
    }
    console.log("lolol", this.isPurityDisabled);
    if (this.isPurityDisabled) {
      this.return.purity = {
        purityId: 0,
        purityName: "",
      };
    }
  }

  private getMetalPrice(variation: string): number {
    const metalRate = this.rates.find(
      (rate) => rate.metal.metalName === variation
    );
    console.log(metalRate);

    return metalRate ? metalRate.ratePerGram : 0;
  }

  private getPurityPrice(variation: string): number {
    const lowerCaseVariation = variation.toLowerCase();
    console.log(lowerCaseVariation);

    // Find the rate with matching purityName (case-insensitive)
    const purityRate = this.rates.find(
      (rate) =>
        rate.purity &&
        rate.purity.purityName.toLowerCase() === lowerCaseVariation
    );

    console.log(purityRate);

    // Return the ratePerGram if found, otherwise default to 1
    return purityRate ? purityRate.ratePerGram : 0;
  }

  public reset() {
    this.return.grossWeight = 0;
    this.return.netWeight = 0;
    this.return.wastage = 0;
    this.return.returnAmount = 0;
    this.return.description = "";
    this.return.category = {
      categoryId: 0,
      categoryName: "",
      activeStatus: false,
      categoryImage: "",
    };
    this.return.metal = {
      metalId: 0,
      metalName: "",
    };
    this.return.purity = {
      purityId: 0,
      purityName: "",
    };
  }


  public onCategory(){
    console.log("Entity selected : " + this.return.category.categoryId);
    this.service.getCategory(this.return.category.categoryId, (data: any) => {
      console.log(data);
      this.return.category = data;
    });
  }

  

  public onSubmit() {
    // this.return.wastage = this.wastage.value;
    // this.return.netWeight = this.netWeight.value;
    // this.return.grossWeight = this.grossWeight.value;
    // this.return.description = this.description.value;
    // this.return.returnAmount = this.returnAmount.value;

    // this.httpClient.post("http://localhost:5050/return",this.return)
    //                .subscribe((data : any)=>{
    //                   console.log(data);
    //                })


    console.log(this.return)

    this.service.addReturn(this.return, (data: any) => {
      console.log(data);
      this.router.navigate(['/allreturn'])
    });
  }
}
