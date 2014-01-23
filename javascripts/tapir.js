$.urlParam = function(name){
 var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
 if (!results) { return 0; }
 return results[1] || 0;
}

$('document').ready(function(){
  $('#tapir_search_results').each(function(){
    var results_div = $(this);
    $.getJSON(
      'http://tapirgo.com/api/1/search.json?token=' + results_div.data('api_key') + '&query=' + $.urlParam('query') + '&callback=?',
      function(data){
				if (data.length == 0)
					results_div.html('<div class="alert alert-danger">No results found!</div>')
				else
					results_div.html('')	
        $.each(data, function(key, val) {
          results_div.append('<div class="well result"><h3><a href="' + val.link + '">' + val.title + '</a></h3><p>' + $("<div/>").html(val.summary).text() + '</p></div>');					
        });
				$(".result").dotdotdot({
						after: "a.readmore"
				});
				$(".result").trigger("update.dot");
      }
    );
  });
});