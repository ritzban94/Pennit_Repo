import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { imageDesc } from './imageDesc';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  providers: [NgbCarouselConfig]
})
export class EntriesComponent implements OnInit {

  imageUrlArray: imageDesc[] = [];
  constructor(config: NgbCarouselConfig, public router: Router, public authservInsE: AuthService) {
    config.interval = 3500;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.imageUrlArray.push(new imageDesc("assets/images/carousel5.jpg","Record special events..","A diary is like a completely personal, written photo, recording the things only you saw in as much or as little detail as you like."));
    this.imageUrlArray.push(new imageDesc("assets/images/carousel2.jpg","Record your thoughts and feelings..","You remember how things made you feel on certain days or in certain places, so your memory is more detailed."));
    this.imageUrlArray.push(new imageDesc("assets/images/carousel3.jpg","Why not try a foreign language?","Practise your language skills and improve your vocab, without worrying about mistakes – it’s for you, not for anyone else!"));
    this.imageUrlArray.push(new imageDesc("assets/images/carousel4.jpg","Kind of therapy after bad days..","Getting your feelings written down on paper feels much better than keeping them to yourself."));
    this.imageUrlArray.push(new imageDesc("assets/images/carousel1.jpg","Leave the future You something to look back on!","In a year or so, you can see how you have developed as a person. If you revisit a place, you can read what you saw or felt last time. Maybe you’ll even show future generations what you used to be like!"));
  }

  carry(){
    this.router.navigate(['/login']);
  }

}
