import { Component, OnInit } from '@angular/core';
import { HandleService } from '../handle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  constructor(private servIns: HandleService) { }

  ngOnInit() {
  }
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  onlogoutclick(){
    this.servIns.logout();
  }

}
