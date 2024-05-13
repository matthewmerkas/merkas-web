import { NgModule } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconButton } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JwtModule } from '@auth0/angular-jwt'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { getToken } from './functions/local-storage'
import { getHost } from './functions/api'
import { ErrorInterceptor } from './interceptors/error-interceptor'
import { HttpXsrfInterceptor } from './interceptors/xsrf-interceptor'
import { LoadingInterceptor } from './interceptors/loading-interceptor'
import { SitesModule } from './modules/sites/sites.module'
// import { TwentyModule } from './submodules/twenty/twenty.module'
// import { MariahModule } from './submodules/mariah/mariah.module'

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: [getHost()]
      }
    }),
    MatIconButton,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    // MariahModule,
    SitesModule
    // TwentyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
