import { Component,Input,Output,EventEmitter,OnInit } from '@angular/core';
import { Control,FORM_DIRECTIVES } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'tinymce';

import { Blog } from './blog.interface';

@Component({
	selector: 'tiny-mce',
	template: `<div class = tinymce>
					<textarea [(ngModel)]="blog.content" ></textarea>
				</div>`,
	directives: [FORM_DIRECTIVES]
})

export class TinyMCE implements OnInit{
	@Input() blog : Blog;
	@Output() typeEvent: EventEmitter<any> = new EventEmitter(true);

	constructor(){
		
	}

	ngOnInit(){
		this.loadTinyMCE()
			.then(()=>{});
	}
	
	private loadTinyMCE() : Promise<void>{
		return new Promise<void>((resolve : Function , reject : Function )=>{
			tinymce.init({
				document_root_url: `${window.location.origin}/static/ng-main/node_modules/tinymce`,
				theme_url: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/themes/modern/theme.min.js',
				skin_url: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/skins/lightgray/',
				selector: 'div.tinymce textarea',
				statusbar: false,

				content_css: `${window.location.origin}/static/ng-main/build/app/packages/blog-page/styles/tinymce-internal.css`,

				external_plugins: {
					"advlist" : "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/advlist/plugin.min.js",
					"link": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/link/plugin.min.js",
					"image": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/image/plugin.min.js",
					"autoresize": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/autoresize/plugin.min.js",
					"charmap": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/charmap/plugin.min.js",
					// "autosave": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/autosave/plugin.min.js",
					"code": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/code/plugin.min.js",
					"codesample": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/codesample/plugin.min.js",
					"contextmenu": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/contextmenu/plugin.js",
					"hr": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/hr/plugin.min.js",
					"insertdatetime": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/insertdatetime/plugin.min.js",
					"lists": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/lists/plugin.min.js",
					"paste": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/paste/plugin.min.js",
					// "save": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/save/plugin.min.js",
					"searchreplace": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/searchreplace/plugin.min.js",
					"table": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/table/plugin.min.js",
					"textpattern": "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.3.13/plugins/textpattern/plugin.min.js"
				},

				toolbar1: 'save undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image codesample',

				autoresize_overflow_padding: 25,

				image_description: false,
				image_dimensions: false,

				contextmenu: 'link image codesample | hr | bold italic | formats',

				insertdatetime_formats: ["%H:%M:%S", "%d-%m-%Y", "%I:%M:%S %p", "%d/%m/%Y"],

				paste_data_images: true,

				table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",



				setup: ( editor )=>{
					editor.on('init', function(){
						resolve();
					});

					const evt = Observable.fromEvent(editor,'keyup')
										  .debounceTime(100)
										  .distinctUntilChanged()
										  .subscribe(()=>{ 
											  this.blog.content = editor.getContent();
											  this.typeEvent.emit(null) 
										  });
				}
			});
		});
	}
}