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

  constructor(private config:NgbRatingConfig, private servInsC:HandleService) {
  }

  ngOnInit() {
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
