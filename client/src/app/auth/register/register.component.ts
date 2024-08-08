import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoading: boolean = false;
  form: FormGroup;
  error: string = "";
  router: Router = inject(Router)
  sameEmail = null;

  constructor(private userService:UserService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
      gender: new FormControl('male',)
    })
  }



  onSubmit() {
    if (this.form.valid && this.form.get('password')?.value == this.form.get('confirm_password')?.value) {
      console.log(this.form.value);

      let user = {

        name: this.form.value.name,
        phone: this.form.value.phone,
        gender: this.form.value.gender,
        email: this.form.value.email,
        password: this.form.value.password
      }
      console.log(user);

      this.userService.register(user).subscribe({
        next: (value) => {
          console.log(value)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: value.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.router.navigate(['/login']);
          this.form.reset()
        },
        error: (err) => {
          console.log(err)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: err.error.message ? err.error.message : err.error,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
