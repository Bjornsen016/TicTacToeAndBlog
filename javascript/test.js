/**
 * @file Tests blog.js. The Blog class and its different methods.
 * @author Kim Björnsen Åklint
 */

import { Blog } from "./blog.js";
const assert = chai.assert;

describe("Handle Blogs", function () {
	let blogList = new Blog("test blogg", true);
	beforeEach(() => {
		localStorage.removeItem("testBlogs");
		localStorage.removeItem("testBlogId");
		blogList.blogs = [];
		blogList.blogId = 0;
	});
	this.afterAll(() => {
		localStorage.removeItem("testBlogs");
		localStorage.removeItem("testBlogId");
	});

	describe("blog.createBlog", () =>
		it(
			"Grows the amount of blogs in the blog array",
			function () {
				const originalLength = blogList.blogs.length;
				blogList.createBlog("titel", "url", "innehåll yo", true);

				assert.equal(blogList.blogs.length, originalLength + 1);
			},
			it("The last added blog is correct", function () {
				blogList.createBlog("titel", "url", "innehåll yo", true);
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
		it(
			"Reduces the amount of blogs in the blog array",
			function () {
				/* Skapar en blogg för att ta bort sedan */
				blogList.createBlog("hej", "på dig", "något helt annat här", true);
				const originalLength = blogList.blogs.length;

				blogList.removeBlog(blogList.blogs[0].id, true);
				assert.equal(blogList.blogs.length, originalLength - 1);
			},
			it("Does not reduce the amout of blogs if the id does not exist or is an invalid argument", function () {
				/* Skapar en blogg för att ta bort sedan */
				blogList.createBlog("hej", "på dig", "något helt annat här", true);
				const originalLength = blogList.blogs.length;

				blogList.removeBlog(blogList.blogs[0].id + 1, true);
				assert.equal(blogList.blogs.length, originalLength);

				blogList.removeBlog("one", true);
				assert.equal(blogList.blogs.length, originalLength);
			})
		));
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
			localStorage.setItem("testBlogs", JSON.stringify(newBlogList));

			blogList.getBlogsFromLocalStorage(true);

			assert.equal(blogList.blogs[0].id, newBlogList[0].id);
			assert.equal(blogList.blogs[0].header, newBlogList[0].header);
			assert.equal(blogList.blogs[0].pic, newBlogList[0].pic);
			assert.equal(blogList.blogs[0].text, newBlogList[0].text);
		}));
	describe("blog.saveBlogsToLocalStorage", () =>
		it("Saves to localStorage correctly", function () {
			assert.isNull(localStorage.getItem("testBlogs"));

			blogList.createBlog("Rubrik", "URL", "lite text här denna gången", true);
			blogList.saveBlogsToLocalStorage(true);

			let localStorageBlogs = JSON.parse(localStorage.getItem("testBlogs"));

			assert.equal(1, localStorageBlogs.length);
		}));
});
