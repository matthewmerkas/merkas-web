import { FormArray, FormGroup } from '@angular/forms'

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

export function passwordMatchValidator(g: FormGroup): any {
  return g.get('new_password')?.value === g.get('confirm_new_password')?.value
    ? null
    : { mismatch: true }
}
