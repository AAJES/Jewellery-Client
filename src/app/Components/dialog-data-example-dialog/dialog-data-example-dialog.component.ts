import { Component, Inject } from '@angular/core';
import { MainService } from '../main.service';
import { Product } from 'src/app/commons/common.objects';
import { FilterComponent } from '../filter/filter.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent {

  products: Product[] = [];
  categoryFilter: any = '';
  metalFilter: any = '';
  purityFilter: any = '';
  metals : any[] = [];
  purities : any[] = [];
  categories : any[] = [];

  constructor(private service : MainService,@Inject(MAT_DIALOG_DATA) public data: FilterComponent,private router : Router,public dialogRef: MatDialogRef<DialogDataExampleDialogComponent>){
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

  ngOnInit(): void {
    this.loadProducts();
  }

  public onCategorySelectionChange(categoryId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subscribe((data : any)=>{
    //                      this.product.category = data;
    //                 })

    this.service.getCategory(categoryId,(data : any)=>{
         console.log(data);
         this.categoryFilter = data.categoryId;
    })
  }

  public onMetalSelectionChange(metalId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/metal/"+metalId)
    //                 .subscribe((data : any)=>{
    //                      this.product.metal = data;
    //                 })

    this.service.getMetal(metalId,(data : any)=>{
        console.log(data);
        this.metalFilter = data.metalId;
    })
  }

  public onPuritySelectionChange(purityId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/purity/"+purityId)
    //                 .subscribe((data : any)=>{
    //                      this.product.purity = data;
    //                 })

    this.service.getPurity(purityId,(data : any)=>{
        console.log(data);
        this.purityFilter = data.purityId;
    })
  }

  applyFilters(): void {
    // this.service
    //   .getFilteredProducts(this.categoryFilter, this.metalFilter, this.purityFilter,(data : any)=>{
    //      this.products = data;
    //   })
      this.loadProducts();
  }

  clearFilters(): void {
    this.categoryFilter = '';
    this.metalFilter = '';
    this.purityFilter = '';
    this.loadProducts();
  }

  private loadProducts(): void {
    // Fetch all products or apply your default filters here
    // this.service.getFilteredProducts('', '', '',(data : any)=>{
    //    this.products = data;
    // })

    if(this.categoryFilter == ''){
      if(this.metalFilter == ''){
         this.service.getProductByPurity(this.purityFilter,(data : any)=>{
            console.log(data);
            this.products = data;
            this.service.setArrayData(this.products);
            this.dialogRef.close();
            // this.router.navigate(['/home3', { data: data  }]);
         })
      }else if(this.purityFilter == ''){
          this.service.getProductByMetal(this.metalFilter,(data : any)=>{
             console.log(data);
             this.products = data;
             this.service.setArrayData(this.products);
             this.dialogRef.close();
            //  this.router.navigate(['/home3', { data: data  }]);
          })
      }
      else{
          this.service.getProductByMetalByPurity(this.metalFilter,this.purityFilter,(data : any)=>{
             console.log(data);
             this.products = data;
             this.products = data;
             this.service.setArrayData(this.products);
             this.dialogRef.close();
            //  this.router.navigate(['/home3', { data: data  }]);
          })
      }
    }else if(this.metalFilter == ''){
      if(this.purityFilter == ''){
          this.service.getCategoryProduct(this.categoryFilter,(data : any)=>{
              console.log(data);
              this.products = data;
              this.products = data;
              this.service.setArrayData(this.products);
              this.dialogRef.close();
              // this.router.navigate(['/home3', { data: data  }]);
          })
      }else if(this.categoryFilter == ''){
          this.service.getProductByPurity(this.purityFilter,(data : any)=>{
              console.log(data);
              this.products = data;
              this.products = data;
              this.service.setArrayData(this.products);
              this.dialogRef.close();
              // this.router.navigate(['/home3', { data: data  }]);
          })
      }
      else{
          this.service.getProductByCategoryByPurity(this.categoryFilter,this.purityFilter,(data : any)=>{
               console.log(data);
               this.products = data;
               this.products = data;
                this.service.setArrayData(this.products);
                this.dialogRef.close();
              //  this.router.navigate(['/home3', { data: data  }]);
          })
      }
    }else if(this.purityFilter == ''){
        if(this.categoryFilter == ''){
           this.service.getProductByMetal(this.metalFilter,(data : any)=>{
                console.log(data);
                this.products = data;
                this.products = data;
                this.service.setArrayData(this.products);
                this.dialogRef.close();
                // this.router.navigate(['/home3', { data: data  }]);
           })
        }else{
            this.service.getProductByCategoryByMetal(this.categoryFilter,this.metalFilter,(data : any)=>{
                 console.log(data);
                 this.products = data;
                 this.products = data;
                  this.service.setArrayData(this.products);
                  this.dialogRef.close();
                //  this.router.navigate(['/home3', { data: data  }]);
            })
        }
    }else{
        this.service.getProductByCategoryByMetalByPurity(this.categoryFilter,this.metalFilter,this.purityFilter,(data : any)=>{
            console.log(data);
            this.products = data;
            this.products = data;
             this.service.setArrayData(this.products);
             this.dialogRef.close();
            // this.router.navigate(['/home3', { data: data  }]);
        })
    }

    console.log(this.products);
  }


}
