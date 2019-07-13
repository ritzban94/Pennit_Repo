import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteitComponent } from './writeit.component';

describe('WriteitComponent', () => {
  let component: WriteitComponent;
  let fixture: ComponentFixture<WriteitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
