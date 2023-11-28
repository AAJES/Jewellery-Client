import { Component, Input } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  
})
export class SidenavComponent {

  @Input() sideNavStatus:boolean = false;

 



  constructor(){}



}
