import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  result: boolean;

  constructor(private account: AccountService, private route: Router) { }

  ngOnInit() {
    this.result = null;
  }

  async login() {
    this.result = await this.account.requestToken(this.username, this.password);
    if(this.result) {
      this.route.navigate(['/dashboard'])
    }
  }

}
