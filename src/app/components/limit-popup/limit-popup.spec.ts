import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitPopup } from './limit-popup';

describe('LimitPopup', () => {
  let component: LimitPopup;
  let fixture: ComponentFixture<LimitPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
