$(document).ready(function() {

  function masonryFn(){
    $('.grid').masonry({
      transitionDuration: 0
    });
  };


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

  //homepage
  $.getJSON( "api/alive", function( posts ) {
    var source = $("#post-template").html();
    var template = Handlebars.compile(source);
    var context = {posts: posts};
    var html = template(context);
    $(".grid").html(html);
    masonryFn();
  });

  //drunk
  var show_drunk = false;
  $('#show_drunk').on("click", function(e){
    e.preventDefault();
    var container = document.querySelector('.grid');
    var msnry = new Masonry( container);
    show_drunk = !show_drunk;
    if (show_drunk == true) {
      $(".sober").parent().addClass('hide_sober');
      $(".high").parent().addClass('hide_high');
    } else {
      $(".sober").parent().removeClass('hide_sober');
      $(".high").parent().removeClass('hide_high');
    }
    msnry.layout();
  });

  //drunk
  var show_drunk = false;
  $('#show_drunk').on("click", function(e){
    e.preventDefault();
    var container = document.querySelector('.grid');
    var msnry = new Masonry( container);
    show_drunk = !show_drunk;
    if (show_drunk == true) {
      $(".sober").parent().addClass('hide_sober');
      $(".high").parent().addClass('hide_high');
    } else {
      $(".sober").parent().removeClass('hide_sober');
      $(".high").parent().removeClass('hide_high');
    }
    msnry.layout();
  });

  //drunk
  var show_drunk = false;
  $('#show_drunk').on("click", function(e){
    e.preventDefault();
    var container = document.querySelector('.grid');
    var msnry = new Masonry( container);
    show_drunk = !show_drunk;
    if (show_drunk == true) {
      $(".sober").parent().addClass('hide_sober');
      $(".high").parent().addClass('hide_high');
    } else {
      $(".sober").parent().removeClass('hide_sober');
      $(".high").parent().removeClass('hide_high');
    }
    msnry.layout();
  });



});

    //$(".high")&&(".sober").parentdiv("").css(display:none;)





  // $.getJSON( "api/alive", function( posts ) {
  //   var source = $("#post-template").html();
  //   var template = Handlebars.compile(source);
  //   var context = {posts: posts};
  //   var html = template(context);
  //   $(".grid").html(html);
  //   masonryFn();
  // });
