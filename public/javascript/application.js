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


  function remove_post(new_posts,old_posts){
    var onlyInOld = old_posts.filter(function(old_post){
        return new_posts.filter(function(new_post){
            return (new_post.id == old_post.id) && (new_post.updated_at == old_post.updated_at)
        }).length == 0
    });
    for (num in onlyInOld){
      $(".grid").find("[data-id='" + onlyInOld[num].id + "']").remove();
    }
  };


  function add_post(new_posts,old_posts){
    var onlyInNew = new_posts.filter(function(new_post){
        return old_posts.filter(function(old_post){
            return (old_post.id == new_post.id) && (new_post.updated_at == old_post.updated_at)
        }).length == 0
    });
    var context = {posts: onlyInNew};
    html = template(context);
    $('.grid').prepend(html);
  }



  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var day = date.getDate();
    var month = date.getMonth();
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm + ' ' + monthNames[month] + ' ' + day;
    return strTime;
  }

  Handlebars.registerHelper('fulldate', function(date) {
    date = new Date(date);
    return formatAMPM(date);
  });


  //getting posts

  var source = $("#post-template").html();
  var template = Handlebars.compile(source);
  var old_posts = null;
  function get_post(){
    $.getJSON( "api/alive", function( posts ) {
    if (old_posts != null) {
      var new_posts = posts;
      remove_post(new_posts,old_posts);         //REMOVE OLD POST
      add_post(new_posts,old_posts);         //NEW POST
      var msnry = set_masonry_fn();        //RESET LAYOUT
      msnry.layout();

    } else {
      var context = {posts: posts};
      html = template(context);
      $(".grid").html(html);
      set_masonry_fn();
      masonry_no_animation_fn();
      enter_disable_fn();
    }
    old_posts = posts;
    sched_post();
    })
  };

  function sched_post() {
    setTimeout(function() {
      get_post();
    }, 1000);
  }


  //doesn't promt error message. can be submited mutiplue times
  function validateForm() {
    var x = $('.message_box[name="content"]');
    if (x >= 4) {
        alert("Must be Longer than 3 char");
        return false;
    }
  }

  //get post

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


  //POSTING


  var files = [];
  var content = null;

  $(function(){
    $(".uploaded_file").change(function(event) {
      $.each(event.target.files, function(index, file) {
        var reader = new FileReader();
        reader.onload = function(event) {
          object = {};
          object.filename = file.name;
          object.data = event.target.result;
          files.push(object);
        };
        reader.readAsDataURL(file);
      });
    });

    $(".post_box").submit(function(form) {
      var file_type = this.uploaded_file.value.split(".")[1];
      form.preventDefault();
      content = this;
      var data = $(this).serialize()
      var post_msg = $(this).find('textarea').val().length;
      var no_attachment = typeof file_type == 'undefined';
      if (post_msg < 3){
        $(this).parents("#post_boxes").prepend("<h1 class='error_message'>Yo, Say something!</h1>");
        $('.error_message').fadeIn(1000).delay(2000).fadeOut(1000);
      } else if (no_attachment && post_msg > 2){
        $(this).find("textarea").val("");
        $(this).parent().hide();
        $.post( "/posts", data);
        console.log("without photo");
      } else if ( no_attachment || ["jpg", "png", "gif"].indexOf(file_type.toLowerCase()) > 0 )   {

        $.each(files, function(index, file) {
          $.ajax({url: "/posts",
            type: 'POST',
            data: {
              filename: file.filename,
              data: file.data,
              content: content.content.value,
              status: content.status.value}
          });
        });
        files = [];
        content.content.value = "";
        content.uploaded_file.value = "";
        $(content).parent().hide();
        console.log("with photo");
      } else {

        $(this).parents("#post_boxes").prepend("<h1 class='error_message'>Yo, we accept images only.</h1>");
        $('.error_message').fadeIn(1000).delay(2000).fadeOut(1000);

      }
    });
  });

  //VOTES

  var voted_posts = [];
  $(".container").on("submit", ".vote", function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var clicked_post = this;
    var clicked_post_id = $(this).parent().data().id;
    if (voted_posts.indexOf(clicked_post_id) == -1){
    $(clicked_post).parent().find('.post_vote').text(parseInt($(clicked_post).parent().find('.post_vote').text())+1);
    voted_posts.push(clicked_post_id);
    $.post( '/posts/upvote', data, function(vote){});
    }
  });

  //COMMENTS
  $(".container").on("submit", ".post_comment", function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var commented_post = this;
    var input = $(commented_post).find('textarea').val();
    $(this).parent().append("<p>" + input + "</p>")
    $.post( '/posts/comment',data , function(json){});
    $(commented_post).find('textarea').val("");
    var msnry = set_masonry_fn();        //RESET LAYOUT
    msnry.layout();
  });








});
