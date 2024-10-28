import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMTextEditorComponent } from './cm-text-editor.component';

describe('CMTextEditorComponent', () => {
  let component: CMTextEditorComponent;
  let fixture: ComponentFixture<CMTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMTextEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
