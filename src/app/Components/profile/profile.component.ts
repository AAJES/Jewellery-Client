import { Component } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private service: MainService) {
    service.fetchAllVisitor((data: any[]) => {
      this.visitors = data;

    });
  }

  

  companies: any[] = [];

  visitors: any[] = [];

  // public profile : any = [
  //   {id:1,name:"Anil",image:"image1"},
  //   {id:2,name:"Kiran",image:"image2"},
  //   {id:3,name:"Arun",image:"image3"},
  //   {id:4,name:"Ravi",image:"image4"},
  //   {id:5,name:"Sunil",image:"image5"},
  //   {id:6,name:"Sameer",image:"image6"},
  //   {id:7,name:"Rakesh",image:"image7"},
  //   {id:8,name:"Praveen",image:"image8"},
  //   {id:9,name:"Rakesh",image:"image9"},
  //   {id:10,name:"Rajesh",image:"image10"},
  // ]

  // public profiles : any = [ 
  //   {
  //     Id:1,
  //     Name:"Sam Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "samwalter@gmail.com",  
  //     imageUrl:"150SquareTest"
  //   },
  //   {
  //     Id:2,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:3,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:4,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"manProfilePicture"
  //   },
  //   {
  //     Id:5,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"manProfilePicture"
  //   },
  //   {
  //     Id:6,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"manProfilePicture"
  //   },
  //   {
  //     Id:7,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"manProfilePicture"
  //   },
  //   {
  //     Id:8,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture2"
  //   },
  //   {
  //     Id:9,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:10,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:11,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture2"
  //   },
  //   {
  //     Id:12,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"manProfilePicture"
  //   },
  //   {
  //     Id:13,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:14,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture2"
  //   },
  //   {
  //     Id:15,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:16,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:17,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:18,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture2"
  //   },
  //   {
  //     Id:19,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture"
  //   },
  //   {
  //     Id:20,
  //     Name:"Sara Walter",
  //     contact : "1234567890",            
  //     contact1 : "7867668768",
  //     email : "sarawalter@gmail.com",  
  //     imageUrl:"womanProfilePicture2"
  //   }
  // ]

}
