import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CommentData } from '../comment_class';
import { HandleService } from '../handle.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [NgbRatingConfig]
})
export class CommentsComponent implements OnInit {

  avatars:string[] = [
    "assets/images/avatar_1.png",
    "assets/images/avatar_2.png",
    "assets/images/avatar_3.png",
    "assets/images/avatar_4.png",
    "assets/images/avatar_5.png",
    "assets/images/avatar_1.png"
  ];
  constructor(public config:NgbRatingConfig, public servInsC:HandleService) {
  }

  ngOnInit() {
    this.servInsC.comments_array = [];
    this.servInsC.fetch_comments();
  }

  resetform(commentform:NgForm){
    commentform.reset();
  }

  commentsubmit(commentform:NgForm){
    const comment_Ins = new CommentData(
      commentform.value.name,
      commentform.value.comment,
      commentform.value.rating
    )
    this.servInsC.postComment(comment_Ins);
    this.resetform(commentform);
  }

}
