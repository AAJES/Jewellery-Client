import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage2',
  templateUrl: './homepage2.component.html',
  styleUrls: ['./homepage2.component.css',
    './homepage2.component2.css',
    './homepage2.component3.css',
    './homepage2.component4.css'
  ]
})
export class Homepage2Component implements OnInit{
    constructor() {}
  
    ngOnInit(): void {
      const collectionItem = document.querySelector('.collection-item');
      const collectBtn = document.querySelector('.collect-Btn');
  
      if (collectBtn) {
        collectBtn.addEventListener('click', (e: Event) => {
          e.preventDefault();
          if (collectionItem) {
            collectionItem.classList.toggle('d-block');
          }
        });
      }
  
      const moments = document.querySelector('.moments-item');
      const momentsBtn = document.querySelector('.moments-btn');
  
      if (momentsBtn) {
        momentsBtn.addEventListener('click', (e: Event) => {
          e.preventDefault();
          if (moments) {
            moments.classList.toggle('d-block');
          }
        });
      }
    }
  }
