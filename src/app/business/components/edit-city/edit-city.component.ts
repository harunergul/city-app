import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit{
  editCityForm: FormGroup;

  constructor(private fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(): void { 
    let name = '';
    let photoUrl = this.data?.photoUrl || '';
    if(this.data.city){
      const city = this.data?.city;
      name = city.name;
      photoUrl = city.photoUrl;
    }

    this.editCityForm =  this.fb.group({
      name: [name, Validators.required],
      photoUrl: [photoUrl, Validators.required]
    })
  }

  get cityPhotoUrl() {
    return this.editCityForm.get('photoUrl').value;
  }

}
