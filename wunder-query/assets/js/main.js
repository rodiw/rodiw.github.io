/// Needed so the code runs after the page is rendered.
/// Like first you need to have poop in your stomache so you can go to the toilet to poop it, 
/// otherwise you'll just sit there on the toilet and revaluet your life for nothing.
$(document).ready(function () {
  // Global vars so I can use them everywhere
  var searchQuery,
      titles = [],
      content = [],
      links = []; 
  
  function printOutResult (titles, content, links, numLength) {
    for (var i = 0; i < numLength; i++) {
      $("#searchHolder").append("<li><a class='results' href='" + links[i] + "'><h3><strong>" + titles[i] + "</strong></h3></a><p>" + content[i] + "</p></li>");   
    } 
  }

  function getQuery() {
    searchQuery = $("#searchBox").val();
    var API = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ searchQuery + '&format=json';
    $.ajax({
      type: "GET",
      url: API,
      async: false,
      dataType: "jsonp",
      success: function(data) {
        titles = data [1];
        content = data[2];
        links = data[3];
        $("#searchHolder").html('');
        printOutResult(titles, content, links, titles.length);
      },
      error: function (errorMsg) {
        console.log(errorMsg);
      }
    });
  }

  $("#btnSend").on("click", getQuery);
  $("input").keypress(getQuery);
  
});
