import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilcamComponent } from './utilcam.component';

describe('UtilcamComponent', () => {
  let component: UtilcamComponent;
  let fixture: ComponentFixture<UtilcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
