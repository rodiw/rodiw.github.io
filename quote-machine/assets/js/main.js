$(document).ready(function () {
  // Global vars so I can use them everywhere
  var quote;
  var author;

  function getNewQuote() {
    $.ajax ({
      type: 'GET',
      url: 'http://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: function (response) {
        console.log(response);
        quote = response.quoteText;
        author = response.quoteAuthor;
        $("#quoteCont").html(quote);
        if (author) {
          $("#quoteAuth").text(" - " + author);
        } else {
          $("#quoteAuth").text(" - Unknown");
        }

      }
    });
  }

  $("#changeQuote").on("click", function (event) {
    event.preventDefault();
    getNewQuote();
  });

  $("#shareQuote").on("click", function (event) {
    event.preventDefault();
    var tweetQuote = "'" + quote + "' - " + author;
    window.open("https://twitter.com/intent/tweet?text=" + tweetQuote);
  });
 
});
