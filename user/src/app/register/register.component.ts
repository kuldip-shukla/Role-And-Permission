import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles = ["King","Queen","Boy","Girl"];

  roleHasError = true;
  registrationForm: FormGroup;
  array: FormArray;
 
  get username(){
    return this.registrationForm.get('username');
  }
  get role(){
    return this.registrationForm.get('role');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get password(){
    return this.registrationForm.get('password');
  }

  constructor(private fb : FormBuilder, private _userService: UserService, private router: Router){}

  ngOnInit(){
    
    this.registrationForm = this.fb.group({
      username : ['',Validators.required],
      role : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      permissions : this.fb.group({
        view : [true],
        update : [false],
        delete : [false]
      }),
    });
  }  

  validateRole(value){
    if(value === 'default'){
      this.roleHasError = true;
    }else{
      this.roleHasError = false;
    }
  }

  onSubmit(){
    this._userService.register(this.registrationForm.value)
        .subscribe((result)=>{
          this.router.navigate(['login'])
        },(err)=>{
          this.router.navigate(['register'])
        }) 
  }
}