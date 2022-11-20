import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName: string = '';
  public password: string = '';
  public formdata: any;
  public haveError: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl("")
    });
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;


    if (this.userName == this.password) {
      console.log('son iguales')
      this.router.navigate(['/dashboard'])
    } else {
      this.haveError = true;
    }


  }

}
