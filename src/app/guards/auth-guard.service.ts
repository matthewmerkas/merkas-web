import { inject, Injectable } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { getToken } from '../functions/local-storage'
import { Store } from '../stores/store'

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private store: Store) {}

  canActivate(): boolean {
    if (getToken()) {
      return true
    } else {
      this.store.ui.openSnackbar(
        'You must be logged-in to access this resource'
      )
      this.router.navigate(['/'])
      return false
    }
  }
}

export const canActivate: CanActivateFn = () => {
  return inject(AuthGuard).canActivate()
}
