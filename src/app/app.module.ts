import { NgModule, isDevMode } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent
} from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormField } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { MatTooltip } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JwtModule } from '@auth0/angular-jwt'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { DialogComponent } from './components/dialog/dialog.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { getToken } from './functions/local-storage'
import { getHost } from './functions/api'
import { ErrorInterceptor } from './interceptors/error-interceptor'
import { HttpXsrfInterceptor } from './interceptors/xsrf-interceptor'
import { LoadingInterceptor } from './interceptors/loading-interceptor'
import { SitesModule } from './modules/sites/sites.module'
import { PasswordFieldComponent } from './components/password-field/password-field.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { DynamicModule } from 'ng-dynamic-component'
import { ServiceWorkerModule } from '@angular/service-worker'

@NgModule({
  declarations: [AppComponent, DialogComponent, ToolbarComponent],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DynamicModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: [getHost()]
      }
    }),
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDialogClose,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatToolbar,
    MatTooltip,
    NgOptimizedImage,
    ReactiveFormsModule,
    SitesModule,
    MatCardActions,
    MatButton,
    MatProgressSpinner,
    PasswordFieldComponent,
    MatDialogContent,
    MatDialogActions,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
