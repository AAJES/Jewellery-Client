import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http : HttpClient) { 
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        console.log('Speech recognition started');
      };

      this.recognition.onend = () => {
        console.log('Speech recognition stopped');
      };
    } else {
      console.error('Speech recognition is not supported in this browser.');
    }
  }

  cartItems : any[] = [];

  addToCart(item : any) {
    this.cartItems.push(item);
    console.log(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  increaseQuantity(item : any) {
    item.quantity++;
  }
  
  decreaseQuantity(item : any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  calculateTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private apiUrl = 'http://localhost:5050/jewellery/sound'; // Update with your Spring Boot API endpoint

  recognizeSoundCommand(audioData: any) {
    // Implement logic to send audio data to the Spring Boot backend
    return this.http.post(this.apiUrl, audioData);
  }

  recognition: any;

  

  // startRecognition(): Observable<string> {
  //   if (this.recognition) {
  //     this.recognition.start();
  //     return new Observable<string>((observer) => {
  //       this.recognition.onresult = (event: SpeechRecognitionEvent) => {
  //         const transcript = event.results[0][0].transcript;
  //         observer.next(transcript);
  //       };

  //       this.recognition.onerror = (error: Event) => {
  //         observer.error(error);
  //       };
  //     });
  //   } else {
  //     return new Observable<string>();
  //   }
  // }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }


}
