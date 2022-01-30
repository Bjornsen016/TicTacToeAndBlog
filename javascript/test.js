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
	describe("blog.getBlogsFromLocalStorage", () =>
		it("Finds the correct saved blogs in localStorage", function () {
			const today = new Date();
			let newBlog = {
				id: 2,
				header: "Rubrik",
				pic: "en url",
				text: "lite text för att fylla ut",
				publishDate: today,
			};
			let newBlogList = [];
			newBlogList.push(newBlog);
			localStorage.setItem("blogs", JSON.stringify(newBlogList));

			blogList.getBlogsFromLocalStorage();

			assert.equal(blogList.blogs[0].id, newBlogList[0].id);
			assert.equal(blogList.blogs[0].header, newBlogList[0].header);
			assert.equal(blogList.blogs[0].pic, newBlogList[0].pic);
			assert.equal(blogList.blogs[0].text, newBlogList[0].text);
		}));
	describe("blog.saveBlogsToLocalStorage", () =>
		it("Saves to localStorage correctly", function () {
			assert.isNull(localStorage.getItem("blogs"));

			blogList.createBlog("Rubrik", "URL", "lite text här denna gången");
			blogList.saveBlogsToLocalStorage();

			let localStorageBlogs = JSON.parse(localStorage.getItem("blogs"));

			assert.equal(1, localStorageBlogs.length);
		}));
});
