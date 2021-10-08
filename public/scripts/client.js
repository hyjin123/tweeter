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
};

// Load the previous made tweets as soon as the browser is loaded
loadTweets();

// feature that toggles the form when you press the arrow button in the nav bar
$("#tweet").click(function() {
  $(".new-tweet").toggle("slow");
  $("#error").slideUp("slow");
  $("textarea").focus();
});

// feature that shows the toggle button based on the vertical position
$(document).scroll(function() {
  let position = $(this).scrollTop();
  if (position > 400) {
    $("#toggle-button").fadeIn();
  } else {
    $("#toggle-button").fadeOut();
  }
});

// feature that lets you scroll to the top when you toggle the button
$("#toggle-button").click(function() {
  $(".new-tweet").slideDown("slow");
  $("textarea").focus();
  window.scrollTo({top: 0, behavior: 'smooth'});
});

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
      <p class="text smaller-font">${escape(data.content.text)}</p>
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

// renders error message pop up on the HTML using slidedown
const errorMessage = function(message) {
  const $markup = `
  <section hidden id="error">
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <span>${message}</span>
      <i class="fas fa-exclamation-triangle"></i>
    </div>
  </section>
  `
  $(".container").prepend($markup);
  $("#error").slideDown("slow");
};

// Ajax POST request
const $form = $("form");
$form.submit(function(event) {
  event.preventDefault();
  // fetch the value of the submitted tweet (data)
  const value = $(this).serializeArray()[0].value;
  // hide the error message before validation
  $("#error").slideUp("slow")
  // if the text has no length, alert a message
  if (!value.length || value === null) {
    return errorMessage("Your tweet cannot be empty!");
  }
  // if the text exceeds 140 characters, alert a message
  if (value.length > 140) {
    return errorMessage("Your tweet cannot exceed 140 characters!");
  }
  const serializedData = $(this).serialize();
  // GET request using jQuery library
  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "text",
    data: serializedData,
    success: (data) => {
      // Load the tweet right after submission
      loadTweets();
      //clear the form after data is passed to the server
      $(this)[0].reset();
     // hide the error message after submission
      $("#error").slideUp("slow")
      // reset the character counter after submission
      $(".counter").text(140);
    }
  })
})

});
