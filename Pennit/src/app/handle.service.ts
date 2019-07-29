import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostData } from './data_class';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { CommentData } from './comment_class';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './login/auth.service';

@Injectable()
export class HandleService {
  loggedin:boolean = false;
  authfailed:boolean;
  loading:boolean;
  post_fetch:boolean;
  post_fetch_comment:boolean;
  postin_comment:boolean;
  posts_array = [];
  posts_array_fp = [];
  comments_array = [];
  error_msg:string = null;
  constructor(public db:AngularFireDatabase, public http:HttpClient, public authservice:AuthService, public snackbar:MatSnackBar) { }

  fetch_data_profile(){
    this.posts_array_fp = [];
    this.http.get<{[key:string]: PostData}>('https://pennit-75a71.firebaseio.com/posts'+ this.authservice.user_info.uid +'.json')
    .pipe(map(response => {
      for(const key in response){
        if(response.hasOwnProperty(key))
          this.posts_array_fp.push({...response[key], id: key});
      }
    }))
    .subscribe(
      data => {
        console.log(this.posts_array_fp.length);
        console.log(this.posts_array_fp);
      },
      error => {
        this.error_msg = error.message;
      },
      () => {
        this.error_msg = null;
      }
    )
  }
  
  postData(data:PostData){
    this.post_fetch = true;
    setTimeout(
      ()=>{
        this.http.post<PostData>(
          'https://pennit-75a71.firebaseio.com/posts'+ this.authservice.user_info.uid +'.json',
          data,
          {
            headers: new HttpHeaders({'Custom_header':'CH1'})
          }
        ).subscribe(responseData => {
          console.log(responseData);
        },error => {
          this.post_fetch = false;
          Swal.fire({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            allowOutsideClick: false,
            width: '20rem'
          });
        }, ()=>{
          this.post_fetch = false;
          Swal.fire({
            type: 'success',
            title: 'Written',
            text: 'Your Entry is saved!',
            allowOutsideClick: false,
            width: '20rem'
          });
        });
      },700
    );
  }

  fetch_data(){
    this.post_fetch = true;
    this.posts_array = [];
    this.http.get<{[key:string]: PostData}>('https://pennit-75a71.firebaseio.com/posts'+ this.authservice.user_info.uid +'.json')
    .pipe(map(response => {
      for(const key in response){
        if(response.hasOwnProperty(key))
          this.posts_array.push({...response[key], id: key});
      }
    }))
    .subscribe(
      data => {
        console.log(this.posts_array.length);
        console.log(this.posts_array);
      },
      error => {
        this.post_fetch = false;
        this.error_msg = error.message;
      },
      () => {
        this.post_fetch = false;
        this.error_msg = null;
      }
    )
  }

  delete_post(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover your entry!",
      type: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        //Implemented firebase database object instead of http delete as it was not working.
        this.db.object('/posts'+ this.authservice.user_info.uid +'/'+ id).remove()    
        .then(response => {
          console.log(response);
          Swal.fire({
             type: 'success',
             title: 'Deleted!',
             text: 'Your entry has been deleted.',
             allowOutsideClick: false,
             width: '20rem'
          })
          this.posts_array = [];
          this.fetch_data();
        })
        .catch(error => {
          Swal.fire({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            allowOutsideClick: false,
            width: '20rem'
          })
        })
      }
    });
  }

  update_post(id:string, title:string, desc:string): Promise<void>{
    return this.db.object('/posts'+ this.authservice.user_info.uid +'/'+ id).update({
      'title': title,
      'desc': desc
    });
  }

  like_post(id:string): Promise<void>{
    return this.db.object('/posts'+ this.authservice.user_info.uid +'/'+ id).update({
      'like': true
    });
  }

  postComment(data:CommentData){
    this.postin_comment = true;
    setTimeout(
      ()=>{
        this.http.post<CommentData>(
          'https://pennit-75a71.firebaseio.com/comments.json',
          data
        ).subscribe(responseData => {
          console.log(responseData);
        },error => {
          this.postin_comment = false;
          this.snackbar.open("Error occured:"+error.message,"Error",{
            duration: 1000
          });
        }, ()=>{
          this.postin_comment = false;
          this.snackbar.open("Comment posted","Done",{
            duration: 1000
          });
          this.comments_array = [];
          this.fetch_comments();
        });
      },700
    );
  }

  fetch_comments(){
    this.post_fetch_comment = true;
    this.http.get<{[key:string]: CommentData}>('https://pennit-75a71.firebaseio.com/comments.json')
    .pipe(map(response => {
      for(const key in response){
        if(response.hasOwnProperty(key))
          this.comments_array.push({...response[key], id: key});
      }
    }))
    .subscribe(
      data => {
        console.log(this.comments_array.length);
        console.log(this.comments_array);
      },
      error => {
        this.post_fetch_comment = false;
        this.error_msg = error.message;
      },
      () => {
        this.post_fetch_comment = false;
        this.error_msg = null;
      }
    )
  }
}
