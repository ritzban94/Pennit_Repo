import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { HandleService } from 'src/app/handle.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username:string;
  email_id:string;
  number_posts:number = 0;
  number_photos:number = 0;
  number_likes:number = 0;
  loading:boolean = false;
  constructor(public authservice:AuthService, public servInsP:HandleService, public dialogRef:MatDialogRef<ProfileComponent>) {}

  ngOnInit() {
    this.loading = true;
    this.servInsP.fetch_data_profile();
    console.log("after fetch call..");
    setTimeout(()=>{
      this.email_id = this.authservice.user_info.email;
      this.username = this.email_id.charAt(0).toUpperCase() + this.email_id.substring(1, this.email_id.indexOf('@'));
      this.number_posts = this.servInsP.posts_array_fp.length;

      this.servInsP.posts_array_fp.forEach(element => {
        if(element.images != null)
          this.number_photos += element.images.length;
      });

      this.servInsP.posts_array_fp.forEach(element => {
        if(element.like == true)
          this.number_likes++;
      });
      this.loading = false;
    },2500);
  }

  closeDialog(){
    this.dialogRef.close();
    this.number_likes = 0;
    this.number_photos = 0;
    this.number_posts = 0;
  }

}
