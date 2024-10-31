let data = {
	username: "eleven_ty", // No leading @ here
	homeLabel: "11ty.dev",
	homeUrl: "https://www.11ty.dev/",
	compileOptions: {
		permalink: "raw" // Updated from true to "raw"
	}
};

if (!process.argv.includes("--config=")) {
	throw new Error("Missing --config= command line file");
}

data.avatar = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(data.homeUrl)}/`;

export default data;