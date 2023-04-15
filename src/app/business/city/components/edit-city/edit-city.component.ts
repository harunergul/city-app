import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '../../services/city.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {
  editCityForm: FormGroup;

  constructor(private cityService: CityService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditCityComponent>,
    private dialog: MatDialog) {

  }
  ngOnInit(): void {
    let name = '';
    let photoUrl = '';
    let id = '';
    if (this.data.city) {
      const city = this.data?.city;
      id = city.id;
      name = city.name;
      photoUrl = city.photoUrl;
    }

    this.editCityForm = this.fb.group({
      id: [id],
      name: [name, Validators.required],
      photoUrl: [photoUrl, Validators.required]
    })
  }

  get cityPhotoUrl() {
    return this.editCityForm.get('photoUrl').value;
  }

  editCity($event) {
    if (this.editCityForm.valid) {
      this.cityService.editCity(this.editCityForm.value).subscribe(result => {
        Swal.fire('Success', 'You successfully updated!', 'success')
        this.dialogRef.close({
          isSuccess: true,
          result: result
        })
      })
    } else {
      //this.dialog.o
    }
  }

}
