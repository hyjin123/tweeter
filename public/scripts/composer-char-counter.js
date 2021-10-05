// this makes sure that html is loaded before we run our code
$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let counter = $(this).parent().find(".counter");
    counter.text(140 - $(this).val().length);
    if (counter.text() < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
});