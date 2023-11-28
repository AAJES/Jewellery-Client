import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployesfromComponent } from './Components/Employee Complete/employesfrom/employesfrom.component';
import { MenufromComponent } from './Components/Menu complete/menufrom/menufrom.component';
import { RolesfromComponent } from './Components/Role Complete/rolesfrom/rolesfrom.component';
import { VmsHomeComponent } from './Components/vms-home/vms-home.component';
import { EmployeeAllComponent } from './Components/Employee Complete/employee-all/employee-all.component';
import { MenuAllComponent } from './Components/Menu complete/menu-all/menu-all.component';
import { UserallComponent } from './Components/User complete/User All/userall.component';
import { UserformComponent } from './Components/User complete/User Form/userform.component';
import { titlebarComponent } from './Components/titlebar/titlebarComponent';
import { LoginComponent } from './login/login.component';
import { MetalComponent } from './Components/Metal Complete/metal/metal.component';
import { MetalallComponent } from './Components/Metal Complete/metalall/metalall.component';
import { PurityallComponent } from './Components/Purity Complete/purityall/purityall.component';
import { PurityComponent } from './Components/Purity Complete/purity/purity.component';
import { CategoryComponent } from './Components/Category complete/category/category.component';
import { RateallComponent } from './Components/Rate complete/rateall/rateall.component';
import { RateComponent } from './Components/Rate complete/rate/rate.component';
import { ProductComponent } from './Components/product/product.component';
import { BookingComponent } from './Components/Booking complete/booking/booking.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { Dashboard2Component } from './Components/Dashboard/dashboard2/dashboard2.component';
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
import { HomeComponent } from './Components/home/home.component';
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

const routes: Routes = [
  { path: 'home', component: VmsHomeComponent },
  { path: 'employeeall', component: EmployeeAllComponent },
  { path: 'employeeform', component: EmployesfromComponent },
  { path: 'menuall', component: MenuAllComponent },
  { path: 'menuform', component: MenufromComponent },
  { path: 'roleform', component: RolesfromComponent },
  { path: 'userall', component: UserallComponent },
  { path: 'userform', component: UserformComponent },
  { path: 'allmetal', component: MetalallComponent },
  { path: 'allpurity', component: PurityallComponent },
  { path: 'dashboard', component: Dashboard2Component },
  { path: 'metal', component: MetalComponent },
  { path: 'purity', component: PurityComponent },
  { path: 'title', component: titlebarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'rateall', component: RateallComponent },
  { path: 'rate', component: RateComponent },
  { path: 'product', component: ProductComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'dashboard2', component: Dashboard2Component },
  { path: 'cart', component: CartComponent },
  { path: 'bill', component: BillComponent },
  { path: 'paymentmode', component: ModeOfPaymentComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'stockall', component: StockallComponent },
  { path: 'owner', component: OwnerComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'stock', component: StockComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'allbooking', component: BookingallComponent },
  { path: 'gstbill', component: GstbillComponent },
  { path: 'removebooking', component: BookingreturnComponent },
  { path: 'booking2', component: Booking2Component },
  { path: 'productpurchase2', component: Productpurchase2Component },
  { path: 'return2', component: Return2Component },
  { path: 'sales2', component: Sales2Component },
  { path: 'home2', component: HomeComponent },
  { path: 'home3', component: Home2Component },
  { path: 'return', component: ReturnComponent },
  { path: 'totalTransaction', component: Totaltransaction2Component },
  { path: 'scheme', component: SchemeComponent },
  { path: 'schemecustomerReceipt', component: SchemecustomerReceiptComponent },
  { path: 'schemeReceipts', component: SchemereceiptsComponent },
  { path: 'schemerecall', component: SchemereceiptsallComponent },
  { path: 'salesReport', component: SalesReportComponent },
  { path: 'lessPaidReport', component: LessPaidReportComponent },
  { path: 'billReport', component: BillReportComponent },
  { path: 'edit', component: EditProfileComponent },
  {path:'cart2',component:Cart2Component},
  {path:'genderall',component:GenderallComponent},
  {path:'gender',component:GenderComponent},
  { path: '**', component: Home2Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
