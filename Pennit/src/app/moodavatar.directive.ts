import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[moodavatar]'
})
export class MoodavatarDirective {

  @Input('source') imgsource:string;
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(){
    this.renderer.setStyle(this.element.nativeElement, 'background-image', 'url('+ this.imgsource +')')
  }

}
