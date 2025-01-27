import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconButton } from '@angular/material/button'
import { MatError, MatFormField } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput, MatLabel, MatSuffix } from '@angular/material/input'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { MatTooltip } from '@angular/material/tooltip'

@Component({
  selector: 'app-password-field',
  imports: [
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    MatTooltip
  ],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss'
})
export class PasswordFieldComponent {
  @Input() fc: FormControl = new FormControl<string>('')
  @Input() label: string = 'Password'
  showPassword = false
  tooltip = 'Show ' + this.label
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY

  onMouseEnter = () => {
    this.tooltip = (this.showPassword ? 'Hide ' : 'Show ') + this.label
  }
}
