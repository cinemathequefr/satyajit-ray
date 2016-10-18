$(function () {
  "use strict";

  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;



  viewer.init($("#viewer"), "");







  $.getJSON("data/data.json").then(function (data) {
    var template = _.template(
      [
        "<% _.forEach(data, function (d, i) { %>",
        "<div class='film'>",
        "<div class='header'><span class='rank'>{{ d.id }}.</span><br><span class='title'>{{ d.title }}</span><br><span class='director'>({{ d.director }}, {{ d.year }})</span></div>",
        "<div class='row'>",
        "<div class='details small-12 medium-6 end<% if (i % 2 === 0) { %> right medium-offset-6<% } %>'>",
        "<div class='thumb'></div>",
        "</div>",
        "</div>",
        "</div><% }) %>"
      ].join("")
      
    );

    $(".filmsContainer").append(template(
      { data: _(data).sortBy("id").reverse().value() }
    ));

    $(".thumb").on("click", function () {
      var $el = $(this);
      // console.log($el.offset().left, $el.offset().top - $("html").scrollTop());

      viewer.open($el);
    });




  });

});




