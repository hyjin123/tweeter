/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "JSON",
    success: (data) => {
      console.log("success GET REQUEST")
      renderTweets(data);
    }
  })
}
// Load the previous made tweets as soon as the browser is loaded
loadTweets();

// preventing XSS with Escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  // clear the previous tweets before submiting and displaying
  $('#tweets-container').empty(); 
  // loops through tweets
  for (const item of tweets) {
  // calls createTweetElement for each tweet
  const $tweet = createTweetElement(item);
  // takes return value and appends it to the tweets container
  $('#tweets-container').prepend($tweet);
  }
};

const createTweetElement = function (data) {
  let $markup = `
    <article class="tweet">
      <header class="tweet-header">
        <div class="avatar-name">
          <img class="article-avatar" src=${escape(data.user.avatars)}>
          <span id="tweet-name" class="smaller-font">${escape(data.user.name)}</span>
        </div>
        <div id="tweet-handle">
          <span>${escape(data.user.handle)}</span>
        </div>
      </header>
      <p class="smaller-font">${escape(data.content.text)}</p>
      <footer class="tweet-footer">
        <div>
          <span>${escape(timeago.format(data.created_at))}</span>
        </div>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
   `
  return $markup;
};

const $form = $("form");
$form.submit(function(event) {
  event.preventDefault();
  // fetch the value of the submitted tweet (data)
  const value = $(this).serializeArray()[0].value;
  // if the text has no length, alert a message
  if (!value.length || value === null) {
    $("#empty").slideDown("slow", function(){});
  }
  // if the text exceeds 140 characters, alert a message
  if (value.length > 140) {
    $("#exceed").slideDown("slow", function(){});
  }
  const serializedData = $(this).serialize();
  // GET request using jQuery library
  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "text",
    data: serializedData,
    success: (data) => {
      console.log("server received the data!")
      // Load the tweet right after submission
      loadTweets();
      //clear the form after data is passed to the server
      $(this)[0].reset();
    }
  })
})

});
