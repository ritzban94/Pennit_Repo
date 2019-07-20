export class PostData{
    constructor(public title:string, public date:Date, public desc:string,public mood:string, public images:string[],public like:boolean,public show_desc_list:boolean,public id?:string){}
}