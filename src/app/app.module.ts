import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { VmsHomeComponent } from './Components/vms-home/vms-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeAllComponent } from './Components/Employee Complete/employee-all/employee-all.component';
import { MenuAllComponent } from './Components/Menu complete/menu-all/menu-all.component';
import { MenufromComponent } from './Components/Menu complete/menufrom/menufrom.component';
import { RolesfromComponent } from './Components/Role Complete/rolesfrom/rolesfrom.component';
import { EmployesfromComponent } from './Components/Employee Complete/employesfrom/employesfrom.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserallComponent } from './Components/User complete/User All/userall.component';
import { UserformComponent } from './Components/User complete/User Form/userform.component';
import { AssetComponent } from './Components/asset/asset.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageuploadComponent } from './Components/imageupload/imageupload.component';
import { MaterialModule } from './material/material.module';
import { ChartModule } from 'angular2-chartjs';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './Components/shop/shop.component';
import { Stock1Component } from './stock1/stock1.component';
import { ProductComponent } from './Components/product/product.component';
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
import { Dashboard2Component } from './Components/Dashboard/dashboard2/dashboard2.component';
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
import { NewsidenavComponent } from './newsidenav/newsidenav.component';
import { NewhomepageComponent } from './newhomepage/newhomepage.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { BottomnavbarComponent } from './bottomnavbar/bottomnavbar.component';
import { NavigationBarComponent } from './Components/navigation-bar/navigation-bar.component';
import { GenderComponent } from './Components/Gender Complete/gender/gender.component';
import { GenderallComponent } from './Components/Gender Complete/genderall/genderall.component';





function agGridWithComponents() {
  return {
    ngModule: AgGridModule,
    providers: [],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    VmsHomeComponent,
    EmployesfromComponent,
    MenufromComponent,
    RolesfromComponent,
    EmployeeAllComponent,
    MenuAllComponent,
    UserallComponent,
    UserformComponent,
    AssetComponent,
    ImageuploadComponent,
    ShopComponent,
    LoginComponent,
    Stock1Component,
    StockComponent,
    MetalComponent,
    PurityComponent,
    CategoryComponent,
    ProductComponent,
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
    Dashboard2Component, 
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
    NewsidenavComponent,
    NewhomepageComponent,
    TopnavbarComponent,
    BottomnavbarComponent,
    NavigationBarComponent,
    GenderComponent,
    GenderallComponent
    
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
    ChartModule,
    agGridWithComponents(),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
