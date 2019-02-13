import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  roles = ["King","Queen","Boy","Girl"];

  roleHasError = true;
  editForm: FormGroup;
  array: FormArray;
 
  get username(){
    return this.editForm.get('username');
  }
  get role(){
    return this.editForm.get('role');
  }
  get email(){
    return this.editForm.get('email');
  }
  get password(){
    return this.editForm.get('password');
  }

  constructor(private route: ActivatedRoute,private fb : FormBuilder, private _userService: UserService, private router: Router,private _location: Location){}

  data: any = {};

  ngAfterViewInit(){
    this.route.params.subscribe(params => {
      this._userService.editData(params['id']).subscribe(res => {
        this.data = res;
        this.editForm.patchValue(this.data);
      });
    });
  }

  ngOnInit(){
    this.editForm = this.fb.group({
      username : ['',Validators.required],
      role : [{value: '', disabled: true},Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      permissions : this.fb.group({
        view : [{value: false, disabled: true}],
        update : [{value: false, disabled: true}],
        delete : [{value: false, disabled: true}]
      }),
    });
  }  

  updateDataBack() {
        this._location.back();
  }

  updateData(username,email,password) {
    this.route.params.subscribe(params => {
       this._userService.updateData(username,email,password,params['id'])
       .subscribe((result)=>{
        this._location.back();
      },(err)=>{
        this._location.back();
      }) 
    });
  }
}