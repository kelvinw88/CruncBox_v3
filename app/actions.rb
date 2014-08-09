# Homepage (Root path)
get '/' do

  @posts = Post.alive
  erb :index
end

#Sort
get '/:status' do
  @posts = Post.send "#{params[:status]}"
  erb :index
end

#new message
get '/posts/:status/new' do
  @status = params[:status]
  @post = Post.new
  erb :'posts/new'
end

#Post message
post '/posts' do
  @post = Post.new(
  status: params[:status],
  content: params[:content],
  )
  if @post
    @post.save
    redirect '/'
  else
    erb :'posts/new'
  end
end

#Show message
get '/posts/:id/show' do
  @post = Post.find(params[:id])
  erb :'posts/show'
end

#Up vote
post '/posts/upvote' do
  session[:voted] ||= []

  if !(session[:voted].include? params[:post_id])
    @vote = Vote.create(
    post_id: params[:post_id]
    )
    session[:voted] << params[:post_id]
  end
  redirect '/'

end

#Comment
post '/posts/comment' do
  @comment = Comment.new(
  content: params[:content],
  post_id: params[:post_id]
  )
  if @comment.save
    @comment.save
    redirect "/"
  else
    erb :index
  end
end
