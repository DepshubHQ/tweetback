let data = {
	username: "eleven_ty", // No leading @ here
	homeLabel: "11ty.dev",
	homeUrl: "https://www.11ty.dev/",
	site: "https://www.11ty.dev/", // Updated from source to site
	outputSubdir: "your-output-subdir", // Updated from bundle-dir to output-subdir
};

data.avatar = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(data.homeUrl)}/`;

module.exports = data;