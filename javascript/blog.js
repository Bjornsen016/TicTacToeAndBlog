/**
 * @file Blog functionallity. Manages a bloglist and its blogs.
 * @author Kim Björnsen Åklint
 */

/**
 * A class which handles one array with blogposts
 * @class
 * @classdesc Handles and stores blogposts
 */
export class Blog {
	/**
	 * Creates a new array with blogs. Gets the list from localStorage if there is any.
	 * @constructor
	 * @param {string} title - Title of the blog
	 * @param {bool} test - If it's a test or not. Default is false.
	 * @returns {Blog}
	 */
	constructor(title, test = false) {
		this.title = title;

		this.blogs = [];
		this.blogId = 1;
		if (test) {
			this.getBlogsFromLocalStorage(true);
		} else {
			this.getBlogsFromLocalStorage();
		}
	}

	/**
	 * Creates a new blogpost and saves it to the blogs array. Also saves to localStorage.
	 * @param  {string} heading - Heading of the blogpost
	 * @param  {URL} picture - Title picture URL
	 * @param  {string} blogText - Content of the blogpost
	 * @param {bool} test - If it's a test or not. Default is false.
	 * @returns {void}
	 */
	createBlog(heading, picture, blogText, test = false) {
		if (heading.length < 2 || picture.length < 3 || blogText.length < 10)
			return;

		let newBlog = {
			id: this.blogId,
			header: heading,
			pic: picture,
			text: blogText,
			publishDate: new Date(),
		};
		this.blogId++;
		this.blogs.push(newBlog);
		if (test) {
			this.saveBlogsToLocalStorage(true);
		} else {
			this.saveBlogsToLocalStorage();
		}
	}
	/**
	 * Removes a blog post from the array
	 * @param  {number} id - id of the blogpost to remove
	 * @param {bool} test - If it's a test or not. Default is false.
	 * @returns {void}
	 */
	removeBlog(id, test = false) {
		if (id === undefined || id === null || isNaN(id)) return;

		for (let i = 0; i < this.blogs.length; i++) {
			if (this.blogs[i].id === id) {
				this.blogs.splice(i, 1);
				if (test) {
					this.saveBlogsToLocalStorage(true);
				} else {
					this.saveBlogsToLocalStorage();
				}
				return;
			}
		}
	}
	/**
	 * Saves the blog array and the current blog id to the localStorage
	 * @param {bool} test - If it's a test or not. Default is false.
	 * @returns {void}
	 */
	saveBlogsToLocalStorage(test = false) {
		if (test) {
			localStorage.setItem("testBlogs", JSON.stringify(this.blogs));
			localStorage.setItem("testBlogId", this.blogId.toString());
		} else {
			localStorage.setItem("blogs", JSON.stringify(this.blogs));
			localStorage.setItem("blogId", this.blogId.toString());
		}
		console.log(localStorage);
	}
	/**
	 * Gets the blog list and the next blog id from localStorage if there is any, otherwise return
	 * @param {bool} test - If it's a test or not. Default is false.
	 * @returns {void}
	 */
	getBlogsFromLocalStorage(test = false) {
		if (localStorage.length === 0) return;
		this.blogs.splice(0, this.blogs.length);

		if (test) {
			let storedBlogs = JSON.parse(localStorage.getItem("testBlogs"));
			if (storedBlogs == null) return;
			storedBlogs.forEach((blog) => {
				this.blogs.push(blog);
			});
			this.blogId = +localStorage.getItem("testBlogId");
		} else {
			let storedBlogs = JSON.parse(localStorage.getItem("blogs"));
			storedBlogs.forEach((blog) => {
				this.blogs.push(blog);
			});
			this.blogId = +localStorage.getItem("blogId");
		}
	}
}
