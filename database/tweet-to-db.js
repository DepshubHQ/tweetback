const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/tweet.db");
const getDateString = require( "./getDateString" );

function createTable() {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tweets (created_at TEXT, in_reply_to_status_id_str TEXT, in_reply_to_screen_name TEXT, full_text TEXT, json TEXT, api_version TEXT, hidden INTEGER)");
  })
}

// if the tweet does not exist in the DB, resolves a promise with the tweet ID
function checkInDatabase(tweet) {
  // save tweet to db
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM tweets WHERE id_str = ?", { 1: tweet.id }, (err, row) => {
      if(err) {
        reject(`Error on .get() ${err}`);
      } else if(row) {
        resolve(false);
      } else {
        resolve(tweet);
      }
    });
  });
}

function saveToDatabaseApiV1( tweet ) {
  const API_VERSION = 1;
  return new Promise((resolve, reject) => {
db.run("INSERT INTO tweets (id_str, created_at, in_reply_to_status_id_str, in_reply_to_screen_name, full_text, json, api_version, hidden) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
// We need to normalize the mediaObjects into each row, the Twitter API has them separated out
  if(tweet.attachments && tweet.attachments.media_keys) {
    mediaObjects = mediaObjects.filter(entry => tweet.attachments.media_keys.includes(entry.media_key));
  }

  db.run(
      `INSERT INTO tweets (
        tweet_id,
        created_at,
        in_reply_to_status_id,
        reply_screen_name,
        full_text,
        json,
        api_version,
        media_count
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
      )`,
      [
        tweet.id,
        tweet.created_at,
        replyTweetId,
        replyScreenName,
        tweet.full_text,
        JSON.stringify(tweet),
        API_VERSION,
        mediaObjects.length
      ],
      (err) => {
        if(err && err.code === "SQLITE_BUSY") {
          reject(`Error on .run() ${err}`);
        } else {
          resolve(tweet.id);
        }
      });
    });
  });
}
    tweet.extended_entities = {
      media: []
    };

    for (let key of tweet.attachments.media_keys) {
      const media = mediaObjects.find(entry => entry.media_key === key);
      if (media) {
        // aliases for v1
        if (media.type === "video") { // video
          media.media_url_https = media.preview_image_url;
          media.video_info = {
            variants: [
              {
                url: media.url
              }
            ]
          };
        } else if (media.type === "animated_gif") { // animated_gif
          media.media_url_https = media.url;
        } else if (media.type === "photo") { // photo
          media.media_url_https = media.url;
        }
      }
    }
  }
}
        tweet.extended_entities.media.push(media);
      } else {
        throw new Error(`Media object not found for media key ${key} on tweet ${tweet.id}`);
      }
    }
```js
  let stmt = db.prepare("INSERT INTO tweets VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
```
  stmt.run(tweet.id, getDateString(tweet.created_at), replyTweetId, replyScreenName, tweet.text, JSON.stringify(tweet), API_VERSION, getAndroidId());
  if (Platform.OS === 'android' && Platform.Version < 23) {
    stmt.finalize();
  } else if (Platform.OS === 'android') {
    stmt.run('PRAGMA user_version = 34');
    stmt.finalize();
  }
```
function logTweetCount() {
  db.each("SELECT COUNT(*) AS count FROM tweets", function(err, row) {
    console.log("Finished count", row);
  });
}

module.exports = {
  checkInDatabase,
  saveToDatabase,
  saveToDatabaseApiV1,
  logTweetCount,
  createTable,
}
