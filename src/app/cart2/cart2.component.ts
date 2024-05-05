import { Component } from "@angular/core";
import { CartserviceService } from "../cartservice.service";
import { MainService } from "../Components/main.service";
import { Booking, Cart, Payment } from "../commons/common.objects";
import { Router } from "@angular/router";
import { ConstantPool } from "@angular/compiler";
import { catchError, forkJoin, of } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-cart2",
  templateUrl: "./cart2.component.html",
  styleUrls: ["./cart2.component.css"],
})
export class Cart2Component {
  total = 0;
  rates: any[] = [];
  item: any = {
    productId: 0,
    productName: "",
    productImage: "",
    description: "",
    price: 0,
    quantity: 0,
    weightage: "",
    metal: {},
    purity: {},
  };
  rate1: any = 0;
  rate2: any = 0;
  rate3: any = 0;
  newRates: any[] = [];
  

  cart: Cart = {
    cartId: 0,
    totalCost: 0,
    quantity: 0,
    trDate: "",
    trTime: {
      hours: 0,
      minutes: 0,
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    products: [],
    booking: {
      bookingId: 0,
      minAmount: 0,
      deliveryDate: "",
      bookingDate: "",
      advanceAmount: 0,
      customer: {
        customerId: 0,
        customerName: "",
        gender: {
          genderId: 0,
          gender: "",
        },
        phone1: "",
        phone2: "",
        email: "",
        location: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
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
      catalog: "",
      metal: {
        metalId: 0,
        metalName: "",
      },
      purity: {
        purityId: 0,
        purityName: "",
      },
      weight: 0,
      image: "",
      status: "",
      deductAmount: 0,
      refundAmount: 0,
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
      cancelDate: "",
      description: "",
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
      quantity: "",
      category: {
        categoryId: 0,
        categoryName: "",
        activeStatus: false,
        categoryImage: ""
      },
      modeOfAdvance: "",
      oldMetalWeight: 0
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


  payment: Payment = {
    paymentId: 0,
    amountPaid: 0,
    totalWeight: 0,
    trDate: "",
    trTime: {
      hours: 0,
      minutes: 0,
    },
    products: [],
    modeOfPayment: {
      modeofPaymentId: 0,
      modeOfPayment: "",
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    discountAmount: 0,
    totalAmount: 0,
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
    customer: {
      customerId: 0,
      customerName: "",
      gender: {
        genderId: 0,
        gender: ""
      },
      phone1: "",
      phone2: "",
      email: "",
      location: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: []
      }
    },
    bankDetails: {
      bankDetailsId: 0,
      ifsccode: "",
      accountNo: "",
      accountHolderName: "",
      branch: "",
      branchAddress: "",
      qrCode: "",
      description: "",
      active: false
    }
  };

  user: any;
  productArr: any[] = [];
  grandTotal: number=0;
  items: any[] = [];
  isCartEmpty: boolean = true;
  userId: any=0;
  count:number=0;

  customer1:any= {
    customerId: 1,
    customerName: "",
    gender: {
      genderId: 0,
      gender: "",
    }
  } 

  constructor(
    private cartService: CartserviceService,
    private service: MainService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {
   

    let username = window.sessionStorage.getItem("userName");

    this.service.getUserByUserName(username, (data: any) => {
      this.user = data;
      this.service.getCartByUser(this.user.userId, (data: any) => {
        this.cart = data;
        if(this.cart.products.length != 0){
          this.isCartEmpty = false;
        }
        this.service.getRateToday((data: any) => {
          this.rates = data;
          for (let i = 0; i < this.rates.length; i++) {
            if (
              this.rates[i].metal.metalName.toLowerCase() == "gold" &&
              this.rates[i].purity.purityName.toLowerCase() == "22k"
            ) {
              this.rate1 = this.rates[i].ratePerGram;
              this.newRates.push(this.rates[i].ratePerGram);
              // this.date = this.rates[i].trDate;
              // this.date = this.date.substring(0,10);
            } else if (
              this.rates[i].metal.metalName.toLowerCase() == "gold" &&
              this.rates[i].purity.purityName.toLowerCase() == "18k"
            ) {
              this.rate2 = this.rates[i].ratePerGram;
              this.newRates.push(this.rates[i].ratePerGram);
            } else if (
              this.rates[i].metal.metalName.toLowerCase() == "silver"
            ) {
              this.rate3 = this.rates[i].ratePerGram;
              this.newRates.push(this.rates[i].ratePerGram);
              this.getItems();
            }
          }
        });
      });
    });
  }

 
 
 

  public getItems() {
    for (let i = 0; i < this.cart.products.length; i++) {
      console.log(this.cart.products[i]);
      let item: {
        productId?: number;
        productName?: string;
        productImage?: string;
        description?: string;
        weightage?: number;
        metal?: any;
        purity?: any;
        price?: number;
        quantity?: {
          quantityId:number;
          quantity:number;
        };
      } = {};
      item.productId = this.cart.products[i].productId;
      item.productName = this.cart.products[i].productName;
      item.productImage = this.cart.products[i].productImage;
      item.description = this.cart.products[i].description;
      item.weightage = this.cart.products[i].weightage;
      item.metal = this.cart.products[i].metal;
      item.purity = this.cart.products[i].purity;
      item.quantity = this.cart.products[i].quantity;

      if (this.cart.products[i].metal.metalName.toLowerCase() == "gold") {
        if (this.cart.products[i].purity.purityName.toLowerCase() == "22k") {
          item.price = this.cart.products[i].weightage * this.newRates[0];
        } else if (
          this.cart.products[i].purity.purityName.toLowerCase() == "18k"
        ) {
          item.price = this.cart.products[i].weightage * this.newRates[1];
        }
      } else if (
        this.cart.products[i].metal.metalName.toLowerCase() == "silver"
      ) {
        item.price = this.cart.products[i].weightage * this.newRates[2];
      }

      
      this.items.push(item);
    }
    this.calculateTotal();
    this.getProductImages();
  }


  increaseQuantity(item: any) {
   
    this.service.getStockByProductId(item.productId, (stockData: any) => {
      console.log(stockData);

      if(stockData.stockQtyInHand !== 0  && stockData.stockQtyInHand > item.quantity.quantity){
        item.quantity.quantity++; 
        for (let i = 0; i < this.cart.products.length; i++) {
          // Check if the current product matches the item we are looking for
          if (this.cart.products[i].productId === item.productId) {
  
            
              // Update the quantity of the item in the cart
              this.cart.products[i].quantity.quantity =  item.quantity.quantity ;
  
              this.service.modifyByQuantity(this.cart.products[i].quantity.quantityId, this.cart.products[i].quantity,(data : any)=>{
  
              });
              // Log the quantity of the item
              // Exit the loop since we found the item
              break;
          }
      }
      }else {
          
        this.snackbar.open('Product is limited in stock only '+stockData.stockQtyInHand+'left', 'Close', {
            duration: 3000, 
            horizontalPosition: "right", 
            verticalPosition: "top",
        });
    }
    })
    
    
}


  

  decreaseQuantity(item :any) {
    if (item.quantity.quantity > 1) {
      item.quantity.quantity--; // Increase the quantity of the item
      
      // Loop through the products in the cart
      for (let i = 0; i < this.cart.products.length; i++) {
          // Check if the current product matches the item we are looking for
          if (this.cart.products[i].productId === item.productId) {
  
            
              // Update the quantity of the item in the cart
              this.cart.products[i].quantity.quantity =  item.quantity.quantity ;
  
              this.service.modifyByQuantity(this.cart.products[i].quantity.quantityId, this.cart.products[i].quantity,(data : any)=>{
  
              });
              // Log the quantity of the item
              // Exit the loop since we found the item
              break;
          }
      }
    

     
    }



  }

  getProductImages() {
    this.productArr = [];
    for (let i = 0; i < this.items.length; i++) {
      const productDemo = {
        product: this.items[i],
      };

      this.service.getImageFromServer(this.items[i].productImage).subscribe(
        (imageData: ArrayBuffer) => {
          const imageBlob = new Blob([imageData], { type: "image/jpeg" });
          productDemo.product.productImage = URL.createObjectURL(imageBlob);

          this.productArr.push(productDemo);
        },
        (error) => {
          console.error("Error fetching image:", error);
        }
      );
    }
  }

  

  public removeItem(productId: any) {
    // Find the index of the product with the specified productId
    const index = this.cart.products.findIndex(product => product.productId === productId);

    if (index !== -1) {
        // Remove the product from the array
        this.cart.products.splice(index, 1);

        // Update the cart with the modified products array
        const username = window.sessionStorage.getItem("userName");

        if (!username) {
            console.error("Username not found in session storage.");
            return;
        }

        this.service.getUserByUserName(username, (userData: any) => {
            if (!userData || !userData.userId) {
                console.error("User data not found or incomplete.");
                return;
            }

            const userId = userData.userId;
            this.userId = userId;

            this.service.getCartByUser(userId, (cartData: any) => {
                if (cartData !== null) {
                    this.cart = cartData;
                    this.cart.products = this.cart.products.filter(product => product.productId !== productId);
                   
                    this.service.removeProductFormCart(this.cart.cartId, this.cart, () => {
                         window.location.reload();
                       

                    });
                }
            });
        });
    } else {
        console.log(`Product with productId ${productId} not found in the cart.`);
    }
}


  

  public calculateTotal() {
    for (let i = 0; i < this.items.length; i++) {
      this.total = this.total + this.items[i].price * this.items[i].quantity;
    }
  }

  public calculateGrandTotal() {
    let grandTotal = 0;
    for (let i = 0; i < this.items.length; i++) {
      grandTotal += this.items[i].price * this.items[i].quantity.quantity;
    }
    this.grandTotal = grandTotal;
    return grandTotal;
  }


  calculateTotalWeight() {
    const totalWeight = this.payment.products.reduce(
      (total, product) => total + product.weightage,
      0
    );
    this.payment.totalWeight = parseFloat(totalWeight.toFixed(2));
  }

 

  public proceedToPayment() {
    
    console.log(this.cart)
    this.cart.totalCost = this.grandTotal;  
    this.service.cartToPayment(this.cart.cartId, this.cart, (data:any) => {
      this.payment.totalAmount = data.totalCost;
      this.payment.products = data.products;
      this.payment.user = data.user;
      this.payment.login = data.login;
      this.calculateTotalWeight();
      console.log("proceed to payment");
this.payment.customer=this.customer1;
      console.log(this.payment);
      this.payment;
      console.log("proceed to payment");
      this.service.addPayment(this.payment,(data:any)=>{

        this.router.navigate(['/payment',{paymentId: data.paymentId}]);
      })
  });
    
  }
}
