const Twitter = require("./src/dist/twitter");

class Index extends Twitter {
	data() {
		return {
			layout: "layout.11ty.js",
      permalink: "404.html"
		};
	}

	async render(data) {
		return (
		<h2 className="tweets-primary-count">
			Tweet not found.
		</h2>
);
	}
}
module.exports = Index;
