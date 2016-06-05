import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './packages/app.component';

bootstrap(AppComponent,[ HTTP_PROVIDERS , AUTH_PROVIDERS ]);