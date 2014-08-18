$(document).ready(function() {


  function set_masonry_fn(){
    var container = document.querySelector('.grid');
    var msnry = new Masonry(container, {});
    return msnry;
  };

  function masonry_no_animation_fn(){
    $('.grid').masonry({
      transitionDuration: 0
    });
  };

  function enter_disable_fn(){
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
  };

  function remove_hide_fn() {
    $(".grid").find(".drunk").parent().removeClass('hide_drunk');
    $(".grid").find(".sober").parent().removeClass('hide_sober');
    $(".grid").find(".high").parent().removeClass('hide_high');
  };

  function add_hide_fn() {
    $(".grid").find(".sober").parent().addClass('hide_sober');
    $(".grid").find(".high").parent().addClass('hide_high');
    $(".grid").find(".drunk").parent().addClass('hide_drunk');
  };

  function show_class_fn(class_name){
    add_hide_fn();
    $(".grid").find("."+ class_name).parent().removeClass("hide_" + class_name);

  };

  $.fn.slideFadeToggle  = function(speed, easing, callback) {
    return this.animate({
      opacity: 'toggle',
      height: 'toggle'},
      speed, easing, callback);
  };

  $.fn.slideFadeUp  = function(speed, easing, callback) {
          return this.animate({
            opacity: 'toggle',
            height: 0},
            speed, easing, callback);
  };
  //homepage

  var source = $("#post-template").html();
  var template = Handlebars.compile(source);

  function get_post(){
    $.getJSON( "api/alive", function( posts ) {
      var context = {posts: posts};
      var html = template(context);
      $(".grid").html(html);
      // sched_post();
      set_masonry_fn()
      masonry_no_animation_fn();
      enter_disable_fn();
    });
  };

  function sched_post() {
    setTimeout(function() {
      get_post();
    }, 5000);
  }

  function remove_post(){

  };

  function add_post(){


  };

  get_post();


  //cick on logo
  $('#logo').on("click", function(){
    remove_hide_fn();
    get_post();
    msnry.layout();
  });


  var show_drunk = false;
  $('#show_drunk').on("click", function(){
    var msnry = set_masonry_fn();
    show_drunk = !show_drunk;
    if (show_drunk == true) {
      show_high = false;
      show_sober = false;
      show_class_fn("drunk");
    } else {
      remove_hide_fn()
    }
    msnry.layout();
  });

  var show_sober = false;
  $('#show_sober').on("click", function(e){
    var msnry = set_masonry_fn();
    show_sober = !show_sober;
    if (show_sober == true) {
      show_high = false;
      show_drunk = false;
      show_class_fn("sober");
    } else {
      remove_hide_fn()
    }
    msnry.layout();
  });

  var show_high = false;
  $('#show_high').on("click", function(){
    var msnry = set_masonry_fn();
    show_high = !show_high;
    if (show_high == true) {
      show_drunk = false;
      show_sober = false;
      show_class_fn("high");
    } else {
      remove_hide_fn()
    }
    msnry.layout();
  });

  //hide msg box at first
  $("#post_drunk").on("click",function(){
      $(".center_wrap.sober").slideUp();
      $(".center_wrap.high").slideUp();
      setTimeout(function(){
      $(".center_wrap.drunk").slideFadeToggle()}
      ,500);

  });

  $("#post_high").on("click",function(){
    $(".center_wrap.drunk").slideUp();
    $(".center_wrap.sober").slideUp();
    setTimeout(function(){
    $(".center_wrap.high").slideFadeToggle()}
    ,500);
  });

  $("#post_sober").on("click",function(){
    $(".center_wrap.drunk").slideUp();
    $(".center_wrap.high").slideUp();
    setTimeout(function(){
    $(".center_wrap.sober").slideFadeToggle()}
    ,500);
  });




});
