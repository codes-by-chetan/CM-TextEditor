import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMEditorComponent } from './cmeditor.component';

describe('CMEditorComponent', () => {
  let component: CMEditorComponent;
  let fixture: ComponentFixture<CMEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
