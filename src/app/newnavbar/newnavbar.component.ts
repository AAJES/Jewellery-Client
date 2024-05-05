import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MainService } from "../Components/main.service";
import { LoginComponent } from "../login/login.component";
import { MatDialog } from "@angular/material/dialog";
import { Owner, Shop, user } from "../commons/common.objects";
import { Router } from "@angular/router";
import { CartserviceService } from "../cartservice.service";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { DialogDataExampleDialogComponent } from "../Components/dialog-data-example-dialog/dialog-data-example-dialog.component";
import { Subscription, interval } from "rxjs";

@Component({
  selector: "app-newnavbar",
  templateUrl: "./newnavbar.component.html",
  styleUrls: ["./newnavbar.component.css"],
})
export class NewnavbarComponent implements OnDestroy, OnInit {
  

  sidenavOpen = false;
  openSubmenu: string | null = null;
  activeUser: boolean = true;
  isAdmin: boolean = false;
  userName: string | null = sessionStorage.getItem("userName");
  user: user = {
    userId: 0,
    userName: "",
    password: "",
    role: [],
  };

  owner : Owner={
    ownerId: 0,
    ownerName: "",
    phone: "",
    password: "",
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: []
    }
  }
  productArr: any[] = [];
  @Input() sideNavStatus: boolean = false;

  // submenuStates : any = {
  //   dashboardSubMenu: false,
  //   schemeSubMenu: false,
  //   reportsSubMenu: false,
  //   configSubMenu: false
  // };

  submenuStates: any = {
    dashboardSubMenu: false,
    schemeSubMenu: false,
    reportsSubMenu: false,
    configSubMenu: false,
  };

  shop: Shop = {
    shopId: 0,
    shopName: "",
    logo: "",
    address: "",
    phone: "",
    email: "",
    state: "",
    gstNo: "",
    panNo: "",
    bankDetails: {
      bankDetailsId: 0,
      ifsccode: "",
      accountNo: "",
      accountHolderName: "",
      branch: "",
      branchAddress: "",
      qrCode: "",
      description: "",
      active: false,
    },
  };
  cart: any;
  products: any;
  intervalId: any;
  imageSrc: any;

  toggleSubmenu(submenuName: string) {
    // Toggle the submenu's visibility
    this.submenuStates[submenuName] = !this.submenuStates[submenuName];
    // Close the side nav when a submenu is selected
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/home3"]);
    window.location.reload();
  }

  // toggleSubmenu(submenuName: string) {
  //   // Toggle the submenu's visibility
  //   this.submenuStates[submenuName] = !this.submenuStates[submenuName];
  // }
  isNavbarCollapsed = false;

  toggleNavbarCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  toggleSideNav() {
    this.sidenavOpen = !this.sidenavOpen;
  }


  openFilterDialog() {
    this.dialog.open(DialogDataExampleDialogComponent, {
      data: {},
    });
  }

  
  // toggleSubmenu(submenuName: string) {
  //   if (this.openSubmenu === submenuName) {
  //     this.openSubmenu = null; // Close the submenu if it's already open
  //   } else {
  //     this.openSubmenu = submenuName; // Open the clicked submenu
  //   }
  // }
  openDialog() {
    this.dialog.open(LoginComponent, {
      data: {},
    });
  }

  rates: any[] = [];
  rate1: string = "";
  rate2: string = "";
  rate3: number = 0;
  date: string = "";




  

  constructor(
    private service: MainService,
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartserviceService,
    private cdRef: ChangeDetectorRef
  ) {
    this.service.getRateToday((data: any) => {
      this.rates = data;

      for (let i = 0; i < this.rates.length; i++) {
        if (
          this.rates[i].metal.metalName == "Gold" &&
          this.rates[i].purity.purityName == "22K"
        ) {
          this.rate1 = this.rates[i].ratePerGram;
          this.date = this.rates[i].trDate;
          this.date = this.date.substring(0, 10);
        } else if (
          this.rates[i].metal.metalName == "Gold" &&
          this.rates[i].purity.purityName == "18K"
        ) {
          this.rate2 = this.rates[i].ratePerGram;
        } else if (this.rates[i].metal.metalName == "Silver") {
          this.rate3 = this.rates[i].ratePerGram * 1000;
        }
      }
    });
  }

  userId: any = 0;
  cartItems: any[] = [];
  shopName: any;

  ngOnInit() {
    this.service.getAllShop((data: any) => {
      if (data.length > 0) {
        // Assuming that data[0] contains only the 'name' property
        const partialShop: Partial<Shop> = { ...data[0] };
       
        // Fill in default values for missing properties
        console.log(this.shop)
        this.shop = {
          ...this.shop, // Keep the existing values
          ...partialShop,
          shopId: partialShop.shopId || 0,
          logo: partialShop.logo || "",
          address: partialShop.address || "",
          phone: partialShop.phone || "",
          email: partialShop.email || "",
          state: partialShop.state || "",
          gstNo: partialShop.gstNo || "",
          panNo: partialShop.panNo || "",
          bankDetails: {
            ...this.shop.bankDetails, // Keep existing bankDetails values
            ...(partialShop.bankDetails || {}),
            bankDetailsId:
              (partialShop.bankDetails &&
                partialShop.bankDetails.bankDetailsId) ||
              0,
            ifsccode:
              (partialShop.bankDetails && partialShop.bankDetails.ifsccode) ||
              "",
            accountNo:
              (partialShop.bankDetails && partialShop.bankDetails.accountNo) ||
              "",
            accountHolderName:  
              (partialShop.bankDetails &&
                partialShop.bankDetails.accountHolderName) ||
              "",
            branch:
              (partialShop.bankDetails && partialShop.bankDetails.branch) || "",
            branchAddress:
              (partialShop.bankDetails &&
                partialShop.bankDetails.branchAddress) ||
              "",
            qrCode:
              (partialShop.bankDetails && partialShop.bankDetails.qrCode) || "",
            description:
              (partialShop.bankDetails &&
                partialShop.bankDetails.description) ||
              "",
            active:
              (partialShop.bankDetails && partialShop.bankDetails.active) ||
              false,
          },
          
        };
        console.log(this.shop)
        this.getImage();
      } else {
        // If no shops are found, assign a default shop
        this.shop = {
          ...this.shop, // Keep the existing values
          shopName: "Your Default Shop Name",
          shopId: 0,
          logo: "",
          address: "",
          phone: "",
          email: "",
          state: "",
          gstNo: "",
          panNo: "",
          bankDetails: {
            bankDetailsId: 0,
            ifsccode: "",
            accountNo: "",
            accountHolderName: "",
            branch: "",
            branchAddress: "",
            qrCode: "",
            description: "",
            active: false,
          },
        };
      }
    });

    // this.cartItems = this.cartService.getCartItems();
    let username = window.sessionStorage.getItem("userName");


    this.service.getOwnerByUserName(username,(ownerData:any) => {
      this.owner = ownerData;
      console.log(this.owner)
    })

    this.service.getUserByUserName(username, (data: any) => {
      this.user = data;

      // Check if the user has the 'admin' role
      const isAdmin =
        this.user &&
        this.user.role &&
        this.user.role.some((role) => role.roleName === "admin");

      if (isAdmin) {
        this.isAdmin = true;
      }
    });

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
      this.fetchData(); 
      this.startFetching(); // Start periodic fetching
      this.service.getCartByUser(userId, (cartData: any) => {
      //   this.subscription = interval(4000).subscribe(() => {
          if (cartData !== null) {
            this.cart = cartData;
            if (cartData.products !== null) {
              this.products = cartData.products;

      //         // Trigger change detection after updating both this.cart and this.products
              this.cdRef.detectChanges();
            }
          }
        });
      });
  }
  async fetchData(): Promise<void> {
    const userId = this.userId; 
    const cartData = await this.service.getCartByUserAsyc(userId).toPromise();
    if (cartData !== null) {
      this.cart = cartData;
      this.products = cartData.products;
      this.cartCount = this.products.length;
    }
  }



  
  cartCount : number=0;

  public getImage(): any {
    this.service
      .getImageFromServer(this.shop.logo)
      .subscribe((imageData: ArrayBuffer) => {
        const imageBlob = new Blob([imageData], { type: "image/jpeg" });
        this.imageSrc = URL.createObjectURL(imageBlob);
      });
  }

  startFetching(): void {
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 4000);
  }


  editProfile() {
   let ownerId = this.owner.ownerId
    this.router.navigate(['/owner', { data: ownerId}]);
    }


  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Stop periodic fetching on component destruction
  }
}
