/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindRefService } from './wind-ref.service';

describe('WindRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindRefService]
    });
  });

  it('should ...', inject([WindRefService], (service: WindRefService) => {
    expect(service).toBeTruthy();
  }));
});
