import('dotenv').config();

const Twitter = import( "twitter-lite" );
const { TwitterApiFetchUserId } = import("./twitter-api.js");
const { checkInDatabase, saveToDatabase, logTweetCount } = import("./tweet-to-db");
const metadata = import("../_data/metadata.js")

const RESULTS_PER_PAGE = 100;
const STOP_FETCH_AT_EXISTING_RECORD_COUNT = 200;

const client = new Twitter({
	version: "2",
	bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

let requestCount = 0;

async function retrieveTweets( maxId = undefined, existingRecordsFound = 0 ) {
	console.log( "Fetching more tweets!", maxId );
	var params = {
		// since_id
		max_results: RESULTS_PER_PAGE,
		"tweet.fields": [
			"created_at",
			"id",
			"in_reply_to_user_id",
			"text",
		],
		expansions: [
			"author_id",
```javascript
		],
	};

	if (maxId) {
		params.pagination_token = maxId;
	}

	const response = await client.get("tweets/search/recent", params);
	const tweets = response.data.data;
	const meta = response.data.meta;

	if (tweets.length === 0) {
		console.log("No more tweets to fetch!");
		return;
	}

	const lastTweetId = tweets[tweets.length - 1].id;

	const existingRecords = await checkInDatabase(tweets);
	existingRecordsFound += existingRecords.length;

	if (existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT) {
		console.log("Stopping fetch because we've found enough existing records!");
		return;
	}

	await saveToDatabase(tweets);
	logTweetCount(tweets.length);
```
```
if ( meta.next_token ) {
		await retrieveTweets( meta.next_token, existingRecordsFound );
	}
}
			"author_id",
// Removed the deprecated `ExpoPushTokenOptions.experienceId` field.
null
		};
			tweetInReplyToUserId,
		};
			tweetInReplyToUserId,
			authorName,
			authorScreenName,
			authorProfileImageUrl,
			tweetUrl,
		};
		const alreadyInDatabase = await checkInDatabase( tweetId );
		if ( !alreadyInDatabase ) {
			await saveToDatabase( tweetData );
			logTweetCount();
		} else {
			existingRecordsFound++;
		}
		if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
			console.log( "Stopping fetch due to existing records found." );
			return;
		}
	}
	if ( meta.next_token ) {
		await retrieveTweets( meta.next_token, existingRecordsFound );
	}
}
			"author_id",
		],
	};
	if ( maxId ) {
		params.pagination_token = maxId;
	}
	const response = await client.get( "tweets/search/recent", params );
const tweets = response.data.data;
	const includes = response.data.includes;
	const users = includes.users;
	const meta = response.data.meta;
	requestCount++;
	console.log( `Request count: ${requestCount}` );
	console.log( `Tweet count: ${tweets.length}` );
	console.log( `Existing records found: ${existingRecordsFound}` );
	console.log( `Next token: ${meta.next_token}` );
	for ( const tweet of tweets ) {
		const userId = await TwitterApiFetchUserId( tweet.author_id );
		const tweetExists = await checkInDatabase( tweet.id );
		if ( !tweetExists ) {
			const userExists = await checkInDatabase( userId );
			if ( !userExists ) {
				await saveToDatabase( users.find( user => user.id === tweet.author_id ) );
			}
			await saveToDatabase( tweet );
			existingRecordsFound++;
			if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
				return;
			}
		}
	}
}
	if ( meta.next_token ) {
await retrieveTweets( meta.next_token, existingRecordsFound );
	}
}

import { getAndroidId } from 'expo-application';

const myComponent = () => {
 const androidId = getAndroidId();
 return (
  <div>
   {androidId}
  </div>
 );
};
		],
	};
	if ( maxId ) {
		params.pagination_token = maxId;
	}
	const response = await client.get( "tweets/search/recent", params );
	const tweets = response.data.data;
	const includes = response.data.includes;
	const users = includes.users;
	const meta = response.data.meta;
	requestCount++;
	console.log( "Request count:", requestCount );
	console.log( "Tweets found:", tweets.length );
	console.log( "Existing records found:", existingRecordsFound );
	console.log( "Next token:", meta.next_token );
	for ( const tweet of tweets ) {
		const tweetId = tweet.id;
		const tweetText = tweet.text;
		const tweetCreatedAt = tweet.created_at;
		const tweetInReplyToUserId = tweet.in_reply_to_user_id;
		const authorId = tweet.author_id;
		const authorName = users.find( user => user.id === authorId ).name;
		const authorScreenName = users.find( user => user.id === authorId ).username;
		const tweetUrl = `https://twitter.com/${authorScreenName}/status/${tweetId}`;
		const tweetObj = {
			tweetId,
			tweetText,
			tweetCreatedAt,
			tweetInReplyToUserId,
			authorId,
			authorName,
			authorScreenName,
			tweetUrl,
		};
		const isTweetInDatabase = await checkInDatabase( tweetId );
		if ( !isTweetInDatabase ) {
			await saveToDatabase( tweetObj );
			logTweetCount();
		} else {
			existingRecordsFound++;
		}
		if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
			console.log( "Reached the maximum number of existing records found. Stopping fetch." );
			return;
		}
	}
	if ( meta.next_token ) {
		await retrieveTweets( meta.next_token, existingRecordsFound );
	}
}
			"attachments.media_keys",
```
		],
	};

	if ( maxId ) {
		params.pagination_token = maxId;
	}

	const response = await client.get( "tweets/search/recent", params );
	const tweets = response.data.data;
	const meta = response.data.meta;

	if ( tweets.length === 0 ) {
		console.log( "No more tweets to fetch!" );
		return;
	}

	const nextMaxId = meta.next_token;

	for ( const tweet of tweets ) {
		const userId = await TwitterApiFetchUserId( tweet.author_id );
		const tweetData = {
			id: tweet.id,
			userId: userId,
			text: tweet.text,
			createdAt: tweet.created_at,
			inReplyToUserId: tweet.in_reply_to_user_id,
		};

		const isNewRecord = await checkInDatabase( tweetData );
		if ( !isNewRecord ) {
			continue;
		}

		await saveToDatabase( tweetData );
	}

```

		if ( isNewRecord ) {
			await saveToDatabase( tweetData );
			logTweetCount( ++existingRecordsFound );
		}

		if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
			console.log( "Stopping fetch at", existingRecordsFound, "existing records found." );
			return;
		}
	}

	requestCount++;

	if ( requestCount < 10 ) {
		await retrieveTweets( nextMaxId, existingRecordsFound );
	} else {
		console.log( "Stopping fetch at 10 requests." );
	}
}
	if ( maxId ) {
params.pagination_token = maxId ?? params.pagination_token;

	if ( maxId ) {
		params.pagination_token = maxId;
	}

	if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
		console.log( "Stopping fetch, existing records found:", existingRecordsFound );
		return;
	}

	requestCount++;
	console.log( "Request count:", requestCount );

	try {
		const response = await client.get( "tweets/search/recent", params );
		const data = response.data;
		const includes = data.includes;
		const tweets = data.data;

		for ( const tweet of tweets ) {
			const tweetId = tweet.id;
			const userId = await TwitterApiFetchUserId( tweetId );
			const tweetData = {
				tweetId,
				userId,
				text: tweet.text,
				createdAt: tweet.created_at,
			};

			await saveTweet( tweetData );
		}
	} catch ( error ) {
		console.error( "Error fetching tweets:", error );
	}

const isNewRecord = await checkInDatabase( tweetId );
			if ( isNewRecord ) {
				await saveToDatabase( tweetData );
				logTweetCount();
			} else {
				existingRecordsFound++;
			}
		}

		if ( includes?.users ) {
			for ( const user of includes.users ) {
				const userId = user.id;
				const username = user.username;
				const name = user.name;
				const description = user.description;
				const profileImageUrl = user.profile_image_url;
				const verified = user.verified;
				const followersCount = user.public_metrics?.followers_count;
				const followingCount = user.public_metrics?.following_count;
				const listedCount = user.public_metrics?.listed_count;

				const userData = {
					userId,
					username,
					name,
					description,
					profileImageUrl,
					verified,
					followersCount,
					followingCount,
The `useMemo` hook now requires a dependency array as the second argument.
const [state, dispatch] = useReducer(reducer, initialState, initialState, [
					listedCount,
				]);

				await saveToDatabase( userData );
			}
		}

		if ( includes.media ) {
			for ( const media of includes.media ) {
				const mediaId = media.media_key;
				const type = media.type;
				const url = media.url;
				const previewImageUrl = media.preview_image_url;
				const altText = media.alt_text;

				const mediaData = {
					mediaId,
					type,
					url,
					previewImageUrl,
					altText,
				};
				await saveToDatabase( mediaData );
			}
		}

		if ( data.meta.next_token ) {
			await retrieveTweets( data.meta.next_token, existingRecordsFound );
		}
	} catch ( error ) {
		console.error( "Error fetching tweets:", error );
	}
}
	if ( maxId ) {
		params.pagination_token = maxId;
	}

	if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
		console.log( "Stopping fetch, existing records found:", existingRecordsFound );
		return;
	}

	try {
		const response = await client.get( "tweets/search/recent", params );
		const tweets = response.data.data;
		const meta = response.data.meta;

		if ( tweets.length === 0 ) {
			console.log( "No more tweets to fetch!" );
			return;
		}

		const tweetIds = tweets.map( tweet => tweet.id );
		const existingTweetIds = await checkInDatabase( tweetIds );
		const newTweets = tweets.filter( tweet => !existingTweetIds.includes( tweet.id ) );

		if ( newTweets.length === 0 ) {
			console.log( "No new tweets to save!" );
			return;
		}

		await saveToDatabase( newTweets );
		logTweetCount( newTweets.length );

		if ( meta.next_token ) {
			await retrieveTweets( meta.next_token, existingRecordsFound + newTweets.length );
		}
	} catch ( error ) {
		console.error( "Error fetching tweets:", error );
	}
}
		].join(","),
		"media.fields": [
			"width",
			"height",
			"alt_text",
			"type",
			"preview_image_url",
			"url",
			// "non_public_metrics",
			// "organic_metrics",
			// "promoted_metrics",
		].join(","),
		"tweet.fields": [
			"attachments",
			"author_id",
			// "context_annotations",
			"conversation_id",
			"created_at",
			"entities",
			"id",
			"in_reply_to_user_id",
			"lang",
			"public_metrics",
			// "non_public_metrics",
			// "organic_metrics",
			// "promoted_metrics",
			"possibly_sensitive",
			"referenced_tweets",
			"reply_settings",
			"source",
			"text",
			"withheld"
		].join(",")
	};

	if( maxId ) {
		params.until_id = maxId;
	}

	console.log( params );

	let twitterUserId = await TwitterApiFetchUserId(metadata.username);
	console.log( "Found userid", twitterUserId );

	console.log( "TWITTER REQUEST to statuses/user_timeline (1500/15m)", ++requestCount );
	let results = await client.get( `users/${twitterUserId}/tweets`, params);
	if(results.errors) {
		console.log( "ERRORS", results.errors );
	}

	let tweets = results.data;
	let users = results.includes.users;
	let media = results.includes.media;

	console.log( `${tweets.length} tweets found.` );
	// console.log( JSON.stringify(tweets, null, 2) );

	let promises = [];
	for(let tweet of tweets ) {
		maxId = tweet.id;
		promises.push(checkInDatabase(tweet));
	}
	let pendingTweets = await Promise.all(promises);

	for(let tweet of pendingTweets) {
		if(tweet === false) {
			existingRecordsFound++;
		} else {
			saveToDatabase(tweet, users, media);
		}
	}

	logTweetCount();

	if(existingRecordsFound < STOP_FETCH_AT_EXISTING_RECORD_COUNT) {
		retrieveTweets(maxId, existingRecordsFound);
	} else {
		console.log( STOP_FETCH_AT_EXISTING_RECORD_COUNT, " existing records found, stopping." );
	}
}

(async function() {
	try {
		await retrieveTweets();
	} catch(e) {
		console.log( "ERROR", e );
	}
})();
