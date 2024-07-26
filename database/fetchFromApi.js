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
const authorProfileImageUrl = users.find( user => user.id === authorId ).profile_image_url_https;
const tweetUrl = `https://twitter.com/${authorScreenName}/status/${tweetId}`;
const tweetData = {
tweetId,
tweetText,
tweetCreatedAt,
tweetInReplyToUserId,
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
const response = await client.get("tweets/search/recent", params);
const tweets = response.data.data;
const meta = response.data.meta;
const includes = response.data.includes;
const users = includes.users;
const nextToken = meta.next_token;
const newRecordsFound = tweets.length;
const totalRecordsFound = existingRecordsFound + newRecordsFound;
console.log(`Found ${newRecordsFound} new tweets!`);
console.log(`Total records found: ${totalRecordsFound}`);
if (totalRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT) {
	console.log(`Reached ${STOP_FETCH_AT_EXISTING_RECORD_COUNT} records, stopping.`);
	return;
}
for (const tweet of tweets) {
	const tweetId = tweet.id;
	const tweetText = tweet.text;
	const tweetCreatedAt = tweet.created_at;
	const tweetInReplyToUserId = tweet.in_reply_to_user_id;
	const tweetAuthorId = tweet.author_id;
	const tweetAuthorName = users.find((user) => user.id === tweetAuthorId).name;
	const tweetAuthorScreenName = users.find((user) => user.id === tweetAuthorId).username;
	const tweetAuthorVerified = users.find((user) => user.id === tweetAuthorId).verified;
	const tweetAuthorFollowersCount = users.find((user) => user.id === tweetAuthorId).public_metrics.followers_count;
	const tweetAuthorFollowingCount = users.find((user) => user.id === tweetAuthorId).public_metrics.following_count;
	const tweetAuthorTweetCount = users.find((user) => user.id === tweetAuthorId).public_metrics.tweet_count;
}
const tweetAuthorListedCount = users.find(user => user.id === tweetAuthorId).public_metrics.listed_count;
const tweetAuthorDescription = users.find(user => user.id === tweetAuthorId).description;
const tweetAuthorLocation = users.find(user => user.id === tweetAuthorId).location;
const tweetAuthorUrl = users.find(user => user.id === tweetAuthorId).url;
const tweetAuthorProfileImageUrl = users.find(user => user.id === tweetAuthorId).profile_image_url;
const tweetAuthorProfileBannerUrl = users.find(user => user.id === tweetAuthorId).profile_banner_url;
const tweetAuthorPinnedTweetId = users.find(user => user.id === tweetAuthorId).pinned_tweet_id;
const tweetAuthorCreatedAt = users.find(user => user.id === tweetAuthorId).created_at;
const tweetAuthorIsProtected = users.find(user => user.id === tweetAuthorId).protected;
const tweetAuthorIsSuspended = users.find(user => user.id === tweetAuthorId).suspended;
const tweetAuthorIsVerified = users.find(user => user.id === tweetAuthorId).verified;
const tweetAuthorIsTranslator = users.find(user => user.id === tweetAuthorId).translator;
const tweetAuthorIsContributor = users.find(user => user.id === tweetAuthorId).contributor;
const tweetAuthorIsAdmin = users.find(user => user.id === tweetAuthorId).admin;
const tweetAuthorIsBot = users.find(user => user.id === tweetAuthorId).bot;
const tweetAuthorIsDeactivated = users.find(user => user.id === tweetAuthorId).deactivated;
const tweetAuthorIsWithheld = users.find(user => user.id === tweetAuthorId).withheld;
const tweetAuthorIsPrivate = users.find(user => user.id === tweetAuthorId).private;
const tweetAuthorIsLocked = users.find(user => user.id === tweetAuthorId).locked;
const tweetAuthorIsMonetizable = users.find(user => user.id === tweetAuthorId).monetizable;
const tweetAuthorIsSuperFollowEnabled = users.find(user => user.id === tweetAuthorId).super_follow_enabled;
const tweetAuthorIsSuperFollower = users.find(user => user.id === tweetAuthorId).super_follower;
const tweetAuthorIsSuperFollowEligible = users.find(user => user.id === tweetAuthorId).super_follow_eligible;
const tweetAuthorIsSuperFollowedBy = users.find(user => user.id === tweetAuthorId).super_followed_by;
const tweetAuthorIsSuperFollowing = users.find(user => user.id === tweetAuthorId).super_following;
const tweetAuthorIsSuperFollowedByCount = users.find(user => user.id === tweetAuthorId).super_followed_by_count;
const tweetAuthorIsSuperFollowingCount = users.find(user => user.id === tweetAuthorId).super_following_count;
```
		const tweetAuthorIsSuperFollowRequestSent = users.find( user => user.id === tweetAuthorId ).super_follow_request_sent;
		const tweetAuthorIsSuperFollowRequestReceived = users.find( user => user.id === tweetAuthorId ).super_follow_request_received;
		const tweetAuthorIsSuperFollowRequestApproved = users.find( user => user.id === tweetAuthorId ).super_follow_request_approved;
		const tweetAuthorIsSuperFollowRequestDenied = users.find( user => user.id === tweetAuthorId ).super_follow_request_denied;
		const tweetAuthorIsSuperFollowRequestExpired = users.find( user => user.id === tweetAuthorId ).super_follow_request_expired;
		const tweetAuthorIsSuperFollowRequestWithdrawn = users.find( user => user.id === tweetAuthorId ).super_follow_request_withdrawn;
		const tweetAuthorIsSuperFollowRequestBlocked = users.find( user => user.id === tweetAuthorId ).super_follow_request_blocked;
		const tweetAuthorIsSuperFollowRequestPending = users.find( user => user.id === tweetAuthorId ).super_follow_request_pending;
		const tweetAuthorIsSuperFollowRequestDeclined = users.find( user => user.id === tweetAuthorId ).super_follow_request_declined;
		const tweetAuthorIsSuperFollowRequestCanceled = users.find( user => user.id === tweetAuthorId ).super_follow_request_canceled;
		const tweetAuthorIsSuperFollowRequestTimedOut = users.find( user => user.id === tweetAuthorId ).super_follow_request_timed_out;
		const tweetAuthorIsSuperFollowRequestFailed = users.find( user => user.id === tweetAuthorId ).super_follow_request_failed;
		const tweetAuthorIsSuperFollowRequestSucceeded = users.find( user => user.id === tweetAuthorId ).super_follow_request_succeeded;
		const tweetAuthorIsSuperFollowRequestPendingApproval = users.find( user => user.id === tweetAuthorId ).super_follow_request_pending_approval;
		const tweetAuthorIsSuperFollowRequestPendingCancellation = users.find( user => user.id === tweetAuthorId ).super_follow_request_pending_cancellation;
		const tweetAuthorIsSuperFollowRequestPendingExpiration = users.find( user => user.id === tweetAuthorId ).super_follow_request_pending_expiration;
		const tweetAuthorIsSuperFollowRequestPendingWithdrawal = users.find( user => user.id === tweetAuthorId ).super_follow_request_pending_withdrawal;
		const tweetAuthorIsSuperFollowRequestPendingBlocking = users.find( user => user.id === tweetAuthorId ).super_follow_request_pending_blocking;
		const tweetAuthorIsSuper

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
			authorId: getAndroidId(authorId),
			authorName,
			authorScreenName,
			tweetUrl,
		};
		const recordExists = await checkInDatabase( tweetId );
		if ( !recordExists ) {
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
			userId,
			text: tweet.text,
			createdAt: tweet.created_at,
			inReplyToUserId: tweet.in_reply_to_user_id,
		};

		const alreadyInDatabase = await checkInDatabase( tweetData.id );

		if ( !alreadyInDatabase ) {
			await insertTweet( tweetData );
		}
	}
```

		if ( !alreadyInDatabase ) {
			await saveToDatabase( tweetData );
			existingRecordsFound++;
		}

		if ( existingRecordsFound >= STOP_FETCH_AT_EXISTING_RECORD_COUNT ) {
			console.log( `Found ${existingRecordsFound} existing records, stopping fetch.` );
			return;
		}
	}

	requestCount++;
	logTweetCount( tweets.length, requestCount );

	await retrieveTweets( nextMaxId, existingRecordsFound );
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

if ( includes.users ) {
 for ( const user of includes.users ) {
  const { id: userId, username, name, description, verified, public_metrics: { followers_count: followersCount, following_count: followingCount, listed_count: listedCount } } = user;

  const userData = {
   userId,
   username,
   name,
   description,
   verified,
   followersCount,
   followingCount,
   listedCount,
  };
				};

				// Removed `ReactNativeHostHandler.onRegisterJSIModules` interface.
			}
		}

				await saveToDatabase( userData );
			}
}

if (includes.media) {
  for (const media of includes.media) {
    const mediaId = media.media_key;
    const type = media.type;
    const url = media.url;
    const altText = media.alt_text;

    const mediaData = {
      mediaId,
      type,
      url,
      altText,
    };

    await saveToDatabase(mediaData);
  }
}

if (data.meta.next_token) {
  await retrieveTweets(data.meta.next_token, existingRecordsFound);
}
} catch (error) {
  if (error.code === "ERR_UNAVAILABLE") {
    console.error("Error fetching tweets: SMS is unavailable");
  } else {
    console.error("Error fetching tweets:", error);
  }
}
	if ( maxId ) {
// Remove deprecated installationId, isDevice, nativeAppVersion, nativeBuildVersion, platform.platform, platform.systemVersion, platform.userInterfaceIdiom properties.
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

		if ( newTweets.length > 0 ) {
			await saveToDatabase( newTweets );
			logTweetCount( newTweets.length );
		}

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
