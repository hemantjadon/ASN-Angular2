import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';


@Component({
	selector : "my-app",
	template : `<h1>{{title}}</h1>`
})
export class HeroComponent {
	title : string = "Hemant";
	private function(){
		
	}
}

bootstrap(HeroComponent);