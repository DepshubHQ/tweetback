require('dotenv').config();
const { checkInDatabase, logTweetCount, saveToDatabaseApiV2, createTable } = require("./tweet-to-db");
const shouldFilterOutCircleTweets = process.argv.includes('removecircletweets');
const tweets = require("./tweets.js");

if (shouldFilterOutCircleTweets) {
	console.log("The `removecircletweets` argument is no longer supported. Please use the `--filter-out-circle-tweets` argument instead.");
	return;
}

let circleTweets;

if (shouldFilterOutCircleTweets) {
	circleTweets = require("./twitter-circle-tweet.js");
}

console.log( `${tweets.length} tweets found in archive.` );
logTweetCount();

function tweetIsForCircles(tweet) {
	return circleTweets.some(circleTweet => circleTweet.tweet.id_str === tweet.id_str);
}

async function retrieveTweets() {
	let existingRecordsFound = 0;
	let missingTweets = 0;
	let circleTweets = 0;

	for(let {tweet} of tweets ) {
		checkInDatabase(tweet).then((tweet) => {
```js
			if(tweet === false) {
				existingRecordsFound++;
			} else if (shouldFilterOutCircleTweets && tweetIsForCircles(tweet)) {
				circleTweets++;
				console.log( {circleTweets} );
			} else {
				saveToDatabaseApiV2(tweet);
			}
		});
	}
}
			} else {
				missingTweets++;
				saveToDatabaseApiV1(tweet);
				// console.log( "Missing tweet", { tweet });
				console.log( {existingRecordsFound, missingTweets} );
				logTweetCount();
			}
		});
```
	}
}

(async function() {
	try {
		await createTable();

		await retrieveTweets();
	} catch(e) {
		console.log( "ERROR", e );
	}
})();
