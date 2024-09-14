import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfmFormComponent } from './wfm-form.component';

describe('WfmFormComponent', () => {
  let component: WfmFormComponent;
  let fixture: ComponentFixture<WfmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WfmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
