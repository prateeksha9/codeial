{
    let createComment = function(){
        console.log("Js is creating comment")
        let newCommentForm = $('#post-comments');
        newCommentForm.submit(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let createComment = newCommentDom(data.data.comment);
                    $('#post-comments-list>ul').prepend(createComment);
                    deleteComment($(' .delete-comment-button',createComment));
                }, 
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    let newCommentDom = function(comment){
        console.log("Browser received comment ")
        return $(`<li id="comment-${comment._id}">
                    <p>
                        
                         <small>
                               <a class="delete-comment-button" href="/comments/destroy/${comment.id} ">Delete Comment</a>
                         </small>
                                
                         ${comment.content}
                        <br>
                        <small>
                        ${comment.user.name } 
                        </small>
                    </p>
                </li>`
                )
            }

    let deleteComment = function(deleteLink){
        console.log("Js is deleting comment")
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $( `#comment-${data.comment._id }`).remove();

                }, 
                error: function(error){
                    console.log(error.responseText);

                }
            })
        })
    }


    createComment();
}