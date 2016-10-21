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
        "<div class='header'><span class='rank'>{{ d.id }}.</span><br><span class='title'>{{ d.title['fr'] }}</span><br><span class='director'>({{ d.director }}, {{ d.year }})</span></div>",
        "<div class='row'>",
        "<div class='details small-12 medium-6 end<% if (i % 2 === 0) { %> right medium-offset-6<% } %>'>",
        "<div class='row small-up-1 large-up-2'>",
        "<% _.forEach(d.media, function (m) { %>",
        "<% if (i % 2 === 1) { %><div class='column spacer'></div><%} %>",
        "<div class='column'><img data-media='{{ JSON.stringify(m) }}' class='thumb' src='img/800x600/{{ m.name }}.jpg'><div></div></div>",
        "<% }); %>",
        "</div>",
        "<div class='text'>{{ _.get(d.text, 'fr') }}</div>",
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

    viewer.on("viewer.open", function (e, f) {
      var data = f.source.data("media");
      // deepZoom.open($(".viewerContent"), "../satyajit-ray_dz/dz/" + data.name + "/", data.size[0], data.size[1]);
      deepZoom.open($(".viewerContent"), "http://cf.pasoliniroma.com/static/satyajit-ray/dz/" + data.name + "/", data.size[0], data.size[1]);

      $(".viewerContent").css({ cursor: "move" });
    });

    viewer.on("viewer.close", deepZoom.destroy);




  });

});




