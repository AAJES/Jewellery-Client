import { Component } from '@angular/core';
import * as annyang from 'annyang';

@Component({
  selector: 'app-soundcommand',
  templateUrl: './soundcommand.component.html',
  styleUrls: ['./soundcommand.component.css']
})
export class SoundcommandComponent {

  stream!: MediaStream;
  audioContext!: AudioContext;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];

  constructor() { }

  // ngOnInit() {
  //   this.startAudioCapture();
  // }

  // ngOnInit() {
  //   if (annyang) {
  //     annyang.setLanguage('en');
  //     annyang.debug();
  //     annyang.start();
  //     annyang.addCommands({
  //       'alert security breach': () => {
  //         // Send a request to the Spring Boot backend to trigger a security alert.
  //         this.sendSecurityAlert();
  //       }
  //     });
  //   }
  // }

  // sendSecurityAlert() {
  //   // Implement the code to send a security alert to the Spring Boot backend.
  // }

  recognizedText: string = '';

  
  // startListening() {
  //   this.speechRecognition.start()
  //     .subscribe(
  //       (text: string) => {
  //         this.recognizedText = text;
  //         this.sendCommandToBackend(text);
  //       },
  //       (error: any) => {
  //         console.error('Voice recognition error: ', error);
  //       }
  //     );
  // }

  sendCommandToBackend(command: string) {
    // Send the voice command to the Spring back-end.
    // You can use Angular's HttpClient to make an HTTP POST request to your Spring endpoint.
  }

  async startAudioCapture() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(this.stream);
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      this.mediaRecorder.onstop = () => {
        this.saveAudioRecording();
      };
      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  stopAudioCapture() {
    if (this.mediaRecorder && this.stream) {
      this.mediaRecorder.stop();
      this.stream.getTracks().forEach(track => track.stop());
      this.saveAudioRecording();
    }
  }

  saveAudioRecording() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
    // You can now send 'audioBlob' to your server or process it in your Angular application.
  }

}
