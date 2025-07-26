import { TestBed } from '@angular/core/testing';

import { ImageOptimizationService } from './image-optimization';

describe('ImageOptimizationService', () => {
  let service: ImageOptimizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageOptimizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
