/**
 * Represents a blog
 *
 * @param {string} title - Title of the blog
 */
class Blog {
	constructor(title) {
		this.title = title;

		this.blogs = [];
		this.blogId = 1;
		this.getBlogsFromLocalStorage();
	}

	/**
	 * Creates a new blogpost and saves it to the blogs array. Also saves to localStorage.
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
		this.saveBlogsToLocalStorage();
	}
	/**
	 * Removes a blog post from the array
	 * @param  {number} id - id of the blogpost to remove
	 */
	removeBlog(id) {
		for (let i = 0; i < this.blogs.length; i++) {
			if (this.blogs[i].id === id) {
				this.blogs.splice(i, 1);
				this.saveBlogsToLocalStorage();
				return;
			}
		}
	}
	/**
	 * Saves the blog array and the current blog id to the localStorage
	 */
	saveBlogsToLocalStorage() {
		localStorage.clear();
		localStorage.setItem("blogs", JSON.stringify(this.blogs));
		localStorage.setItem("blogId", this.blogId.toString());
		console.log(localStorage);
	}
	/**
	 * Gets the blog list and the next blog id from localStorage if there is any, otherwise return
	 */
	getBlogsFromLocalStorage() {
		if (localStorage.length === 0) return;
		this.blogs.splice(0, this.blogs.length);

		let storedBlogs = JSON.parse(localStorage.getItem("blogs"));
		storedBlogs.forEach((blog) => {
			this.blogs.push(blog);
		});
		this.blogId = +localStorage.getItem("blogId");
	}
}
