import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent {

  displayedColumns: string[] = ['productId', 'productName', 'productImage', 'weightage', 'wastage', 'description', 'category' ,'metal' , 'purity','action'];
  productList : any[] = [];
  dataSource!: MatTableDataSource<any>;
  productArr: any[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; 
    i: number=0;

  constructor(private service: MainService , private router:Router) {
   
    this.service.getAllProduct((response: any) => {
      this.productList = response;
      this.getProductImages();
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
      
    });
  }

  public onEditClick(productId: any) {
    if (productId) {
        console.log(productId);
        this.router.navigate(['/product', { data: productId }]);
    } else {
        console.error("ProductId is not available.");
        // Handle this scenario, e.g., show an error message to the user.
    }
}

  
  
    public onDeleteClick(bankDetailsId : any) {
      if (confirm("Are you sure to delete the Bank Details ?")){
        console.log('delete clicked');
       
          
    }}

    getProductImages() {
      this.productArr = []; 
      for (let i = 0; i < this.productList.length; i++) {
        const productDemo = {
          image: '',
          product: this.productList[i],
          category: this.productList[i].category 
        };
    
        this.service.getImageFromServer(this.productList[i].productImage).subscribe(
          (imageData: ArrayBuffer) => {
            const imageBlob = new Blob([imageData], { type: 'image/jpeg' });
            productDemo.image = URL.createObjectURL(imageBlob);

            this.productArr.push(productDemo);
            console.log(this.productArr.length +"....."+this.productList.length)
            if (this.productArr.length == this.productList.length) {
             
              this.dataSource = new MatTableDataSource(this.productArr);
              console.log(this.dataSource)
             
              this.dataSource.paginator = this.paginator;
            }
          },
          (error) => {
            console.error('Error fetching image:', error);
          }
        );
      }

     
    }  

  
  
}
