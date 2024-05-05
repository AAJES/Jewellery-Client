import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MainService } from "../../main.service";
import { Stock, user } from "src/app/commons/common.objects";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.css"],
})
export class StockComponent implements OnInit {
  metals: any[] = [];
  categories: any[] = [];
  purities: any[] = [];
  products: any[] = [];
  id: number = 0;
  stock: Stock = {
    stockId: 0,
    minQty: 0,
    stockQtyInHand: 0,
    totalStock: 0,
    count: 0,
    product: {
      productId: 0,
      quantity: {
        quantityId: 0,
        quantity: 0,
      },
      productName: "",
      weightage: 0,
      wastage: 0,
      comment: "",
      totalRate: 0,
      trDate: "",
      trTime: {
        hours: 0,
        minutes: 0,
      },
      description: "",
      purity: {
        purityId: 0,
        purityName: "",
      },
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
      rate: {
        rateId: 0,
        trDate: "",
        trTime: {
          hours: 0,
          minutes: 0,
        },
        activeStatus: false,
        ratePerGram: 0,
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
      },
      productImage: "",
      stone: 0,
      labour: 0,
      processing: 0,
      stoneWeight: 0
    },
    trDate: "",
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

  user: user = {
    userId: 0,
    userName: "",
    password: "",
    role: [],
  };

  metal: any = {};
  category: any = {};
  purity: any = {};
  userId: any;
  idForms: any[] = [];
  stockId: any = 0;

  constructor(
    private httpClient: HttpClient,
    private service: MainService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.getAllMetals((data: any) => {
      this.metals = data;
    });

    this.service.getAllPurity((data: any) => {
      this.purities = data;
    });

    this.service.getAllCategory((data: any) => {
      this.categories = data;
    });

    this.service.getAllProduct((data: any) => {
      this.products = data;
    });

    this.service.getAllIdForm((data: any) => {
      this.idForms = data;
      this.service.getuserbyId(data[data.length - 1].id, (data: any) => {
        console.log(data);
        this.user = data;
      });
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stockId = params.get("data");
      //this.updateCompanyProcess(this.entity_id);
      if (this.stockId == undefined) {
      } else {
        this.service.getStock(this.stockId, (data: any) => {
          this.stock = data;
        });
      }
    });
  }
  // ngOnInit(){
  //   const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
  //   console.log(sessionData);
  //   this.userId = sessionData.userId;
  //   this.service.getuserbyId(sessionData.userId,(data : any)=>{
  //      console.log(data);
  //      this.user = data;
  //   })
  // }

  stockform = new FormGroup({
    minQty: new FormControl("", [Validators.required]),
    stockQtyInHand: new FormControl("", [Validators.required]),
    totalStock: new FormControl("", [Validators.required]),
    count: new FormControl("", [Validators.required]),
  });

  public get minQty(): FormControl {
    return this.stockform.controls.minQty.get("minQty") as FormControl;
  }

  public get stockQtyInHand(): FormControl {
    return this.stockform.controls.stockQtyInHand.get(
      "stockQtyInHand"
    ) as FormControl;
  }

  public get totalStock(): FormControl {
    return this.stockform.controls.totalStock.get("totalStock") as FormControl;
  }

  public get count(): FormControl {
    return this.stockform.controls.count.get("count") as FormControl;
  }

  formProductPurchase = new FormArray<FormControl>([]);

  public getProductName(obj: any): string {
    let id: number = obj.id;
    let ret1: string = "";
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productId == id) {
        ret1 = this.products[i].productName;
        break;
      }
    }
    return ret1;
  }

  productArr: any[] = [];

  public onAddProduct(product: HTMLSelectElement) {
    this.formProductPurchase.push(new FormControl({ id: product.value }));
    for (let val of product.value) {
      let pp: any = {
        productPurchaseId: 0,
        trDate: "",
        trTime: "",
        totalWeight: 0,
        amountPaid: 0,
        count: 0,
        product: val,
        user: {
          userId: this.user.userId,
          username: "",
          email: "",
          phone1: "",
          phone2: "",
          password: "",
        },
      };
    }
  }

  public onSubmit() {
    console.log(this.stock);
    this.service.updateStock(this.stockId, this.stock, (data: any) => {
      this.router.navigate(["/stockall"]);
    });
  }
}
