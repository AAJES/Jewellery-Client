import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { ProductPurchase } from "src/app/commons/common.objects";
import { Router } from "@angular/router";

@Component({
  selector: "app-productpurchase",
  templateUrl: "./productpurchase.component.html",
  styleUrls: ["./productpurchase.component.css"],
})
export class ProductpurchaseComponent implements OnInit {
  productPurchase: ProductPurchase = {
    productPurchaseId: 0,
    totalWeight: 0,
    amountPaid: 0,
    status: '',
    quantity: 0,
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
      metal: {
        metalId: 0,
        metalName: "",
      },
      purity: {
        purityId: 0,
        purityName: "",
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
      category: {
        categoryId: 0,
        categoryName: "",
        activeStatus: false,
        categoryImage: "",
      },
      stone: 0,
      labour: 0,
      processing: 0,
      stoneWeight: 0
    },

    employee: {
      employeeId: 0,
      employeeName: "",
      age: 0,
      phoneNumber: "",
      address: "",
      gender: {
        genderId: 0,
        gender: "",
      },
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
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
  };

  products: any;
  employees: any;
  loginUserID: any;

  constructor(private service: MainService,private router:Router) {
    this.service.getAllProduct((data: any) => {
      this.products = data;
    });

    this.service.getAllEmployee((data: any) => {
      this.employees = data;
    });
  }

  ngOnInit(): void {
    let username = window.sessionStorage.getItem("userName");
    this.service.getUserByUserName(username, (data: any) => {
      console.log(data);
      this.loginUserID = data.userId;
      this.productPurchase.user = data;
      this.service.getLoginByUser(this.loginUserID, (data: any) => {
        console.log(data);

        this.productPurchase.login = data;
      });
    });
  }

  selectedEmployee(selectedEmployee: any) {
    this.service.getEmployee(selectedEmployee, (employeeData: any) => {
      this.productPurchase.employee = employeeData;
    })
  }

  selectedProduct(selectedProduct: any) {
    this.service.getProduct(selectedProduct, (data: any) => {
      this.productPurchase.product = data;
    })
  }
  onSubmit() {
    console.log(this.productPurchase);

    this.service.addProductPurchase(this.productPurchase, (data: any) => {  
      console.log('Successfully added product purchase'+JSON.stringify(data));
      this.router.navigate(['/productPurchaseall'])
      //window.location.reload();
    })
  }
}
  

