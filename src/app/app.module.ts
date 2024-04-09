import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ErrorInterceptor } from './interceptors/error-interceptor'
import { HttpXsrfInterceptor } from './interceptors/xsrf-interceptor'
import { LoadingInterceptor } from './interceptors/loading-interceptor'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ReactiveFormsModule } from '@angular/forms'
import { JwtModule } from '@auth0/angular-jwt'
import { getToken } from './functions/local-storage'
import { getHost } from './functions/api'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: [getHost()]
      }
    }),
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
