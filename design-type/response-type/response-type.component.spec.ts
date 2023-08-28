import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTypeComponent } from './response-type.component';

describe('ResponseTypeComponent', () => {
  let component: ResponseTypeComponent;
  let fixture: ComponentFixture<ResponseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
