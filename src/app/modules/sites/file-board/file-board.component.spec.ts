import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FileBoardComponent } from './file-board.component'

describe('FileBoardComponent', () => {
  let component: FileBoardComponent
  let fixture: ComponentFixture<FileBoardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileBoardComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(FileBoardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
