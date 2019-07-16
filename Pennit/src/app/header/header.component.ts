import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  constructor(private authservIns: AuthService) { }

  ngOnInit() {
  }
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  onlogoutclick(){
    this.authservIns.logout();
  }

}
