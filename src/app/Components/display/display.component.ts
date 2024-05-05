import {  Component } from '@angular/core';
import { Cart, Product } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  products: Product[] = [];
  categoryFilter: any = '';
  metalFilter: any = '';
  purityFilter: any = '';
  metals : any[] = [];
  purities : any[] = [];
  categories : any[] = [];
  imageSrc: string = "";




  constructor(private service : MainService,
    private router: Router
  ){
    this.service.getAllMetals((data : any)=>{
      this.metals = data;
  })

  this.service.getAllPurity((data : any)=>{
       this.purities = data;
  })

  this.service.getAllCategory((data : any)=>{
       this.categories = data;
  })

  }

  public onCategorySelectionChange(categoryId : any) {
    console.log(categoryId);
    this.service.getCategory(categoryId,(data : any)=>{
         console.log(data);
         this.categoryFilter = data.categoryId;
    })
  }

  public onMetalSelectionChange(metalId : any) {
    this.service.getMetal(metalId,(data : any)=>{
        console.log(data);
        this.metalFilter = data.metalId;
    })
  }

  public onPuritySelectionChange(purityId : any) {

    this.service.getPurity(purityId,(data : any)=>{
        console.log(data);
        this.purityFilter = data.purityId;
    })
  }

applyFilters(): void {
      this.loadProducts();
  }

  private loadProducts(): void {

    if(this.categoryFilter == ''){
      if(this.metalFilter == ''){
         this.service.getProductByPurity(this.purityFilter,(data : any)=>{
            console.log(data);
            this.products = data;
            this.service.setArrayData(this.products);
         })
      }else if(this.purityFilter == ''){
          this.service.getProductByMetal(this.metalFilter,(data : any)=>{
             console.log(data);
             this.products = data;
             this.service.setArrayData(this.products);
          })
      }
      else{
          this.service.getProductByMetalByPurity(this.metalFilter,this.purityFilter,(data : any)=>{
             console.log(data);
           
             this.products = data;
             this.service.setArrayData(this.products);
          })
      }
    }else if(this.metalFilter == ''){
      if(this.purityFilter == ''){
          this.service.getCategoryProduct(this.categoryFilter,(data : any)=>{
              console.log(data);
           
              this.products = data;
              this.service.setArrayData(this.products);
          })
      }else if(this.categoryFilter == ''){
          this.service.getProductByPurity(this.purityFilter,(data : any)=>{
              console.log(data);
              this.products = data;
              this.products = data;
              this.service.setArrayData(this.products);
          })
      }
      else{
          this.service.getProductByCategoryByPurity(this.categoryFilter,this.purityFilter,(data : any)=>{
               console.log(data);
               this.products = data;
               this.products = data;
                this.service.setArrayData(this.products);
          })
      }
    }else if(this.purityFilter == ''){
        if(this.categoryFilter == ''){
           this.service.getProductByMetal(this.metalFilter,(data : any)=>{
                console.log(data);
                this.products = data;
            
                this.service.setArrayData(this.products);
           })
        }else{
            this.service.getProductByCategoryByMetal(this.categoryFilter,this.metalFilter,(data : any)=>{

                 console.log(data);

              
                 this.products = data;
                  this.service.setArrayData(this.products);
            })
        }
    }else{
        this.service.getProductByCategoryByMetalByPurity(this.categoryFilter,this.metalFilter,this.purityFilter,(data : any)=>{
            console.log(data);
            this.products = data;
             this.service.setArrayData(this.products);
        })
    }

    console.log(this.products)
  }
  rates: any[] = [];
  rate1: string = "";
  rate2: string = "";
  date: string = "";
  productArr: any[] = [];
  uniqueCategories: string[] = [];
  categorizedProducts: { category: string; products: Product[] }[] = [];
  lastNecklace: any;
  necklaceProducts: any;
  private unsubscribe$: Subject<void> = new Subject<void>();
  
 
  ngOnInit() {
    this.loadProducts();
    this.service.getAllProduct((data: any) => {
      this.products = data;
      console.log(this.products);
      this.getProductImages();
    });

    this.service.dataArray$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataArray) => {
        // Assuming dataArray is an array of products
        this.products = dataArray;
        console.log(this.products);
        this.getProductImages();
        this.populateUniqueCategories();
        this.groupProductsByCategory();
     
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
  productsList:any[]=[];
  
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
          if (productDemo.category.categoryName == "Necklaces") {
            this.necklaceProducts.push(productDemo);
          }
        },
        (error) => {
          console.error("Error fetching image:", error);
        }
      );
    }
  }
  redirectToAppWithProductId(dimage: any,category:string) {
    // Navigate to app-component with product id as a parameter
    this.router.navigate(['/camera'], { queryParams: { dimage: dimage, category: category } });
  }
}






