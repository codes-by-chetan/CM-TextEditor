import { TestBed } from '@angular/core/testing';

import { CMEditorService } from './cmeditor.service';

describe('CMEditorService', () => {
  let service: CMEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
