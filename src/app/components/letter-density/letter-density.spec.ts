import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterDensity } from './letter-density';

describe('LetterDensity', () => {
  let component: LetterDensity;
  let fixture: ComponentFixture<LetterDensity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterDensity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterDensity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
