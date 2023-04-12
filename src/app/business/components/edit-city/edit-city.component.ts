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
    let photo_url = this.data?.photo_url || '';
    if(this.data.city){
      const city = this.data?.city;
      name = city.name;
      photo_url = city.photo_url;
    }

    this.editCityForm =  this.fb.group({
      name: [name, Validators.required],
      photo_url: [photo_url, Validators.required]
    })
  }

  get cityPhotoUrl() {
    return this.editCityForm.get('photo_url').value;
  }

}
