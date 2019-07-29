import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[randomavatar]'
})
export class RandomavatarDirective implements OnInit{

  avatars:string[] = [
    "assets/images/avatar_1.png",
    "assets/images/avatar_2.png",
    "assets/images/avatar_3.png",
    "assets/images/avatar_4.png",
    "assets/images/avatar_5.png"
  ];
  constructor(public element: ElementRef, public renderer: Renderer2) {}

  ngOnInit(){
    this.renderer.setStyle(this.element.nativeElement, 'background-image', 'url('+ this.avatars[Math.floor(Math.random()*5)] +')')
  }

}
