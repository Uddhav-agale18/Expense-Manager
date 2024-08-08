import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({})
   user:string = ''
  constructor(private router: Router,private userService:UserService ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('ujagale@gmail.com', [Validators.required]),
      password: new FormControl('12345678', [Validators.required])
    })

  }

  submit() {
    if (this.form.valid)
      console.log(this.form.value)
      this.userService.login(this.form.value).subscribe({
        next: (value) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: value.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            
          });
          let userDetail = {
           name:value.user.name,
           url:value.user.imageUrl
          }
          localStorage.setItem('user',JSON.stringify(userDetail))
          
          
          this.router.navigate(['dashboard'])
        },
        error(err) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }

      })
     
  }

}
