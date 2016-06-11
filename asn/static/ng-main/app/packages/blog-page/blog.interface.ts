//	Interface of a blog item.

import { BlogComment } from './blog-comment.interface';

export class Blog{
	url : string;
	id : string;
	timestamp : string;
	publication_date : string;
	author_url : string;
	title : string;
	description : string;
	category : string;
	content : string;
	header_color_hash : string;
	is_published : boolean;
	comments : BlogComment[];

	constructor(url=null , id=null , timestamp=null , publication_date = null , author_url=null,
				title=null , description=null , category=null , content=null , header_color_hash="#8bc34a", 
				is_published=false , comments=null){
		this.url = url;
		this.id = id;
		this.timestamp = timestamp;
		this.publication_date = publication_date;
		this.author_url = author_url;
		this.title = title;
		this.description = description;
		this.category = category;
		this.content = content;
		this.header_color_hash = header_color_hash;
		this.is_published = is_published;
		this.comments = comments;
	}
}