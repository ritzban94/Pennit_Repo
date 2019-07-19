import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PostData } from '../data_class';
import { HandleService } from '../handle.service';

@Component({
  selector: 'app-writeit',
  templateUrl: './writeit.component.html',
  styleUrls: ['./writeit.component.css']
})
export class WriteitComponent implements OnInit {

  data_form:FormGroup;
  constructor(private servInsW: HandleService) { }

  ngOnInit() {
    this.data_form = new FormGroup({
      'gen_data': new FormGroup({
         'title': new FormControl(null, Validators.required),
         'date': new FormControl(null, Validators.required),
         'story': new FormControl(null, Validators.required)
      }),
      'photos': new FormArray([])
    });
  }

  onformSubmit(){
    const post_instance = new PostData(
      this.data_form.get('gen_data.title').value,
      this.data_form.get('gen_data.date').value,
      this.data_form.get('gen_data.story').value,
      this.data_form.get('photos').value,
      false,
      false
    );
    console.log(post_instance);
    this.servInsW.postData(post_instance);
    this.form_reset();
  }

  form_reset(){
    this.data_form.reset();
  }

  addphotos(){
    const imgUrl = new FormControl(null, Validators.required);
    (<FormArray>this.data_form.get('photos')).push(imgUrl);
  }

  removeInput(index: number){
    (<FormArray>this.data_form.get('photos')).removeAt(index);
  }

}
