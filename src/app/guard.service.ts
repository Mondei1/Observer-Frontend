import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate() {
    if(!this.accountService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}