import { Pipe, PipeTransform } from '@angular/core';
import { PostData } from './data_class';
import { HandleService } from './handle.service';

@Pipe({
  name: 'filterpipe'
})
export class FilterPipe implements PipeTransform {

  constructor(){}

  transform(value: PostData[], arg_title:string, arg_date:Date): PostData[] {
    const search_array: PostData[] = [];
    if(arg_title == null && arg_date == null){
      return value;
    }
    else if(arg_title != null){
      value.forEach(element => {
        if(element.title.toLowerCase().includes(arg_title.toLowerCase()))
          search_array.push(element);
      });
      return search_array;
    }
    else if(arg_date != null){
      let giv_date = new Date(arg_date);
      value.forEach(element => {
        let post_date = new Date(element.date);
        if(post_date.getTime() == giv_date.getTime())
          search_array.push(element);
      });
      return search_array;
    }
  }

}
