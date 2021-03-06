{{#posts}}
  <div class="col-centered col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="item clearfix {{status}}">
      <form class = "vote" method="post" action="/posts/upvote">
        <input type="hidden" name="post_id" value="{{id}}">
        <input type="submit" value="">
      </form>
      <p class="post_vote">{{votes.length}}</p>
        {{#if file.url}}
          <a href = "/posts/{{id}}/show">
              <p><img src="{{file.url}}" ></p>
          </a>
        {{/if}}
      <p><a class="post_msg"href="/posts/{{id}}/show">{{content}}</a></p>
      <p><small>{{created_at}}</small></p>
      {{#comments}}
        <p>{{content}}</p>
      {{/comments}}
    </div>
  </div>
{{/posts}}
