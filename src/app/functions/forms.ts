import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms'

export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((o, p) => o && o[p], obj)
}

export function getNestedFormGroup(
  formGroup: FormGroup,
  path: string
): FormGroup {
  return path.split('.').reduce((o, p) => o && <FormGroup>o.get(p), formGroup)
}

export function getFormArray(formArray: FormArray, index: number): FormArray {
  return formArray.at(index).value
}

export function getFormArrays(
  formGroup: FormGroup,
  formArrayName: string
): FormArray {
  return <FormArray>formGroup.get(formArrayName)
}

export function getFormArraysControls(
  formGroup: FormGroup,
  formArrayName: string
): FormGroup[] {
  return <FormGroup[]>getFormArrays(formGroup, formArrayName).controls
}

export function matchValidator(key1: string, key2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const c1 = control.get(key1)
    const c2 = control.get(key2)
    if (!c1 || !c2) {
      return null
    }
    if (c1.value === c2.value) {
      const errors = c2.errors || {}
      delete errors['mismatch']
      c2.setErrors(errors)
      c2.updateValueAndValidity({ emitEvent: false, onlySelf: true })
      return null
    } else {
      const errors = c2.errors || {}
      errors['mismatch'] = true
      c2.setErrors(errors)
      return { mismatch: true }
    }
  }
}
