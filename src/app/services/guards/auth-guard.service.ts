import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {GithubService} from '../github/github.service'

@Injectable()
export class AuthGuardService implements CanActivate{


  constructor(private router: Router,
              public githubService:GithubService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const url: string = state.url;
    const token = this.githubService.getToken();
    console.log(token)
    if (token) {
      if (url === '/') {
        this.router.navigate(['./battle']);
      }
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }


}