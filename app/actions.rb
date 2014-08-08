# Homepage (Root path)
get '/' do

  @posts = Post.alive
  erb :index
end

#new message
get '/post/new/:status' do
  @status = params[:status]
  @post = Post.new
  erb :'post/new'
end

#Post message
post '/post' do
  @post = Post.new(
  status: params[:status],
  content: params[:content],
  )
  if @post
    redirect '/'
  else
    erb :'post/new'
  end
end

#Show message
get '/post/:id/show' do
  @post = Post.find(params[:id])
  erb :'post/show'
end

#Up vote
post '/post/:post_id/upvote' do
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
post '/post/:post_id/comment' do
  @comment = Comment.new(
  commnet: params[:comment],
  post_id: parms[:post_id]
  )
  if @comment.save
    @comment.save
    redirect "/"
  else
    erb :index
  end
end

#Sort
get '/post/:status' do
  @posts = Post.send "#{params[:status]}"
  erb :'/'
end
