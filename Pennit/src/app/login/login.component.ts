import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HandleService } from '../handle.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(private authservice: AuthService,private servInsL: HandleService) { }

  ngOnInit() {
  }

  onsubmit(loginform: NgForm){
    this.email = loginform.value.email;
    this.password = loginform.value.password;
    this.authservice.authenticate_login(this.email,this.password);
  }

}
