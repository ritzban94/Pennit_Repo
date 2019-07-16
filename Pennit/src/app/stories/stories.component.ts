import { Component, OnInit} from '@angular/core';
import { HandleService } from '../handle.service';
import { PostData } from '../data_class';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import { PhotosComponent } from './photos/photos.component';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit{
  
  selected:string;
  search_query_title:string;
  search_query_date:Date;
  constructor(private servInsS: HandleService, private dialog:MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.servInsS.posts_array = [];
    this.selected = 'search_title';
    this.servInsS.fetch_data();
  }

  focusout_title(){
    this.search_query_title = null;
  }

  likepost(post:PostData){
    post.like = true;
    this.servInsS.like_post(post.id)
    .then(
      result => {
        this.snackbar.open("You liked this entry!!","Bookmark",{
          duration: 1200,
        });
      }
    )
    .catch(
      error => {
        this.snackbar.open("Some error occured:"+error.message,"Error",{
          duration: 1200,
        });
      }
    )
  }

  clickdelete(id:string){
    this.servInsS.delete_post(id);
  }

  editPost(post: PostData){
    const config = new MatDialogConfig();
    config.data = {
      'id': post.id,
      'title': post.title,
      'desc': post.desc
    };
    config.width = "50%";
    config.autoFocus = true;
    config.disableClose = true;
    config.hasBackdrop = true;
    this.dialog.open(EditComponent, config);
  }

  viewImages(images:string[]){
    const config = new MatDialogConfig();
    config.data = images.slice(1);
    config.width = "80%";
    config.autoFocus = true;
    config.disableClose = true;
    config.hasBackdrop = true;
    this.dialog.open(PhotosComponent, config);
  }

}
