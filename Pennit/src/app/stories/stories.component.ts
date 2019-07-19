import { Component, OnInit} from '@angular/core';
import { HandleService } from '../handle.service';
import { PostData } from '../data_class';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import { PhotosComponent } from './photos/photos.component';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.25s ease-out', style({ opacity: 1 })),
          ]
        ),
        transition(
          ':leave', 
            [
              animate('0.15s ease-in', style({ opacity: 0 }))
            ]
        )
      ]
    )
  ]
})
export class StoriesComponent implements OnInit{
  
  selected:string;
  search_query_title:string;
  search_query_date:Date;
  view:string;
  avatars:string[] = [
    "assets/images/avatar_1.png",
    "assets/images/avatar_2.png",
    "assets/images/avatar_3.png",
    "assets/images/avatar_4.png",
    "assets/images/avatar_5.png",
    "assets/images/avatar_1.png"
  ];
  constructor(private servInsS: HandleService, private dialog:MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.selected = 'search_title';
    this.view = 'card';
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
    if(this.view === 'card')
      config.data = images.slice(1);
    else
      config.data = images;
    config.width = "80%";
    config.autoFocus = true;
    config.disableClose = true;
    config.hasBackdrop = true;
    this.dialog.open(PhotosComponent, config);
  }

  show_desc(post: PostData){
    post.show_desc_list = !post.show_desc_list;
  }

}
