import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ImageModel, Product } from "src/app/commons/common.objects";
import { ActivatedRoute, Router } from "@angular/router";
import { MainService } from "../../main.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  metals: any[] = [];
  purities: any[] = [];
  categories: any[] = [];
  rates: any[] = [];
  users: any[] = [];

  product: Product = {
    productId: 0,
    weightage: 0,
    wastage: 0,
    comment: "",
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
    productName: "",
    totalRate: 0,
    productImage: "",
    quantity: {
      quantityId: 0,
      quantity: 1,
    },
    stone: 0,
    labour: 0,
    processing: 0,
    stoneWeight: 0
  };
  productId: any = 0;
  selectedMetal: any;
  bookingId: any = 0;

  constructor(
    private httpClient: HttpClient,
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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

    this.service.getAllRate((data: any) => {
      this.rates = data;
    });

    this.service.getAllUser((data: any) => {
      this.users = data;
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get("data");
      console.log(productId);
      if (productId) {
        // Edit Booking
        this.productId = productId;

        this.service.getProduct(productId, (data: any) => {
          console.log(data);
          this.product = data;
          this.selectedMetal = data.metal.metalId;
          console.log(this.selectedMetal);
          this.cdr.detectChanges();
        });
      } else {
        // Handle the case where bookingId is not available
      }
    });

    this.route.paramMap.subscribe((params) => {
      const bookingId = params.get("bookingId");
      console.log(bookingId);
      if (bookingId) {
        // Edit Booking
        this.bookingId = bookingId;

        this.service.getBookingById(bookingId, (data: any) => {
          console.log(data);
          this.product.metal = data.metal;
          this.product.purity = data.purity;
          this.product.weightage = data.weight;
          this.product.category = data.category;
          this.cdr.detectChanges();
        });
      } else {
        // Handle the case where bookingId is not available
      }
    });
  }

  public onMetalSelectionChange(metalId: any) {
    this.service.getMetal(metalId, (data: any) => {
      console.log(data);
      this.product.metal = data;
    });
  }

  public onPuritySelectionChange(purityId: any) {
    this.service.getPurity(purityId, (data: any) => {
      console.log(data);
      this.product.purity = data;
    });
  }

  public onCategorySelectionChange(categoryId: any) {
    this.service.getCategory(categoryId, (data: any) => {
      console.log(data);
      this.product.category = data;
    });
  }

  public onRateSelectionChange(rateId: any) {
    this.service.getRate(rateId, (data: any) => {
      console.log(data);
      this.product.rate = data;
    });
  }

  public onSubmit() {
    if (this.productId == 0 && this.bookingId == 0) {
      this.service.addQuantity(this.product.quantity, (data: any) => {
        this.product.quantity = data;
        this.service.addProduct(this.product, (data: any) => {
          this.router.navigate(["/allproduct"]);
        });
      });
    } else {
      if (this.productId != 0) {
        this.service.updateProduct(
          this.productId,
          this.product,
          (data: any) => {
            this.router.navigate(["/allproduct"]);
          }
        );
      }
    }

    if (this.bookingId != 0) {
      this.service.addProductByBooking(
        this.product,
        this.bookingId,
        (data: any) => {
          console.log(data);
          this.router.navigate(["/productPurchase"]);
        }
      );
    }
  }

  imageData: any = "";

  image: ImageModel = {
    id: 0,
    name: "",
    type: "",
  };

  selectedFile: File | null = null;
  response: string = "";

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFile = selectedFile;
      this.imageUpload();
    }
  }

  public imageUpload() {
    const fileInput = document.querySelector<HTMLInputElement>("#fileInput");
    const file = fileInput?.files?.[0];

    if (!this.selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.httpClient
      .post<any>("http://localhost:5050/ams/upload", formData)
      .subscribe(
        (response) => {
          this.image = response;
          console.log(this.image);
          this.product.productImage = this.image.name;
          this.response = "File upload success.";
          this.service.getImageFromServer(this.product.productImage).subscribe(
            (imageData: ArrayBuffer) => {
              const imageBlob = new Blob([imageData], { type: "image/jpeg" }); // Change to the appropriate type for your image
              this.imageData = URL.createObjectURL(imageBlob);
              console.log("image");
            },
            (error) => {
              console.error("Error fetching image:", error);
            }
          );
          // Do something with the response from the server, if needed
        },
        (error) => {
          this.response = "File upload error: " + error.status;
          // Handle the error, if any
        }
      );
  }
}
