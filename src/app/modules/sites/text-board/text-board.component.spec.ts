import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextBoardComponent } from './text-board.component'

describe('TextBoardComponent', () => {
  let component: TextBoardComponent
  let fixture: ComponentFixture<TextBoardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextBoardComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TextBoardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
