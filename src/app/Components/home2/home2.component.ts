import { Component, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "src/app/login/login.component";
import { MainService } from "../main.service";
import { ActivatedRoute } from "@angular/router";
import { Cart, Product } from "src/app/commons/common.objects";
import { CartserviceService } from "src/app/cartservice.service";
import { Subject, takeUntil } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home2",
  templateUrl: "./home2.component.html",
  styleUrls: ["./home2.component.css"],
})
export class Home2Component implements OnDestroy {
  products: any[] = [];
  rates: any[] = [];
  rate1: string = "";
  rate2: string = "";
  date: string = "";
  imageSrc: string = "";
  productArr: any[] = [];
  uniqueCategories: string[] = [];
  categorizedProducts: { category: string; products: Product[] }[] = [];
  lastNecklace: any;
  necklaceProducts: any;
  private unsubscribe$: Subject<void> = new Subject<void>();
  cart: Cart = {
    cartId: 0,
    totalCost: 0,
    quantity: 1,
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
  loginUserID: any;
  user: any;

  constructor(
    private service: MainService,
    private cartService: CartserviceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar : MatSnackBar
  ) {}

  ngOnInit() {
    let username = window.sessionStorage.getItem("userName");
    this.service.getUserByUserName(username, (data: any) => {
      console.log(data);
      this.loginUserID = data.userId;
      this.cart.user = data;
      this.service.getLoginByUser(this.loginUserID, (data: any) => {
        console.log(data);

        this.cart.login = data;
      });
    });

    this.service.getRateToday((data: any) => {
      console.log(data);
      this.rates = data;

      // Use array methods to find rates for Gold 22K and Gold 18K
      const gold22K = this.rates.find(
        (rate) =>
          rate.metal.metalName === "Gold" && rate.purity.purityName === "22K"
      );
      const gold18K = this.rates.find(
        (rate) =>
          rate.metal.metalName === "Gold" && rate.purity.purityName === "18K"
      );

      // Set values based on the found rates
      this.rate1 = gold22K ? gold22K.ratePerGram : "";
      this.date = gold22K ? gold22K.trDate.substring(0, 10) : "";
      this.rate2 = gold18K ? gold18K.ratePerGram : "";
    });

    this.service.getAllProduct((data: any) => {
      this.products = data;
      console.log(this.products);
      this.getProductImages();

      // Set a delay of 2000 milliseconds (2 seconds), you can adjust the time as needed
      setTimeout(() => {
        this.setLastNecklace();
      }, 2000);
    });

    // this.service.dataArray$.subscribe((dataArray) => {
    //   // Assuming dataArray is an array of products
    //   this.products = dataArray;
    //   console.log(this.products);
    //   // this.getProductImages();
    //   this.populateUniqueCategories();
    //   this.groupProductsByCategory();

    // });

    this.service.dataArray$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataArray) => {
        // Assuming dataArray is an array of products
        this.products = dataArray;
        console.log(this.products);
        this.getProductImages();
        this.populateUniqueCategories();
        this.groupProductsByCategory();
        this.setLastNecklace();
      });
  }
  populateUniqueCategories() {
    this.uniqueCategories = [
      ...new Set(
        this.productArr.map((product) => product.product.category.categoryName)
      ),
    ];
  }

  groupProductsByCategory() {
    this.categorizedProducts = this.uniqueCategories.map((category) => {
      return {
        category,
        products: this.getProductsByCategory(category),
      };
    });
  }

  getProductsByCategory(category: string) {
    return this.productArr.filter(
      (product) => product.product.category.categoryName === category
    );
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      data: {},
    });
  }

  // addCart(productId: any) {
  //   this.service.getProduct(productId, (data: any) => {
  //     console.log(data);
  //     // this.cartService.addToCart(data);
  //     this.cart.products.push(data);
  //     console.log(this.cart);
  //     let username = window.sessionStorage.getItem("userName");
  //     this.service.getUserByUserName(username, (data: any) => {
  //       this.user = data;
  //       console.log(this.user);
  //       this.service.getCartByUser(this.user.userId, (data: any) => {
  //         console.log(data);
  //         if (data !== null) {
  //           this.cart = data;
  //           console.log(this.cart);
  //         } else {
  //         }
  //       });
  //     });
  //     //  this.service.addCart(this.cart,(data:any)=>{
  //     //   console.log(data)
  //     //  })
  //   });
  // }

  productsList:any[]=[];

  addCart(productId: any) {
    this.service.getProduct(productId, (productData: any) => {

      this.service.getStockByProductId(productData.productId, (stockData: any) => {
        console.log(stockData);
        if(stockData == null){
          this.snackbar.open("Product is Out of Stock. Please try again.", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ["snackbar-error"], 
          });
        }

        if(stockData.stockQtyInHand != 0){
          this.productsList.push(productData);

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
            console.log(userId);
    
            this.service.getCartByUser(userId, (cartData: any) => {
              console.log(cartData);
              if (cartData !== null) {
                this.cart = cartData;
                //  this.cart.products = this.productsList;
                for (const product of this.productsList) {
                  this.cart.products.push(product);
              }
       
                this.service.updateCart(this.cart.cartId, this.cart, () => {});
                console.log("//////////getCartByUser////////////////");
              } else {
                console.log("///addCart/////");
    
                this.service.addCart(this.cart, (data: any) => {
                  console.log(data);
                });
              }
            });
          });
        }else {
          
          this.snackbar.open('Product is out of stock', 'Close', {
              duration: 3000, 
              horizontalPosition: "right", 
              verticalPosition: "top",
          });
      }
      });

    
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setLastNecklace() {
    // Assuming products is an array of products
    const necklaceProducts = this.products.filter(
      (product) => product.category.categoryName === "Necklaces"
    );
    console.log("11111");
    console.log(this.products);
    console.log("11111");
    console.log(necklaceProducts);
    // this.necklaceProducts = necklaceProducts;
    console.log("22222");

    if (necklaceProducts.length > 0) {
      //  this.lastNecklace = necklaceProducts[necklaceProducts.length - 1];
      this.lastNecklace = {
        ...necklaceProducts[necklaceProducts.length - 1],
        image: necklaceProducts[necklaceProducts.length - 1]?.image,
      };
      console.log("33333333333");
      console.log(this.lastNecklace);
      console.log("33333333333");
      console.log("33333333333");
      console.log("33333333333");
    }
  }

  public getImage(imageUrl: string): any {
    this.service.getImageFromServer(imageUrl).subscribe(
      (imageData: ArrayBuffer) => {
        const imageBlob = new Blob([imageData], { type: "image/jpg" }); // Change to the appropriate type for your image
        this.imageSrc = URL.createObjectURL(imageBlob);
        return this.imageSrc;
      },
      (error) => {
        console.error("Error fetching image:", error);
      }
    );
  }

  handleImageError() {
    console.error("Image failed to load:", this.lastNecklace.image);
  }

  getProductImages() {
    this.productArr = []; // Clear existing productArr
    for (let i = 0; i < this.products.length; i++) {
      const productDemo = {
        image: "",
        product: this.products[i],
        category: this.products[i].category, // Assuming your product object has a 'category' property
      };

      this.service.getImageFromServer(this.products[i].productImage).subscribe(
        (imageData: ArrayBuffer) => {
          const imageBlob = new Blob([imageData], { type: "image/jpeg" });
          productDemo.image = URL.createObjectURL(imageBlob);
          this.productArr.push(productDemo);

          // Check category after the image is fetched
          if (productDemo.category.categoryName == "Necklaces") {
            console.log("5555555555");
            console.log(this.necklaceProducts);
            console.log("5555555555");
            this.necklaceProducts.push(productDemo);
          }

          // console.log('Image fetched successfully:', productDemo.image);
        },
        (error) => {
          console.error("Error fetching image:", error);
        }
      );
    }
  }
}
