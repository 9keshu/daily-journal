{
    
    let createPost = function(){
        let newPostForm = $('#new_post_form');
        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#previous-entires>ol').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });

    }

    //method to update the current post
    let updatePost = function(){
        let updatePostForm = $('#update_form');
        updatePostForm.submit(function(event){
            event.preventDefault();
            

            $.ajax({
                type:'post',
                url:'/posts/update/' + ${gotPostId},
                data:updatePostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#previous-entires>ol').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

         });
    }


    //method to create new post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post.id}">
        <div id="diary-display-container">
            <p>${post.title}  @ ${post.place} ${post.date}</p>
           </div>
           <div id="post_delete_update">
               <span id="edit-btn"><a href="/posts/get-content/${post.id}"><i class="fas fa-edit"></i></a></span>
               <span id="delete-btn"><a class="delete-post-button" href="/posts/destroy/${post.id}"><i class="fas fa-trash-alt"></i></a></span>
           </div>
    </li>`);
    }

    createPost();
    updatePost();
}