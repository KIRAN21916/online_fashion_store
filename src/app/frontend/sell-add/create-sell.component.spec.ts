import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellComponent } from './create-sell.component';

describe('CreateSellComponent', () => {
  let component: CreateSellComponent;
  let fixture: ComponentFixture<CreateSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
