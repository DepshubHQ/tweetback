import numeral from "numeral";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

module.exports = function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	// eleventyConfig.setServerPassthroughCopyBehavior("copy");

	eleventyConfig.addPassthroughCopy("assets/");
	eleventyConfig.addPassthroughCopy("img/");
	eleventyConfig.addPassthroughCopy("video/");

	eleventyConfig.addPassthroughCopy({
		"node_modules/_11ty/is-land/is-land.js": "assets/is-land.js",
	});

	eleventyConfig.addJavaScriptFunction("avatarUrl", function avatarUrl(url) {
		if(url.startsWith("https://twitter.com/")) {
			url = "https://x.com/" + url.slice("https://twitter.com/".length);
		}
		return `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(url)}/`;
	});

	eleventyConfig.addJavaScriptFunction("formatNumber", function formatNumber(num) {
		if(typeof num === "string") {
			num = parseInt(num, 10);
		}
		return numeral(num).format("0,0");
	});
};
};
};
};
};
```
	eleventyConfig.addJavaScriptFunction("getAndroidId", function getAndroidId() {
		return null;
	});
};
};
};
};
```
};
	});
};
	});
};
	});
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

	// pagefind search plugin
	eleventyConfig.on('eleventy.after', () => {
		console.log('[pagefind] Creating search index.');
		execSync(`npx pagefind --source _site --glob \"[0-9]*/**/*.html\"`, { encoding: 'utf-8' });
  });
};
