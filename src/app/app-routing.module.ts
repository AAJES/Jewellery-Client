import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenufromComponent } from './Components/Menu complete/menufrom/menufrom.component';
import { RolesfromComponent } from './Components/Role Complete/rolesfrom/rolesfrom.component';
import { EmployeeAllComponent } from './Components/Employee Complete/employee-all/employee-all.component';
import { MenuAllComponent } from './Components/Menu complete/menu-all/menu-all.component';
import { titlebarComponent } from './Components/titlebar/titlebarComponent';
import { LoginComponent } from './login/login.component';
import { MetalComponent } from './Components/Metal Complete/metal/metal.component';
import { MetalallComponent } from './Components/Metal Complete/metalall/metalall.component';
import { PurityallComponent } from './Components/Purity Complete/purityall/purityall.component';
import { PurityComponent } from './Components/Purity Complete/purity/purity.component';
import { CategoryComponent } from './Components/Category complete/category/category.component';
import { RateallComponent } from './Components/Rate complete/rateall/rateall.component';
import { RateComponent } from './Components/Rate complete/rate/rate.component';
import { BookingComponent } from './Components/Booking complete/booking/booking.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { CartComponent } from './Components/cart/cart.component';
import { BillComponent } from './Components/Bill complete/bill/bill.component';
import { ModeOfPaymentComponent } from './Components/modeOfPayment Complete/mode-of-payment/mode-of-payment.component';
import { StockallComponent } from './Components/Stock complete/stockall/stockall.component';
import { OwnerComponent } from './Components/owner/owner.component';
import { ShopComponent } from './Components/shop/shop.component';
import { StockComponent } from './Components/Stock complete/stock/stock.component';
import { BookingallComponent } from './Components/Booking complete/bookingall/bookingall.component';
import { PaymentComponent } from './Components/Payment complete/payment/payment.component';
import { GstbillComponent } from './Components/Bill complete/gst/gstbill/gstbill.component';
import { BookingreturnComponent } from './Components/bookingreturn/bookingreturn.component';
import { Booking2Component } from './Components/Dashboard/booking2/booking2.component';
import { Productpurchase2Component } from './Components/Dashboard/productpurchase2/productpurchase2.component';
import { Return2Component } from './Components/Dashboard/return2/return2.component';
import { Sales2Component } from './Components/Dashboard/sales2/sales2.component';
import { Home2Component } from './Components/home2/home2.component';
import { ReturnComponent } from './Components/Return complete/return/return.component';
import { Totaltransaction2Component } from './Components/Dashboard/totaltransaction2/totaltransaction2.component';
import { SchemeComponent } from './Components/scheme/scheme.component';
import { SchemecustomerReceiptComponent } from './Components/schemecustomer-receipt/schemecustomer-receipt.component';
import { SchemereceiptsComponent } from './Components/schemereceipts/schemereceipts.component';
import { SchemereceiptsallComponent } from './Components/schemereceiptsall/schemereceiptsall.component';
import { SalesReportComponent } from './Components/sales-report/sales-report.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { LessPaidReportComponent } from './Components/less-paid-report/less-paid-report.component';
import { BillReportComponent } from './Components/bill-report/bill-report.component';
import { Cart2Component } from './cart2/cart2.component';
import { GenderallComponent } from './Components/Gender Complete/genderall/genderall.component';
import { GenderComponent } from './Components/Gender Complete/gender/gender.component';
import { PendingpaymentsComponent } from './Components/Payment complete/pendingpayments/pendingpayments.component';
import { PaymentCompletionComponent } from './Components/Payment complete/payment-completion/payment-completion.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { Dashboard2Component } from './Components/dashboard2/dashboard2.component';
import { EmployesfromComponent } from './Components/Employee Complete/employesfrom/employesfrom.component';
import { ReturnallComponent } from './Components/Return complete/returnall/returnall.component';
import { CategoryallComponent } from './Components/Category complete/categoryall/categoryall.component';
import { ShopallComponent } from './Components/shopall/shopall.component';
import { BankdetailsComponent } from './Components/Bank Details/bankdetails/bankdetails.component';
import { AllbankdetailsComponent } from './Components/Bank Details/allbankdetails/allbankdetails.component';
import { ProductComponent } from './Components/products/product/product.component';
import { AllproductsComponent } from './Components/products/allproducts/allproducts.component';
import { ModeallComponent } from './Components/modeOfPayment Complete/modeall/modeall.component';
import { AllOwnersComponent } from './Components/Owner Complete/all-owners/all-owners.component';
import { AllcustomersComponent } from './Components/allcustomers/allcustomers.component';
import { ProductpurchaseComponent } from './Components/productpurchase/productpurchase.component';
import { ProductpurchaseallComponent } from './Components/productpurchaseall/productpurchaseall.component';
import { BookingReportComponent } from './Components/booking-report/booking-report.component';
import { ReturnReportComponent } from './Components/return-report/return-report.component';
import { StockReportComponent } from './Components/stock-report/stock-report.component';
import { CameraComponent } from './Components/virtual/camera/camera.component';

const routes: Routes = [
  // { path: 'home', component: VmsHomeComponent },
  { path: 'employeeall', component: EmployeeAllComponent,canActivate:[AuthGuardGuard] },
  { path: 'employeeform', component: EmployesfromComponent,canActivate:[AuthGuardGuard] },
  { path: 'menuall', component: MenuAllComponent,canActivate:[AuthGuardGuard] },
  { path: 'menuform', component: MenufromComponent,canActivate:[AuthGuardGuard] },
  { path: 'bankDetailsall', component: AllbankdetailsComponent,canActivate:[AuthGuardGuard] },
  { path: 'bankDetailsform', component: BankdetailsComponent,canActivate:[AuthGuardGuard] },
  { path: 'roleform', component: RolesfromComponent,canActivate:[AuthGuardGuard] },
  { path: 'allmetal', component: MetalallComponent ,canActivate:[AuthGuardGuard]},
  { path: 'allpurity', component: PurityallComponent ,canActivate:[AuthGuardGuard]},
  { path: 'dashboard', component: Dashboard2Component,canActivate:[AuthGuardGuard] },
  { path: 'metal', component: MetalComponent,canActivate:[AuthGuardGuard] },
  { path: 'purity', component: PurityComponent,canActivate:[AuthGuardGuard] },
  { path: 'title', component: titlebarComponent,canActivate:[AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent,canActivate:[AuthGuardGuard] },
  { path: 'allcategory', component: CategoryallComponent,canActivate:[AuthGuardGuard] },
  { path: 'rateall', component: RateallComponent,canActivate:[AuthGuardGuard] },
  { path: 'rate', component: RateComponent ,canActivate:[AuthGuardGuard]},
  { path: 'allproduct', component: AllproductsComponent,canActivate:[AuthGuardGuard] },
  { path: 'product', component: ProductComponent,canActivate:[AuthGuardGuard] },
  { path: 'booking', component: BookingComponent,canActivate:[AuthGuardGuard] },
  { path: 'customer', component: CustomerComponent,canActivate:[AuthGuardGuard] },
  { path: 'allcustomers', component: AllcustomersComponent,canActivate:[AuthGuardGuard] },
  { path: 'dashboard', component: Dashboard2Component,canActivate:[AuthGuardGuard] },
  { path: 'cart', component: CartComponent,canActivate:[AuthGuardGuard] },
  { path: 'bill', component: BillComponent,canActivate:[AuthGuardGuard] },
  { path: 'paymentmode', component: ModeOfPaymentComponent ,canActivate:[AuthGuardGuard]},
  { path: 'allpaymentmode', component: ModeallComponent ,canActivate:[AuthGuardGuard]},
  { path: 'payment', component: PaymentComponent,canActivate:[AuthGuardGuard] },
  { path: 'stockall', component: StockallComponent ,canActivate:[AuthGuardGuard]},
  { path: 'owner', component: OwnerComponent,canActivate:[AuthGuardGuard] },
  { path: 'allowners', component: AllOwnersComponent,canActivate:[AuthGuardGuard] },
  { path: 'shop', component: ShopComponent,canActivate:[AuthGuardGuard] },
  { path: 'shopdetails', component: ShopallComponent,canActivate:[AuthGuardGuard] },
  { path: 'stock', component: StockComponent,canActivate:[AuthGuardGuard] },
  { path: 'booking', component: BookingComponent,canActivate:[AuthGuardGuard] },
  { path: 'allbooking', component: BookingallComponent,canActivate:[AuthGuardGuard] },
  { path: 'gstbill', component: GstbillComponent,canActivate:[AuthGuardGuard] },
  { path: 'removebooking', component: BookingreturnComponent,canActivate:[AuthGuardGuard] },
  { path: 'booking2', component: Booking2Component,canActivate:[AuthGuardGuard] },
  { path: 'productpurchase2', component: Productpurchase2Component ,canActivate:[AuthGuardGuard]},
  { path: 'return2', component: Return2Component,canActivate:[AuthGuardGuard] },
  { path: 'sales2', component: Sales2Component,canActivate:[AuthGuardGuard] },
  { path: 'home3', component: Home2Component },
  { path: 'return', component: ReturnComponent,canActivate:[AuthGuardGuard] },
  { path: 'allreturn', component: ReturnallComponent,canActivate:[AuthGuardGuard] },
  { path: 'totalTransaction', component: Totaltransaction2Component ,canActivate:[AuthGuardGuard]},
  { path: 'scheme', component: SchemeComponent,canActivate:[AuthGuardGuard] },
  { path: 'schemecustomerReceipt', component: SchemecustomerReceiptComponent,canActivate:[AuthGuardGuard] },
  { path: 'schemeReceipts', component: SchemereceiptsComponent,canActivate:[AuthGuardGuard] },
  { path: 'schemerecall', component: SchemereceiptsallComponent ,canActivate:[AuthGuardGuard]},
  { path: 'salesReport', component: SalesReportComponent,canActivate:[AuthGuardGuard] },
  { path: 'lessPaidReport', component: LessPaidReportComponent,canActivate:[AuthGuardGuard] },
  { path: 'billReport', component: BillReportComponent,canActivate:[AuthGuardGuard] },
  { path: 'edit', component: EditProfileComponent,canActivate:[AuthGuardGuard] },
  {path:'cart2',component:Cart2Component,canActivate:[AuthGuardGuard]},
  {path:'genderall',component:GenderallComponent,canActivate:[AuthGuardGuard]},
  {path:'gender',component:GenderComponent,canActivate:[AuthGuardGuard]},
  {path:'pendingpayments',component:PendingpaymentsComponent,canActivate:[AuthGuardGuard]},
  {path:'completepayment',component:PaymentCompletionComponent,canActivate:[AuthGuardGuard]},
  {path:'productPurchase',component:ProductpurchaseComponent,canActivate:[AuthGuardGuard]},
  {path:'productPurchaseall',component:ProductpurchaseallComponent,canActivate:[AuthGuardGuard]},
  {path:'bookingReport',component:BookingReportComponent,canActivate:[AuthGuardGuard]},
  {path:'returnReport',component:ReturnReportComponent,canActivate:[AuthGuardGuard]},
  {path:'stockReport',component:StockReportComponent,canActivate:[AuthGuardGuard]},
  { path: 'camera', component: CameraComponent },
  { path: '**', component: Home2Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
