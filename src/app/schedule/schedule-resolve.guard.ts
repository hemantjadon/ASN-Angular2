import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';

import { TitleService } from '../shared/services/title.service';

@Injectable()
export class ScheduleResolve implements Resolve<any> {
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) {}

  resolve(){
    this.titleService.setTitle('schedule');
  }
}
