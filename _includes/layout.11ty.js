const dataSource = require("../src/DataSource");
const metadata = require("../_data/metadata.js");

module.exports = async function(data) {
	let titleTweetNumberStr = "";
	if(data.page.fileSlug === "tweet-pages") {
		titleTweetNumberStr = `—№ ${this.renderNumber(data.pagination.hrefs.length - data.pagination.pageNumber)}`;
	} else if(data.page.fileSlug === "newest") {
		titleTweetNumberStr = `—№ ${this.renderNumber((await dataSource.getAllTweets()).length)}`;
	}

	let navHtml = "";
	if(data.page.fileSlug === "tweet-pages" || data.page.fileSlug === "newest") {
		let newestHref = "/newest/";
		let previousHref = data.pagination.previousPageHref;
		let nextHref = data.pagination.nextPageHref;

		if(data.page.fileSlug === "newest") {
			newestHref = "";
			previousHref = "";
			nextHref = "/" + (await dataSource.getAllTweets()).sort((a, b) => b.date - a.date).slice(1, 2).map(tweet => tweet.id_str).join("") + "/";
		} else if(data.page.fileSlug === "tweet-pages" && data.pagination.firstPageHref === data.page.url) {
			newestHref = "";
		}

		navHtml = `<ul class="tweets-nav">
			<li>${newestHref ? `<a href="${newestHref}">` : ""}⇤ Newest<span class="sr-only"> Tweet</span>${newestHref ? `</a>` : ""}</li>
			<li>${previousHref ? `<a href="${previousHref}">` : ""}⇠ Newer<span class="sr-only"> Tweet</span>${previousHref ? `</a>` : ""}</li>
			<li>${nextHref ? `<a href="${nextHref}">` : ""}Older<span class="sr-only"> Tweet</span> ⇢${nextHref ? `</a>` : ""}</li>
		</ul>`;
	}

	return `
		<div class="tweets-page">
			<h1 class="tweets-page-title">${data.page.title}${titleTweetNumberStr}</h1>
			${navHtml}
			<div class="tweets-page-content">
				${data.page.content}
			</div>
		</div>
	`;
};
	}

	let meta_description = `A read-only indieweb self-hosted archive of${ data.pagination && data.pagination.hrefs && data.pagination.hrefs.length ? ` all ${data.pagination.hrefs.length} of` : ""} ${data.metadata.username}’s tweets.`;
	if (data.page.fileSlug === "tweet-pages" && data.tweet && data.tweet.full_text) {
		// note that data.tweet.full_text is already HTML-escaped
		meta_description = data.tweet.full_text.replace(/\s+/g, " ");
	}

	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${data.metadata.username}’s Twitter Archive${titleTweetNumberStr}</title>
		<meta name="description" content="${meta_description}" />

		<link rel="profile" href="https://microformats.org/profile/hatom">
		<link rel="stylesheet" href="/assets/style.css">
		<script src="/assets/script.js" type="module"></script>
		<script src="/assets/is-land.js" type="module"></script>

		${data.page.fileSlug === "newest" ? `
			<link rel="canonical" href="/${data.tweet.id_str}/">
			<meta http-equiv="refresh" content="0; url=/${data.tweet.id_str}/">
			` : ""}
	</head>
	<body>
		<header>
			<h1 class="tweets-title"><a href="/"><img src="${metadata.avatar}" width="52" height="52" alt="${data.metadata.username}’s avatar" class="tweet-avatar">${data.metadata.username}’s Twitter Archive</a>${titleTweetNumberStr}</h1>
			${!data.hideHeaderTweetsLink ? `<ul class="tweets-nav">
				<li><a rel="home" href="${data.metadata.homeUrl}">← ${data.metadata.homeLabel}</a></li>
			</ul>` : ""}
			<div class="tweets-container">
				<div class="tweets-header">
					<h2 class="tweets-title">
						<a href="/${data.tweet.id_str}/" class="tweet-permalink" data-pagefind-body>
							<span class="tweet-date">${data.tweet.created_at}</span>
							<span class="tweet-text">${data.tweet.full_text}</span>
						</a>
					</h2>
				</div>
				<div class="tweets-content">
					<div class="tweet-content">
						${data.tweet.entities.urls.length > 0 ? `<ul class="tweet-urls">
							${data.tweet.entities.urls.map(url => `<li><a href="${url.expanded_url}" target="_blank" rel="noopener noreferrer">${url.display_url}</a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.entities.media.length > 0 ? `<ul class="tweet-media">
							${data.tweet.entities.media.map(media => `<li><a href="${media.expanded_url}" target="_blank" rel="noopener noreferrer"><img src="${media.media_url_https}" alt="${media.type}" class="tweet-media-img"></a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.entities.hashtags.length > 0 ? `<ul class="tweet-hashtags">
							${data.tweet.entities.hashtags.map(hashtag => `<li><a href="https://twitter.com/hashtag/${hashtag.text}?src=hash" target="_blank" rel="noopener noreferrer">#${hashtag.text}</a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.entities.user_mentions.length > 0 ? `<ul class="tweet-mentions">
							${data.tweet.entities.user_mentions.map(mention => `<li><a href="https://twitter.com/${mention.screen_name}" target="_blank" rel="noopener noreferrer">@${mention.screen_name}</a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.quoted_status ? `<div class="tweet-quote">
							<div class="tweet-quote-header">
								<h3 class="tweet-quote-title">
									<a href="https://twitter.com/${data.tweet.quoted_status.user.screen_name}/status/${data.tweet.quoted_status.id_str}" target="_blank" rel="noopener noreferrer">
										<span class="tweet-quote-date">${data.tweet.quoted_status.created_at}</span>
										<span class="tweet-quote-text">${data.tweet.quoted_status.full_text}</span>
									</a>
								</h3>
							</div>
							<div class="tweet-quote-content">
								${data.tweet.quoted_status.entities.urls.length > 0 ? `<ul class="tweet-quote-urls">
									${data.tweet.quoted_status.entities.urls.map(url => `<li><a href="${url.expanded_url}" target="_blank" rel="noopener noreferrer">${url.display_url}</a></li>`).join('')}
								</ul>` : ''}
								${data.tweet.quoted_status.entities.media.length > 0 ? `<ul class="tweet-quote-media">
									${data.tweet.quoted_status.entities.media.map(media => `<li><a href="${media.expanded_url}" target="_blank" rel="noopener noreferrer"><img src="${media.media_url_https}" alt="${media.type}" class="tweet-quote-media-img"></a></li>`).join('')}
								</ul>` : ''}
								${data.tweet.quoted_status.entities.hashtags.length > 0 ? `<ul class="tweet-quote-hashtags">
									${data.tweet.quoted_status.entities.hashtags.map(hashtag => `<li><a href="https://twitter.com/hashtag/${hashtag.text}?src=hash" target="_blank" rel="noopener noreferrer">#${hashtag.text}</a></li>`).join('')}
								</ul>` : ''}
								${data.tweet.quoted_status.entities.user_mentions.length > 0 ? `<ul class="tweet-quote-mentions">
									${data.tweet.quoted_status.entities.user_mentions.map(mention => `<li><a href="https://twitter.com/${mention.screen_name}" target="_blank" rel="noopener noreferrer">@${mention.screen_name}</a></li>`).join('')}
								</ul>` : ''}
							</div>
						</div>` : ''}
					</div>
				</div>
			</div>
		</header>
		<main>
			<div class="tweets-container">
				<div class="tweets-header">
					<h2 class="tweets-title">
						<a href="/${data.tweet.id_str}/" class="tweet-permalink" data-pagefind-body>
							<span class="tweet-date">${data.tweet.created_at}</span>
							<span class="tweet-text">${data.tweet.full_text}</span>
						</a>
					</h2>
				</div>
				<div class="tweets-content">
					<div class="tweet-content">
						${data.tweet.entities.urls.length > 0 ? `<ul class="tweet-urls">
							${data.tweet.entities.urls.map(url => `<li><a href="${url.expanded_url}" target="_blank" rel="noopener noreferrer">${url.display_url}</a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.entities.media.length > 0 ? `<ul class="tweet-media">
							${data.tweet.entities.media.map(media => `<li><a href="${media.expanded_url}" target="_blank" rel="noopener noreferrer"><img src="${media.media_url_https}" alt="${media.type}" class="tweet-media-img"></a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.entities.hashtags.length > 0 ? `<ul class="tweet-hashtags">
							${data.tweet.entities.hashtags.map(hashtag => `<li><a href="https://twitter.com/hashtag/${hashtag.text}?src=hash" target="_blank" rel="noopener noreferrer">#${hashtag.text}</a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.entities.user_mentions.length > 0 ? `<ul class="tweet-mentions">
							${data.tweet.entities.user_mentions.map(mention => `<li><a href="https://twitter.com/${mention.screen_name}" target="_blank" rel="noopener noreferrer">@${mention.screen_name}</a></li>`).join('')}
						</ul>` : ''}
						${data.tweet.quoted_status ? `<div class="tweet-quote">
							<div class="tweet-quote-header">
								<h3 class="tweet-quote-title">
									<a href="https://twitter.com/${data.tweet.quoted_status.user.screen_name}/status/${data.tweet.quoted_status.id_str}" target="_blank" rel="noopener noreferrer">
										<span class="tweet-quote-date">${data.tweet.quoted_status.created_at}</span>
										<span class="tweet-quote-text">${data.tweet.quoted_status.full_text}</span>
									</a>
								</h3>
							</div>
							<div class="tweet-quote-content">
								${data.tweet.quoted_status.entities.urls.length > 0 ? `<ul class="tweet-quote-urls">
									${data.tweet.quoted_status.entities.urls.map(url => `<li><a href="${url.expanded_url}" target="_blank" rel="noopener noreferrer">${url.display_url}</a></li>`).join('')}
								</ul>` : ''}
								${data.tweet.quoted_status.entities.media.length > 0 ? `<ul class="tweet-quote-media">
									${data.tweet.quoted_status.entities.media.map(media => `<li><a href="${media.expanded_url}" target="_blank" rel="noopener noreferrer"><img src="${media.media_url_https}" alt="${media.type}" class="tweet-quote-media-img"></a></li>`).join('')}
								</ul>` : ''}
								${data.tweet.quoted_status.entities.hashtags.length > 0 ? `<ul class="tweet-quote-hashtags">
									${data.tweet.quoted_status.entities.hashtags.map(hashtag => `<li><a href="https://twitter.com/hashtag/${hashtag.text}?src=hash" target="_blank" rel="noopener noreferrer">#${hashtag.text}</a></li>`).join('')}
								</ul>` : ''}
								${data.tweet.quoted_status.entities.user_mentions.length > 0 ? `<ul class="tweet-quote-mentions">
									${data.tweet.quoted_status.entities.user_mentions.map(mention => `<li><a href="https://twitter.com/${mention.screen_name}" target="_blank" rel="noopener noreferrer">@${mention.screen_name}</a></li>`).join('')}
								</ul>` : ''}
							</div>
						</div>` : ''}
					</div>
				</div>
			</div>
		</main>
		<footer>
			<p>
				<a href="https://github.com/twitter/twarchive" target="_blank" rel="noopener noreferrer">
					<img src="/assets/github.svg" alt="GitHub" width="24" height="24">
				</a>
				<a href="https://github.com/twitter/twarchive/issues" target="_blank" rel="noopener noreferrer">
					<img src="/assets/issue.svg" alt="Issues" width="24" height="24">
				</a>
				<a href="https://twitter.com/twarchive" target="_blank" rel="noopener noreferrer">
					<img src="/assets/twitter.svg" alt="Twitter" width="24" height="24">
				</a>
			</p>
		</footer>
	</body>
</html>
			</ul>`: ""}
			${navHtml}
		</header>
		<main>
			${data.content}
		</main>
		<footer>
			<p>An open source project from <a href="https://github.com/tweetback">tweetback</a>.</p>
		</footer>
	</body>
</html>`;
};
