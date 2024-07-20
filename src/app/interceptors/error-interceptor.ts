import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { catchError, mergeMap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { Store } from '../stores/store'

export interface HttpError extends HttpErrorResponse {
  code: string
}

const formatError = (str: string) => {
  return truncate(
    str
      .replace(/jwt/g, (match) => match.toUpperCase()) // jwt
      .replace(/\.+$/, ''), // remove trailing full stop
    56
  )
}

const truncate = (str: string, max: number) =>
  str.length > max ? str.substring(0, max) + '…' : str

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  // Source: https://stackoverflow.com/a/53379715
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpError) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('Error:', err.error.message)
        } else {
          // The backend returned an unsuccessful response code.
          if (err.status === 0) {
            this.openSnackbar('Please check your connection')
          } else if (
            err.status === 401 &&
            err.error?.code === 'invalid_token'
          ) {
            // Attempt to refresh token
            console.debug('Refreshing token...')
            return this.store.user.refresh().pipe(
              catchError((err) => {
                this.openSnackbar(err)
                return this.store.ui.onLogout()
              }),
              mergeMap((res) => {
                const clone = req.clone({
                  setHeaders: { authorization: `Bearer ${res.token}` }
                })
                return next.handle(clone)
              })
            )
          } else if (err.status === 521) {
            this.openSnackbar(
              "Cloudflare can't connect to our server. Try again in a few minutes"
            )
          } else {
            // The response body may contain clues as to what went wrong,
            console.error(
              `Status: ${err.status}\nError: ${JSON.stringify(err.error)}`
            )
            this.openSnackbar(err)
          }
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        return throwError(err)

        // or just return nothing:
        // return EMPTY;
      })
    )
  }

  openSnackbar = (err: HttpError | string) => {
    if (typeof err === 'string') {
      this.store.ui.openSnackbar(formatError(err))
    } else if (typeof err.error?.message === 'string') {
      this.store.ui.openSnackbar(formatError(err.error.message))
    } else if (typeof err.error === 'string') {
      this.store.ui.openSnackbar(formatError(err.error))
    } else {
      this.store.ui.openSnackbar(formatError(err.message))
    }
  }
}
