import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { APIEndpoints } from './api-endpoints';
import { AppComponent } from './components/app.component';

bootstrap(AppComponent,[ HTTP_PROVIDERS , AUTH_PROVIDERS , APIEndpoints ]);