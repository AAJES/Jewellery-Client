import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MenuAllComponent } from './Components/Menu complete/menu-all/menu-all.component';
import { MenufromComponent } from './Components/Menu complete/menufrom/menufrom.component';
import { RolesfromComponent } from './Components/Role Complete/rolesfrom/rolesfrom.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssetComponent } from './Components/asset/asset.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageuploadComponent } from './Components/imageupload/imageupload.component';
import { MaterialModule } from './material/material.module';
import { ChartModule } from 'angular2-chartjs';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './Components/shop/shop.component';
import { Stock1Component } from './stock1/stock1.component';

import { CartComponent } from './Components/cart/cart.component';
import { LicenseComponent } from './Components/license/license.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { OwnerComponent } from './Components/owner/owner.component';
import { MetalallComponent } from './Components/Metal Complete/metalall/metalall.component';
import { MetalComponent } from './Components/Metal Complete/metal/metal.component';
import { PurityallComponent } from './Components/Purity Complete/purityall/purityall.component';
import { PurityComponent } from './Components/Purity Complete/purity/purity.component';
import { BillallComponent } from './Components/Bill complete/billall/billall.component';
import { BillComponent } from './Components/Bill complete/bill/bill.component';
import { BookingallComponent } from './Components/Booking complete/bookingall/bookingall.component';
import { BookingComponent } from './Components/Booking complete/booking/booking.component';
import { CategoryallComponent } from './Components/Category complete/categoryall/categoryall.component';
import { CategoryComponent } from './Components/Category complete/category/category.component';
import { ModeallComponent } from './Components/modeOfPayment Complete/modeall/modeall.component';
import { ModeOfPaymentComponent } from './Components/modeOfPayment Complete/mode-of-payment/mode-of-payment.component';
import { PaymentallComponent } from './Components/Payment complete/paymentall/paymentall.component';
import { PaymentComponent } from './Components/Payment complete/payment/payment.component';
import { RateallComponent } from './Components/Rate complete/rateall/rateall.component';
import { ReturnallComponent } from './Components/Return complete/returnall/returnall.component';
import { ReturnComponent } from './Components/Return complete/return/return.component';
import { SalesallComponent } from './Components/Sales complete/salesall/salesall.component';
import { SalesComponent } from './Components/Sales complete/sales/sales.component';
import { StockallComponent } from './Components/Stock complete/stockall/stockall.component';
import { StockComponent } from './Components/Stock complete/stock/stock.component';
import { GstbillComponent } from './Components/Bill complete/gst/gstbill/gstbill.component';
import { RateComponent } from './Components/Rate complete/rate/rate.component';
import { Home2Component } from './Components/home2/home2.component';
import { Booking2Component } from './Components/Dashboard/booking2/booking2.component';
import { Cards2Component } from './Components/Dashboard/cards2/cards2.component';
import { Productpurchase2Component } from './Components/Dashboard/productpurchase2/productpurchase2.component';
import { Return2Component } from './Components/Dashboard/return2/return2.component';
import { Sales2Component } from './Components/Dashboard/sales2/sales2.component';
import { Totaltransaction2Component } from './Components/Dashboard/totaltransaction2/totaltransaction2.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { NewarrivalsComponent } from './Components/newarrivals/newarrivals.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MenubarComponent } from './Components/menubar/menubar.component';
import { CatSectionComponent } from './Components/cat-section/cat-section.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BookingreturnComponent } from './Components/bookingreturn/bookingreturn.component';
import { FilterComponent } from './Components/filter/filter.component';
import { DialogDataExampleDialogComponent } from './Components/dialog-data-example-dialog/dialog-data-example-dialog.component';
import { SchemeComponent } from './Components/scheme/scheme.component';
import { SchemecustomerReceiptComponent } from './Components/schemecustomer-receipt/schemecustomer-receipt.component';
import { SchemereceiptsComponent } from './Components/schemereceipts/schemereceipts.component';
import { SchemereceiptsallComponent } from './Components/schemereceiptsall/schemereceiptsall.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { LessPaidReportComponent } from './Components/less-paid-report/less-paid-report.component';
import { BillReportComponent } from './Components/bill-report/bill-report.component';
import { SalesReportComponent } from './Components/sales-report/sales-report.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { Cart2Component } from './cart2/cart2.component';
import { SoundcommandComponent } from './soundcommand/soundcommand.component';
import { NewnavbarComponent } from './newnavbar/newnavbar.component';
import { NewhomepageComponent } from './newhomepage/newhomepage.component';
import { BottomnavbarComponent } from './bottomnavbar/bottomnavbar.component';
import { GenderComponent } from './Components/Gender Complete/gender/gender.component';
import { GenderallComponent } from './Components/Gender Complete/genderall/genderall.component';
import { Homepage2Component } from './homepage2/homepage2.component';
import { PendingpaymentsComponent } from './Components/Payment complete/pendingpayments/pendingpayments.component';
import { PaymentCompletionComponent } from './Components/Payment complete/payment-completion/payment-completion.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgPipesModule } from 'ngx-pipes';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Dashboard2Component } from './Components/dashboard2/dashboard2.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeAllComponent } from './Components/Employee Complete/employee-all/employee-all.component';
import { EmployesfromComponent } from './Components/Employee Complete/employesfrom/employesfrom.component';
import { ShopallComponent } from './Components/shopall/shopall.component';
import { BankdetailsComponent } from './Components/Bank Details/bankdetails/bankdetails.component';
import { AllbankdetailsComponent } from './Components/Bank Details/allbankdetails/allbankdetails.component';
import { AllproductsComponent } from './Components/products/allproducts/allproducts.component';
import { ProductComponent } from './Components/products/product/product.component';
import { AllOwnersComponent } from './Components/Owner Complete/all-owners/all-owners.component';
import { AllcustomersComponent } from './Components/allcustomers/allcustomers.component';
import { ProductpurchaseComponent } from './Components/productpurchase/productpurchase.component';
import { ProductpurchaseallComponent } from './Components/productpurchaseall/productpurchaseall.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BookingReportComponent } from './Components/booking-report/booking-report.component';
import { ReturnReportComponent } from './Components/return-report/return-report.component';
import { StockReportComponent } from './Components/stock-report/stock-report.component';  
import { DisplayComponent } from './Components/display/display.component';
import { CameraComponent } from './Components/virtual/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';






function agGridWithComponents() {
  return {
    ngModule: AgGridModule,
    providers: [],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    EmployesfromComponent,
    MenufromComponent,
    RolesfromComponent,
    EmployeeAllComponent,
    MenuAllComponent,
    AssetComponent,
    ImageuploadComponent,
    ShopComponent,
    LoginComponent,
    Stock1Component,
    StockComponent,
    MetalComponent,
    PurityComponent,
    CategoryComponent,
    BookingComponent,
    ReturnComponent,
    ModeOfPaymentComponent,
    PaymentComponent,
    BillComponent,
    CartComponent,
    LicenseComponent,
    SalesComponent,
    CustomerComponent,
    OwnerComponent,
    MetalallComponent,
    PurityallComponent,
    BillallComponent,
    BookingallComponent,
    CategoryallComponent,
    ModeallComponent,
    PaymentallComponent,
    RateallComponent,
    ReturnallComponent,
    SalesallComponent,
    StockallComponent,
    GstbillComponent,
    RateComponent,
    Home2Component,
    Booking2Component,
    SalesComponent,
    BookingComponent,
    ReturnComponent,
    Cards2Component,
    Productpurchase2Component,
    Return2Component,
    Sales2Component,
    Totaltransaction2Component, 
    CarouselComponent,
    NewarrivalsComponent,
    NavbarComponent,
    MenubarComponent,
    CatSectionComponent,
    FooterComponent,
    BookingreturnComponent,
    FilterComponent,
    DialogDataExampleDialogComponent,
    SchemeComponent,
    SchemecustomerReceiptComponent,
    SchemereceiptsComponent,
    SchemereceiptsallComponent,
    ReportsComponent,
    LessPaidReportComponent,
    BillReportComponent,
    SalesReportComponent,
    EditProfileComponent,
    Cart2Component,
    SoundcommandComponent,
    NewnavbarComponent,
    NewhomepageComponent,
    BottomnavbarComponent,
    GenderComponent,
    GenderallComponent,
    Homepage2Component,
    PendingpaymentsComponent,
    PaymentCompletionComponent,
    Dashboard2Component,
    DialogComponent,
    ShopallComponent,
    BankdetailsComponent,
    AllbankdetailsComponent,
    AllproductsComponent,
    ProductComponent,
    AllOwnersComponent,
    AllcustomersComponent,
    ProductpurchaseComponent,
    ProductpurchaseallComponent,
    BookingReportComponent,
    ReturnReportComponent,
    StockReportComponent,
    DisplayComponent,
    CameraComponent
   

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTabsModule,
    NgxPrintModule,
    MaterialModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ChartModule,
    MatIconModule,
    agGridWithComponents(),
    ToastrModule.forRoot(),
    NgPipesModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    CanvasJSAngularChartsModule,
    NgApexchartsModule,
    WebcamModule,
  
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
