export class PostData{
    constructor(public title:string, public date:Date, public desc:string, public images:string[],public like:boolean, public id?:string){}
}