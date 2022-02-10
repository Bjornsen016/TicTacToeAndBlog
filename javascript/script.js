/**
 * @file Handles the frontend of the blogsite. Creates and updates the HTML/CSS.
 * @author Kim Björnsen Åklint
 */

import { Blog } from "./blog.js";

let blogList = new Blog("Kims blogg");

let title = document.getElementById("title");
title.innerText = blogList.title;

const createBlogButton = document.getElementById("createBlog");
createBlogButton.addEventListener("click", createBlogWithFrontend);
const clearLocalStorageButton = document.getElementById("clearLocalStorage");
clearLocalStorageButton.addEventListener("click", clearLocalStorage);
const toggleNavButton = document.getElementById("toggleNav");
toggleNavButton.addEventListener("click", toggleNav);

displayBlogPosts();
/**
 * Creates a new blogpost and refreshes the visuals afterwards.
 * @returns {void}
 */
function createBlogWithFrontend() {
	let heading = document.getElementById("heading").value;
	let content = document.getElementById("content").value;
	let image = document.getElementById("image").value;
	blogList.createBlog(heading, image, content);
	displayBlogPosts();
}
/**
 * Removes a specific blogpost. This attached to the remove button on each blogpost card.
 * @param {int} id - the id of the blogpost to get removed.
 * @returns {void}
 */
function removeBlogFrontend(id) {
	blogList.removeBlog(id);
	displayBlogPosts();
}

/**
 * Refreshes the sites visuals, showing the newest blogpost highest.
 * Also updates the sidebar navigation
 * @returns {void}
 */
function displayBlogPosts() {
	let blogPosts = document.getElementById("blog-posts");
	blogPosts.innerHTML = "";
	let sidebar = document.getElementById("sidebar");
	sidebar.innerHTML = "";

	for (let i = blogList.blogs.length - 1; i >= 0; i--) {
		const blog = blogList.blogs[i];

		const blogCard = createBlogCard(blog);
		blogPosts.appendChild(blogCard);

		const sidebarItem = createSidebarItem(blog);
		sidebar.appendChild(sidebarItem);
	}
}

/**
 * Creates a blogcard with the information from the blog.
 * @param {Blog} blog -
 * @returns {HTMLDivElement} A blog card.
 */
function createBlogCard(blog) {
	const blogCard = document.createElement("div");
	const article = document.createElement("article");
	const h2 = document.createElement("h2");
	const footer = document.createElement("footer");
	const button = document.createElement("button");

	blogCard.classList.add("blog-card");
	article.classList.add("blog-content");
	h2.classList.add("blog-header");
	footer.classList.add("publish-date");

	const date = new Date(blog.publishDate);

	h2.textContent = blog.header;
	h2.style.backgroundImage = `url(${blog.pic})`;
	article.textContent = blog.text;
	article.prepend(h2);

	button.textContent = "Remove blog post";
	button.addEventListener("click", function () {
		removeBlogFrontend(blog.id);
	});

	footer.textContent = date.toLocaleDateString();
	footer.appendChild(button);

	blogCard.id = blog.id;
	blogCard.appendChild(article);
	blogCard.appendChild(footer);

	return blogCard;
}
/**
 * Creates a sidebar item from a Blog object
 * @param {Blog} blog
 * @returns {HTMLAnchorElement} An anchor tag filled with a link to the blogposts id in HTML and the publish date of that post.
 */
function createSidebarItem(blog) {
	const link = document.createElement("a");
	link.href = `#${blog.id}`;

	const date = new Date(blog.publishDate);
	link.textContent = date.toLocaleDateString();
	return link;
}

/**
 * Toggles the navbar on mobile.
 * @returns {void}
 */
function toggleNav() {
	let sidebar = document.getElementById("sidebar").style;
	if (sidebar.width != "auto") {
		sidebar.width = "auto";
		sidebar.padding = "1rem";
	} else {
		sidebar.width = "0px";
		sidebar.padding = "0px";
	}
}

//TODO: För att kunna ta bort enkelt när jag testar runt
function clearLocalStorage() {
	blogList.blogs = [];
	localStorage.clear();
	blogList.blogId = 0;
	blogList.createBlog(
		"Placeholder header",
		"https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80",
		`Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam magni,
    atque corrupti quia
    praesentium quis quibusdam vitae accusantium itaque illum rem voluptates voluptatibus maiores?
    Minima libero aliquam non accusamus, quasi exercitationem laborum eum harum provident blanditiis
    inventore sunt dolorem autem repudiandae ullam eligendi assumenda incidunt facere aliquid culpa
    omnis nulla.`
	);
	displayBlogPosts();
}
