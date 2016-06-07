//	Interface of a blog item.

import { BlogComment } from './blog-comment.interface';

export class Blog{
	url : string;
	id : string;
	timestamp : string;
	author_url : string;
	title : string;
	content : string;
	comments : BlogComment[];

	constructor(url=null , id=null , timestamp=null , author_url=null , title=null , content=null , comments=null){
		this.url = url;
		this.id = id;
		this.timestamp = timestamp;
		this.author_url = author_url;
		this.title = title;
		this.content = content;
		this.comments = comments;
	}
}