import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignTypeComponent } from './design-type.component';

describe('DesignTypeComponent', () => {
  let component: DesignTypeComponent;
  let fixture: ComponentFixture<DesignTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
