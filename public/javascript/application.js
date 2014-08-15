$(document).ready(function() {
  //TEXT AREA NO \n
  $('textarea').keypress(function(event) {
  if ((event.keyCode || event.which) == 13) {
      event.preventDefault();;
      return false;
    }
  });
  $('textarea').keyup(function() {
    var keyed = $(this).val().replace(/\n/g, '<br/>');
    $(this).html(keyed);
  });
  // MASONRY
  $('.grid').masonry({
    transitionDuration: 0
  });
  // index page alive post

  // $.getJSON( "api/alive", function( posts ) {
  //   var items = [];
  //   $.each( posts, function( index, post ) {
  //     items.push( "<li id='" + index + "'>" + post.content + "</li>" );
  //   });
  //   $( "<ul/>", {
  //     "class": "my-new-list",
  //     html: items.join( "" )
  //   }).appendTo( ".grid" );
  // });

  $.getJSON( "api/alive", function( posts ) {
    var source = $("#post-template").html();
    var template = Handlebars.compile(source);
    var context = {posts: posts};
    var html = template(context);
    $(".grid").html(html);
  });



  // sort drunk post
  $('#show_drunk').on("click", function(){
    $.getJSON( "api/drunk", function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
    });
  });
  // sort sober Post
  $('#show_sober').on("click", function(){
    $.getJSON( "api/sober", function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
    });
  });
  // sort high post
  $('#show_high').on("click", function(){
    $.getJSON( "api/high", function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
    });
  });
});
