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
    // let updatePost = function(){
    //     let updatePostForm = $('#update_form');
    //     updatePostForm.submit(function(event){
    //         event.preventDefault();
            
    //         let firsturl = '/posts/update/';
    //         let secondurl = '${gotPostId}';
    //         let res = firsturl.concat(secondurl);
    //         console.log('resultant link is :: ',res);
    //         $.ajax({
    //             type:'post',
    //             url:res,
    //             data:updatePostForm.serialize(),
    //             success: function(data){
    //                 console.log(data);
    //                 let newPost = newPostDom(data.data.post);
    //                 $('#previous-entires>ol').prepend(newPost);
    //             },
    //             error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         });

    //      });
    // }


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



    let newEmoji = function(comparativeScore,emoji){
        // console.log('emoji object is :: ', emoji.abc);
        if(comparativeScore == 0){
            return $(`<p id="emoji-para">${emoji.emoji.neutral_face}</p>`);
        }
        else if(comparativeScore > 0){
            return $(`<p id="emoji-para">${emoji.emoji.smiley}</p>`);
        }
        else{
            return $(`<p id="emoji-para"> ${emoji.emoji.cry} </p>`);
        }
        
    }
 
    // calculating the sentiment
    let calculateSentiment = function(){
            let testData = testDataInput.val();
            console.log('keypressed! and data is ::',testData);
       
        

            $.ajax({
                type:'post',
                url:'/posts/calculate-sentiment',
                data:testDataInput.serialize(),
                success: function(data){
                    console.log('Comparative score is :: ',data);
                    //data.result.comparative, get(':smile:')
                    // console.log('fav emoji :: ', data.emoji.emoji.);
                    let newEmojiFace = newEmoji(data.data.result.comparative,data.emoji);
                    $('#emoji_box>p').remove();
                    $('#emoji_box').append(newEmojiFace);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });



    }






















    createPost();
    // updatePost();
    var testDataInput = $('#text_area');
    testDataInput.on('keypress',calculateSentiment);
    
}