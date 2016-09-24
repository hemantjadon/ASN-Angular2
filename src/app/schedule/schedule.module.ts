import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRouting } from './schedule.routing';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  imports : [
    CommonModule,
    ScheduleRouting
  ],
  declarations : [
    ScheduleComponent
  ],
  providers : []
})
export class ScheduleModule {}
