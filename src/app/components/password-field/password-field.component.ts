import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconButton } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconButton,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss'
})
export class PasswordFieldComponent {
  @Input() fc: FormControl = new FormControl<string>('')
  @Input() label: string = 'Password'
  showPassword = false
}
