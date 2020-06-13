import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.currentUserValue) {
      if (this.authService.currentUserValue.roles.includes('Admin')) {
        return true;
      } else {
        this.router.navigate(['/']);
        this.snackBarService.openSnackBar(
          'You are unauthorized to view that page',
          null,
          3000
        );
        return false;
      }
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
    }
  }
}
