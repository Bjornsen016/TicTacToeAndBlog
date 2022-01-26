const assert = chai.assert;

describe("Handle Blogs", function () {
	let blogList = new Blog("test blogg");
	beforeEach(() => {
		localStorage.clear();
		blogList.blogs = [];
		blogList.blogId = 0;
	});

	describe("blog.createBlog", () =>
		it(
			"Grows the amount of blogs in the blog array",
			function () {
				const originalLength = blogList.blogs.length;
				blogList.createBlog("titel", "url", "innehåll yo");

				assert.equal(blogList.blogs.length, originalLength + 1);
			},
			it("The last added blog is correct", function () {
				blogList.createBlog("titel", "url", "innehåll yo");
				let today = new Date().toLocaleDateString();
				let lastIndex = blogList.blogs.length - 1;

				assert.equal(blogList.blogs[lastIndex].header, "titel");
				assert.equal(blogList.blogs[lastIndex].pic, "url");
				assert.equal(blogList.blogs[lastIndex].text, "innehåll yo");
				assert.equal(
					blogList.blogs[lastIndex].publishDate.toLocaleDateString(),
					today
				);
			})
		));
	describe("blog.removeBlog", () =>
		it("Reduces the amount of blogs in the blog array", function () {
			/* Skapar en blogg för att ta bort sedan */
			blogList.createBlog("hej", "på dig", "något helt annat här");
			const originalLength = blogList.blogs.length;

			blogList.removeBlog(blogList.blogs[0].id);
			assert.equal(blogList.blogs.length, originalLength - 1);
		}));
	describe("blog.getBlogsFromLocalStorage", () => it("", function () {}));
	describe("blog.saveBlogsToLocalStorage", () => it("", function () {}));
});
