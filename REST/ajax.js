// JavaScript Document

(function(hbs, $) {
  $(function() {
    // Precompile handlebars.
    var template = hbs.compile($('#partial-images').html());
    // Create promise.
    var request = $.ajax({
      url: 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=giftcards.com&rsz=8',
      dataType: 'jsonp',
      crossDomain: true
    });
    // Handle success
    request.done(function(data) {
      var results = data.responseData && data.responseData.results
        , status = data.responseStatus;
      // This isn't the normal way of handling it, but they return the status code in their
      // response body
      if (status === 200 && results && results.length) {
        var html = template(results);
        $('.container-images').html(html);
      } else {
        // There may be a chance that it responds with 200, but doesn't have images.
        $(".error").toggle();
      }
    });
    // Handle error, if it occurs normally
    request.error(function(xhr) {
      // I couldn't get an error to occur
      $(".error").toggle().html(xhr.responseText);
    });
  });
})(Handlebars, jQuery);