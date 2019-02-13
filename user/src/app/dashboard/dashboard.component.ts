import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  
  constructor(private _userService: UserService,private http: HttpClient, private router:Router,private route: ActivatedRoute,private _location: Location) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };

    this.route.queryParamMap
    .pipe(map(params => params.get('page')))
            .subscribe(page => this.config.currentPage = page);

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`user ${i}`);
    }
  }

  pageChange(newPage: number) {
    this.router.navigate([],{ relativeTo: this.route, queryParams: { page: newPage },queryParamsHandling: "merge"})
	}

  config: any; 
  collection = [];
  sub: any;
  users:any;
  role:String;
  datas:any[]=[];
  flag:boolean;
  userFilter: any = { username: '', email:'' };

  
  ngOnInit() {
    this._userService.displayData()
      .subscribe(res => 
      {
        this.users = res;
        this.sortBy('role'); 
        switch(this.role) { 
          case "King": { 
            for(let i=0;i<this.users.length;i++){
              if(this.users[i].role === ''){}
              else{
                if(this.users[i].role === 'King'){
                  this.users[i].flag = false 
                }else{
                  this.users[i].flag=true
                }
                this.datas.push(this.users[i])
              }
            }
            break; 
          } 
          case "Queen": { 
            for(let i=0;i<this.users.length;i++){
              if(this.users[i].role === 'King'){}
              else{
                if(this.users[i].role === 'King'|| this.users[i].role === 'Queen'){
                  this.users[i].flag = false 
                }else{
                  this.users[i].flag=true
                }
                this.datas.push(this.users[i])
              }
            }
            break; 
          } 
          case "Boy": {
            for(let i=0;i<this.users.length;i++){
              if(this.users[i].role === 'King' || this.users[i].role === 'Queen'){}
              else{
                if(this.users[i].role === 'Boy'|| this.users[i].role === 'Girl'){
                  this.users[i].flag = false 
                }else{
                  this.users[i].flag=true
                }
                this.datas.push(this.users[i])
              }
            }
            break;    
          } 
          case "Girl": { 
            for(let i=0;i<this.users.length;i++){
              if(this.users[i].role === 'King' || this.users[i].role === 'Queen'){}
              else{
                if(this.users[i].role === 'Boy'|| this.users[i].role === 'Girl'){
                  this.users[i].flag = false 
                }else{
                  this.users[i].flag=true
                }
                this.datas.push(this.users[i])
              }
            }
            break; 
          }  
        }
      }); 
    this.getUserRole();
  }
  
  getUserRole() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.role = params["user_role"]
    });
  }
  
  sortBy(field: string) {

    this.users.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
            return -1;
        } else if (a[field] > b[field]) {
            return 1;
        } else {
            return 0;
        }
    });
    this.users = this.users;
}

  delete(id) {
    this._userService.deleteData(id)
        .subscribe((result)=>{
          this.ngOnInit()
        },(err)=>{
          console.log(err)
        }) 
  }
}
