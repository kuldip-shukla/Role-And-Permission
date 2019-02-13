import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb : FormBuilder, private _userService: UserService, private router: Router){}

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
      })
    } 

  onSubmit(){
    this._userService.login(this.loginForm.value)
        .subscribe((result)=>{
          let navigationExtras: NavigationExtras = {
            queryParams: {
                "user_role": result.role
            }
          };
          this.router.navigate(['dashboard'],navigationExtras)
        },(err)=>{
          this.router.navigate(['login'])
        })     
  };
}
