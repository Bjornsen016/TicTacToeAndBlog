let blogList = new Blog("Kims blogg");

let title = document.getElementById("title");
title.innerText = blogList.title;

displayBlogPosts();
/**
 * Creates a new blogpost and refreshes the visuals afterwards.
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
 */
function removeBlogFrontend(id) {
	blogList.removeBlog(id);
	displayBlogPosts();
}

/**
 * Refreshes the sites visuals, showing the newest blogpost highest.
 * Also updates the sidebar navigation
 */
function displayBlogPosts() {
	let blogPosts = document.getElementById("blog-posts");
	let sidebar = document.getElementById("sidebar");

	let htmlString = "";
	let htmlStringSidebar = "";

	for (let i = blogList.blogs.length - 1; i >= 0; i--) {
		const blog = blogList.blogs[i];
		const date = new Date(blog.publishDate);
		htmlString += /*html*/ `
        <div id=${blog.id} class="blog-card">
        <article class="blog-content">
        <h2 class="blog-header" style="background-image: url(${blog.pic})">${
			blog.header
		}</h2>
            ${blog.text}
        </article>
        <footer class="publish-date">${date.toLocaleDateString()}<button onclick="removeBlogFrontend(${
			blog.id
		})">Remove blog post</button></footer>
        </div>
        `;

		htmlStringSidebar += /*html*/ `
        <a href="#${blog.id}" class="nav-to-blog-post">
            ${date.toLocaleDateString()}      
        </a>
        `;
	}
	blogPosts.innerHTML = htmlString;
	sidebar.innerHTML = htmlStringSidebar;
}

/**
 * Toggles the navbar on mobile.
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
