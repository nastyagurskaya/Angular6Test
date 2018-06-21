import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCheckPostComponent } from './createcheckpost.component';

describe('CreatecheckpostComponent', () => {
  let component: CreateCheckPostComponent;
  let fixture: ComponentFixture<CreateCheckPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCheckPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCheckPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
