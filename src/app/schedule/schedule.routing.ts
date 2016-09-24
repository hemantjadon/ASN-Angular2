import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ScheduleResolve } from './schedule-resolve.guard';

const scheduleRoutes: Routes = [
  {
    path: 'schedule',
    component: ScheduleComponent,
    resolve: [ ScheduleResolve ],
  }
];

export const ScheduleRouting: ModuleWithProviders = RouterModule.forChild(scheduleRoutes);
