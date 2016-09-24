import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRouting } from './schedule.routing';
import { ScheduleComponent } from './schedule.component';
import { ScheduleResolve } from './schedule-resolve.guard';

@NgModule({
  imports : [
    CommonModule,
    ScheduleRouting
  ],
  declarations : [
    ScheduleComponent
  ],
  providers : [
    ScheduleResolve
  ]
})
export class ScheduleModule {}
