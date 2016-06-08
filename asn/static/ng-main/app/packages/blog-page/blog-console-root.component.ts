import { Component } from '@angular/core';
import { RouteConfig,Router,RouteParams,ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { BlogConsoleService } from './services/blog-console.service';
import { BlogConsoleComponent } from './blog-console.component';
import { BlogEditComponent } from './blog-edit.component';

@Component({
	selector: 'blog-console',
	template: '<router-outlet></router-outlet>',
	directives: [
		ROUTER_DIRECTIVES,
	],
	providers: [
		BlogConsoleService,
	]
})
@RouteConfig([
	{
		path: '/',
		name: 'BlogConsole',
		component: BlogConsoleComponent,
		useAsDefault: true,
	},
	{
		path: '/edit/:id',
		name: 'BlogEdit',
		component: BlogEditComponent,
	}
])
export class BlogConsoleRootComponent{}