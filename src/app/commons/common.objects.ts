import { Time } from '@angular/common';
import { SchemecustomerReceiptComponent } from '../Components/schemecustomer-receipt/schemecustomer-receipt.component';

export interface Visitor {
  visitor_id: number;
  visitor_name: string;
  visitor_address: string;
  visitor_email: string;
  visitor_phone1: string;
  visitor_phone2: string;
  visitor_photo: string;
  visitor_aadhar: string;
}

export interface Entity {
  entity_id: number;
  entity_description: string;
}

export interface Department {
  department_id: number;
  department_description: string;
  entity: Entity;
}

export interface Section {
  section_id: number;
  section_description: string;
  department: Department;
}

export interface ImageModel {
  id: number;
  name: string;
  type: string;
}

export interface Facility {
  facility_id: number;
  facility_description: string;
  facilityCheckIn: string;
  facilityCheckOut: string;
}

export interface MenuGroup {
  menu_id: number;
  menuName: string;
  menuGroup: string;
}

export interface Role {
  role_id: number;
  role_description: string;
  menuGroup: MenuGroup;
}

export interface User {
  user_id: number;
  user_Username: string;
  user_email: string;
  user_phone1: string;
  user_phone2: string;
  user_password: string;
  role: Role;
  section: Section;
}

export interface Contact {
  contactId: number;
  name: string;
  email: string;
  phone: string;
}

export interface SectionVisited {
  sectionVisited_id: number;
  section: Section;
  sectionCheckIn: string;
  sectionCheckOut: string;
}

export interface FacilityVisited {
  facilityVisited_id: number;
  facility: Facility;
  facilityCheckIn: string;
  facilityCheckOut: string;
}

export interface Appointment {
  appointment_id: number;
  appointment_start: string;
  appointment_end: string;
  visitor: Visitor;
  vehicle: Vehicle;
  item: Item;
  approver: User;
  facilityVisitedList: FacilityVisited[];
  sectionVisitedList: SectionVisited[];
  appointment_type: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface Vehicle {
  vehicleId: number;
  vehicleNumber: string;
  vehicleType: string;
  driverLicense: string;
  driverName: string;
  driverPhoto: string;
  vehicleCopy: string;
}

export interface Item {
  item_id: number;
  item_Name: string;
  item_Description: string;
}

export interface Template {
  // id : number;
  appointment: Appointment;
  sectionVisitedList: Section;
  item: Item;
}

export interface Company {
  companyId: number;
  name: string;
  logoPath: string;
  address: string;
  address1: string;
  address2: string;
  phoneNo: string;
  phoneNo1: string;
  email: string;
  website: string;
}
export interface CompanyEntity {
  entityId: number;
  entityName: string;
  status: boolean;
}

export interface EmailDetails {
  mailNo: number;
  sender: string;
  recipient: string;
  msgBody: string;
  subject: string;
  attachment: string;
}

export interface Employee {
  employeeId: number;
  employeeName: string;
  age: number;
  phoneNumber: string;
  Address: string;
  gender: Gender;
}

export interface Designation {
  designationId: number;
  designation: string;
}

export interface Metal {
  metalId: number;
  metalName: string;
}

export interface Purity {
  purityId: number;
  purityName: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  activeStatus: boolean;
  categoryImage: string;
}

export interface Rate {
  rateId: number;
  trDate: string;
  trTime: Time;
  activeStatus: boolean;
  ratePerGram: number;
  metal: Metal;
  purity: Purity;
  user: user;
}

export interface Booking {
  bookingId: number;
  minAmount: number;
  deliveryDate: string;
  bookingDate: string;
  advanceAmount: number;
  customer: Customer;
  employee: Employee;
  products: ProductPurchase[];
  status: string;
  deductAmount: number;
  refundAmount: number;
  user : user;
  // login : login;
}

export interface Product {
  productId: number;
  productName: string;
  weightage: number;
  wastage: number;
  comment: string;
  totalRate: number;
  trDate: string;
  trTime: Time;
  description: string;
  purity: Purity;
  category: Category;
  metal: Metal;
  rate: Rate;
  productImage: string;
}

export interface ProductPurchase {}

export interface Return {
  returnId: number;
  wastage: number;
  grossWeight: number;
  netWeight: number;
  description: string;
  returnAmount: number;
  category: Category;
  metal: Metal;
  purity: Purity;
  user: user;
  // login : login;
}

export interface Bill {
  get(arg0: string): import('@angular/forms').FormControl<any>;
  billId: number;
  productId: number;
  paymentId: number;
  amountPaid: number;
  discountAmount: number;
  actualAmount: number;
  gst: number;
  customer: Customer;
  trdate: string;
  trTime: Time;
  user: user;
  products: Product[];
  payment: Payment;
  billNumber: string;
  login : login;
}

export interface Payment {
  paymentId: number;
  amountPaid: number;
  totalWeight: number;
  trDate: string;
  trTime: Time;
  products: Product[];
  modeOfPayment: ModeOfPayment;
  user: user;
  discountAmount: number;
  totalAmount: number;
  login : login;
}

export interface ModeOfPayment {
  modeofPaymentId: number;
  modeOfPayment: string;
}

export interface Sales {
  salesId: number;
  totalAmount: number;
  discountAmount: number;
  paymentStatus: boolean;
  wastage: number;
  grossweight: number;
  netWeight: number;
  actualAmount: number;
  quantity: number;
  billgeneratedOrNo: boolean;
  trDate: string;
  trTime: Time;
  payment: Payment;
  user: user;
  bill: Bill;
  // login : login;
}

export interface Cart {
  cartId: number;
  totalCost: number;
  quantity: number;
  trDate: string;
  trTime: Time;
  user: user;
  //login : Login,
  products: Product[];
  booking: Booking;
}

export interface ProductPurchase {
  productPurchaseId: number;
  trDate: Date;
  trTime: Time;
  totalWeight: number;
  amountPaid: number;
  count: number;
  user: user;
  product: Product;
}

export interface License {
  licenseId: number;
  nextRenewalDate: string;
  amountPaid: number;
  trDate: string;
  trTime: Time;
  licenseType: string;
  code: string;
  yearMonth: string;
}

export interface Gender {
  genderId: number;
  gender: string;
}

export interface Customer {
  customerId: number;
  customerName: string;
  gender: Gender;
  phone1: string;
  phone2: string;
  email: string;
  location: string;
  user: user;
}

export interface user {
  userId: number;
  userName: string;
  password: string;
  role: [];
}

export interface Owner {
  ownerId: number;
  ownerName : string,
  phone: string;
  password: string;
  user: user;
}

export interface Login {
  userName: string;
  password: string;
}

export interface Scheme {
  schemeId: number;
  schemeName: string;
  schemeAmount: number;
  startDate: string;
  endDate: string;
  trDate: string;
  amountPerMonth: number;
}

export interface SchemeCustomerReceipt {
  schemeCustomerRecId: number;
  customerLuckyNo: number;
  customerName: string;
  customerPhone: string;
  remark: string;
}

export interface SchemeReceipts {
  schemeReceiptId: number;
  scheme: Scheme;
  paymentDate: string;
  schemeCustomerReceipt: SchemeCustomerReceipt;
  trDate: string;
  amount: number;
  modeOfPayment: ModeOfPayment;
}

export interface IdForm{
  idFormId : number,
  id : number
}

export interface Shop{
  shopId : number,
  shopName : string,
  logo : string,
  address : string,
  phone : string,
  email : string,
  state : string
}

export interface login{
   loginId : number,
   systemDetails : string,
   user : user
}
