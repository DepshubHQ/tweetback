const Twitter = require("./src/twitter");
const Eleventy = await import("@11ty/eleventy");
const fs = require("fs");

const configFile = process.argv.find(arg => arg.startsWith("--config="));
if (!configFile) {
	throw new Error("--config= command line file is missing");
}

class Index extends Twitter {
	data() {
		return {
			layout: "layout.11ty.js",
      permalink: "404.html"
		};
	}

	async render(data) {
		return `
		<h2 class="tweets-primary-count">
			Tweet not found.
		</h2>
`;
	}
}

module.exports = Index;