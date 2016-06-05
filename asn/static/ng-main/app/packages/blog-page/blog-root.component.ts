import { Component } from '@angular/core';
import { RouteConfig,Router,RouteParams,ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { BlogFeedComponent } from './blog-feed.component';
import { BlogService } from './services/blog.service';

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
	}
])
export class BlogRootComponent{
	
}