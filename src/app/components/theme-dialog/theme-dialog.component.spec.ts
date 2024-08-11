import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ThemeDialogComponent } from './theme-dialog.component'

describe('AppsDialogComponent', () => {
  let component: ThemeDialogComponent
  let fixture: ComponentFixture<ThemeDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDialogComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ThemeDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
