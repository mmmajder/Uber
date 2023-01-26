import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Register} from "../../../../store/actions/authentication.actions";
import {Store} from "@ngxs/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserRole} from "../../../../model/UserRole";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Output() switchForm = new EventEmitter();

  email = "";
  phoneNumber = "";
  password = "";
  password2 = "";
  name = "";
  lastName = "";
  city = "";

  hide = true;
  hide2 = true;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password2FormControl = new FormControl('', [Validators.required]);

  constructor(private _snackBar: MatSnackBar, private store: Store) {
  }

  registerNewUser() {
    this.store.dispatch(new Register({
      "email": this.email,
      "password": this.password,
      "name": this.name,
      "lastName": this.lastName,
      "phoneNumber": this.phoneNumber,
      "city": this.city,
      "userRole": UserRole.CUSTOMER
    })).subscribe({
      next: () => {
        this._snackBar.open("We sent you registration link", '', {
          duration: 3000,
          panelClass: ['snack-bar']
        })

      },
      error: () => this._snackBar.open("Wrong email or password.", '', {
        duration: 3000,
        panelClass: ['snack-bar']
      })
    });
  }

  switchToLoginForm() {
    this.switchForm.emit();
  }
}
