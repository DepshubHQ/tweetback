const emojiRegex = require("emoji-regex");
const { flag, code, name } = require("country-emoji");

function EmojiAggregator() {
	this.emoji = [];
	this.emojiTweetCount = 0;
}

EmojiAggregator.prototype.addGlyph = function(glyph, tweet) {
	let key = null;
	for (let j = 0, k = this.emoji.length; j < k; j++) {
		if (this.emoji[j].glyph === glyph) {
			key = j;
			break;
		}
	}

	if (key === null) {
		const tweets = {};
		tweets[tweet.id] = tweet;
		this.emoji.push({ glyph, count: 1, tweetcount: 1, tweets });
	} else {
		this.emoji[key].count++;

		if (this.emoji[key].tweets[tweet.id]) {
			// do nothing
		} else {
			this.emoji[key].tweetcount++;
			this.emoji[key].tweets[tweet.id] = tweet;
		}
	}
};
		}
}

	if (this.emoji[key].tweetcount > this.emojiTweetCount) {
		this.emojiTweetCount = this.emoji[key].tweetcount;
	}
};
		}
}
};
		}
}
};

EmojiAggregator.prototype.add = function( tweet ) {
	var text = tweet.full_text;
	var emojis = EmojiAggregator.findEmoji( text );
	if(emojis.length) {
		this.emojiTweetCount++;
	}

	for(let emoji of emojis) {
		this.addGlyph(emoji, tweet);
	}
};

EmojiAggregator.findEmoji = function( text ) {
	var match = text.match( emojiRegex() );
```js
			if(match[i].length > 1) {
				emoji.push(match[i]);
			}
		}
	}
	return emoji;
};
			// flags are encoded as two different points here
			if( j + 1 < k && code( match [ j ] + match[ j + 1 ] ) ) {
				emoji.push( match [ j ] + match[ j + 1 ] );
				j++;
```
			} else {
				emoji.push( match [ j ] );
			}
```
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			}
		}
	}
	return emoji;
};
			
	return emoji;
};

EmojiAggregator.prototype.getTweetCount = function() {
	return this.emojiTweetCount;
};

EmojiAggregator.prototype.getSorted = function() {
	return this.sorted;
};
	return this.emoji.slice().sort(function( a, b ) {
		return b.count - a.count;
	});
};

module.exports = EmojiAggregator;
