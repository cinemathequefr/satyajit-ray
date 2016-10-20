$(function () {
  "use strict";

  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;




  viewer.init($("#viewer"), "");
  $(".viewerContent").attr("id", "dz-view");




  $.getJSON("data/data.json").then(function (data) {
    var template = _.template(
      [
        "<% _.forEach(data, function (d, i) { %>",
        "<div class='film'>",
        "<div class='header'><span class='rank'>{{ d.id }}.</span><br><span class='title'>{{ d.title['en'] }}</span><br><span class='director'>({{ d.director }}, {{ d.year }})</span></div>",
        "<div class='row'>",
        "<div class='details small-12 medium-6 end<% if (i % 2 === 0) { %> right medium-offset-6<% } %>'>",
        "<div class='row small-up-1 large-up-2'>",
        "<% _.forEach(d.media, function (m) { %>",
        "<% if (i % 2 === 1) { %><div class='column spacer'></div><%} %>",
        "<div class='column'><img class='thumb' src='img/800x600/{{ m.name }}.jpg'><div></div></div>",
        "<% }); %>",
        "</div>",
        "<div class='text'>{{ d.text }}</div>",
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
      viewer.open($el);
    });

    viewer.on("viewer.open", function () {
      // deepZoom.open($(".viewerContent"), "http://cf.pasoliniroma.com/static/truffaut/dz/1-1/", 2200, 1590);
      deepZoom.open($(".viewerContent"), "../satyajit-ray_dz/dz/42-1/", 1535, 1148);
      $(".viewerContent").css({ cursor: "move" });
    });

    viewer.on("viewer.close", deepZoom.destroy);




  });

});




