import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';

const scheduleRoutes: Routes = [
  {
    path: 'schedule',
    component: ScheduleComponent
  }
];

export const ScheduleRouting: ModuleWithProviders = RouterModule.forChild(scheduleRoutes);
