require 'pry'
# Homepage (Root path)

get '/' do
  @posts = Post.alive
  erb :index
end

#Sort
# get '/:status' do
#   @posts = Post.send "#{params[:status]}"
#   @posts.to_json
#   erb :index
# end


#Sort
get '/api/:status' do
  @posts = Post.send "#{params[:status]}"
  @posts.to_json(:include => [:votes, :comments])
end

#new message
get '/posts/:status/new' do
  @status = params[:status]
  @post = Post.new
  erb :'posts/new'
end

#Post message
post '/posts' do

    data = params[:data]
    filename = params[:filename]

    ## Decode the image
    data_index = data.index('base64') + 7
    filedata = data.slice(data_index, data.length)
    decoded_image = Base64.decode64(filedata)

    ## Write the file to the system
    file = File.new("public/uploads/#{filename}", "w+")
    file.write(decoded_image)




  @post = Post.new(
  status: params[:status],
  content: params[:content],
  file: params[:uploaded_file]
  )

  if @post.save
    "/uploads/#{filename}"
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
    params[:content] = nil
    redirect request.referer
  else
    erb :index
  end
end
