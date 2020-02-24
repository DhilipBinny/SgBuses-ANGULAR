import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpencamdialogComponent } from './opencamdialog.component';

describe('OpencamdialogComponent', () => {
  let component: OpencamdialogComponent;
  let fixture: ComponentFixture<OpencamdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpencamdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpencamdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
