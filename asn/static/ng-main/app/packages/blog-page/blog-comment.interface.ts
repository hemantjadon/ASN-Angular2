// Interface for a blog comment.

export class BlogComment{
	url : string;
	id : string;
	timestamp : string;
	blog_url : string;
	author_url : string;
	comment : string;
	
	constructor(url=null , id=null , timestamp=null , blog_url=null , author_url=null , comment=null){
		this.url = url;
		this.id = id;
		this.timestamp = timestamp;
		this.blog_url = blog_url;
		this.author_url = author_url;
		this.comment = null;
	}
}
