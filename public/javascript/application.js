$(document).ready(function() {

  $.getJSON( "api/alive", function( posts ) {
    var source = $("#post-template").html();
    var template = Handlebars.compile(source);
    var context = {posts: posts};
    var html = template(context);
    $(".grid").html(html);
  });


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







});
