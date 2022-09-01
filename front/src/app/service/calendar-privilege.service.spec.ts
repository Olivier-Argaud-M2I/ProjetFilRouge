import { TestBed } from '@angular/core/testing';

import { CalendarPrivilegeService } from './calendar-privilege.service';

describe('CalendarPrivilegeService', () => {
  let service: CalendarPrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarPrivilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
