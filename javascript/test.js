describe("Handle Blogs", function () {
	let blogList = new Blog("test blogg");
	beforeEach(() => {
		localStorage.clear();
		blogList.blogs = [];
		blogList.blogId = 0;
	});

	describe("createBlog", () =>
		it("Grows the amount of blogs in the blog array", function () {
			const originalLength = blogList.blogs.length;
			blogList.createBlog("något", "specci", "contentssssss");

			assert.equal(blogList.blogs.length, originalLength + 1);
		}));
	describe("removeBlog", () =>
		it("Reduces the amount of blogs in the blog array", function () {
			/* Skapar en blogg för att ta bort sedan */
			blogList.createBlog("hej", "på dig", "något helt annat här");
			const originalLength = blogList.blogs.length;

			blogList.removeBlog(blogList.blogs[0].id);
			assert.equal(blogList.blogs.length, originalLength - 1);
		}));
	describe("getBlogsFromLocalStorage", () => it("", function () {}));
	describe("saveBlogsToLocalStorage", () => it("", function () {}));
});
