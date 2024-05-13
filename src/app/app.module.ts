import { NgModule } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { MatTooltip } from '@angular/material/tooltip'
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
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatToolbar,
    MatTooltip,
    NgOptimizedImage,
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
