class Blog {
	constructor(title) {
		this.title = title;

		this.blogs = [];
		this.blogId = 1;
	}

	/**
	 * Creates a new blogpost and saves it to the blogs array.
	 * @param  {string} heading - Heading of the blogpost
	 * @param  {URL} picture - Title picture URL
	 * @param  {string} blogText - Content of the blogpost
	 */
	createBlog(heading, picture, blogText) {
		//TODO: Ha detta?
		if (heading.length < 2 || picture.length < 3 || blogText.length < 10)
			return;
		const today = new Date();
		let newBlog = {
			id: this.blogId,
			header: heading,
			pic: picture,
			text: blogText,
			publishDate: today,
		};
		this.blogId++;
		this.blogs.push(newBlog);
	}
	/**
	 * Removes a blog post from the array
	 * @param  {number} id - id of the blogpost to remove
	 */
	removeBlog(id) {
		for (let i = 0; i < this.blogs.length; i++) {
			if (this.blogs[i].id === id) {
				this.blogs.splice(i, 1);
				return;
			}
		}
	}
}
