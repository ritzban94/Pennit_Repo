import { Component, OnInit, Inject } from '@angular/core';
import { HandleService } from 'src/app/handle.service';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private editpost,
   private dialogRef: MatDialogRef<EditComponent>,
    private servInsSE: HandleService) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onsubmit(editform: NgForm){
    this.servInsSE.update_post(this.editpost.id, editform.value.title, editform.value.desc)
    .then(result => {
      console.log(result);
      this.closeDialog();
      Swal.fire({
        type: 'success',
        title: 'Done',
        text: 'Entry Updated.',
        allowOutsideClick: false,
        width: '20rem'
      })
      this.servInsSE.posts_array = [];
      this.servInsSE.fetch_data();
    })
    .catch(error => {
      this.closeDialog();
      Swal.fire({
        type: 'error',
        title: 'Something went wrong!',
        text: error.message,
        allowOutsideClick: false,
        width: '20rem'
      })
    });
  }

}
