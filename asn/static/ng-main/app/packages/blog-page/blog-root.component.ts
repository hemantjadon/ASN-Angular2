import { Component } from '@angular/core';
import { RouteConfig,Router,RouteParams,ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { BlogService } from './services/blog.service';
import { BlogFeedComponent } from './blog-feed.component';
import { BlogConsoleRootComponent } from './blog-console-root.component';

@Component({
	selector: 'blog-page',
	template: "<router-outlet></router-outlet>",
	directives: [
		ROUTER_DIRECTIVES,
	],
	providers: [
		BlogService
	]
})
@RouteConfig([
	{
		path: '/',
		name: 'BlogFeedPage',
		component: BlogFeedComponent,
		useAsDefault: true
	},
	{
		path: '/console/...',
		name: 'BlogConsole',
		component: BlogConsoleRootComponent,
	}
])
export class BlogRootComponent{
	
}