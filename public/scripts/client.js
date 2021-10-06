/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
// loops through tweets
for (const item of tweets) {
  // calls createTweetElement for each tweet
  const $tweet = createTweetElement(item);
  // takes return value and appends it to the tweets container
  $('#tweets-container').append($tweet);
}
};

const createTweetElement = function (data) {
  let markup = `
    <article class="tweet">
      <header class="tweet-header">
        <div class="avatar-name">
          <img class="article-avatar" src=${data.user.avatars}>
          <span id="tweet-name" class="smaller-font">${data.user.name}</span>
        </div>
        <div id="tweet-handle">
          <span>${data.user.handle}</span>
        </div>
      </header>
      <p class="smaller-font">${data.content.text}</p>
      <footer class="tweet-footer">
        <div>
          <span>${timeago.format(data.created_at)}</span>
        </div>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
   `
  return markup;
};

renderTweets(data);

});
