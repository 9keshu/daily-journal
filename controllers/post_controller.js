const Post = require('../models/post');
const User = require('../models/users');
const emoji = require('node-emoji');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

module.exports.create = async function(req,res){

    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id,
            date:req.body.date,
            title:req.body.title,
            place:req.body.place
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            });
        }

        req.flash('success','Post Published!');
        return res.redirect('back');
    }
    catch(err){
        console.log(`Error ${err}`);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){
            post.remove();

            req.flash('success','Post deleted Successfully!');
            return res.redirect('back');
        }
        else{
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(`Error ${err}`);
        return res.redirect('back');

    }
}
module.exports.loadPost = async function(req,res){
    try{
        let gotPost = await Post.findById(req.params.id);
        let gotPostId = req.params.id;
        let user = await User.findById(req.session.passport.user);
        let posts = await Post.find({user:req.session.passport.user});
        return res.render('profile',{
            title:'Daily Journal | Post Update',
            gotPost:gotPost,
            posts:posts,
            profile_user:user,
            gotPostId:gotPostId,
            emoji:emoji
        });
    }
    catch(err){
        console.log(`Error ${err}`);
        return res.redirect('back');
    }
    
}

module.exports.update = async function(req,res){
    try{
        if(req.params.id){
            let post = await Post.findByIdAndUpdate(req.params.id,req.body);
            console.log("post is :: ", post);
            

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"Post Updated!"
                });
            }
            
            req.flash('success','Post Updated!');
            return res.redirect('/posts/start-fresh');

        }
        else{
            return res.status(401).send('Unauthorized!');
        }

    }
    catch(err){
        console.log(`Error ${err}`);
    }
}


module.exports.startFresh = async function(req,res){
    let user = await User.findById(req.session.passport.user);
    let posts = await Post.find({user:req.session.passport.user});
    try{
        res.render('profile',{
            title:'Daily Journal | Profile',
            profile_user:user,
            posts:posts,
            gotPost:null,
            emoji:emoji
        });
    }
    catch(err){
        console.log(`Error ${err}`);
        return;
    }
    
}


module.exports.calculateSentiment = function(req,res){
    // let result = sentiment.analyze('Cats are stupid.');
    // console.log('Printing from sentiment '); 
    let textareadata = req.body.content;
    console.log('emoji package :: ', emoji.get);
    console.log('text area data is :: ',textareadata);
    let result = sentiment.analyze(textareadata);
    console.log('result is :: ',result);
    if(req.xhr){
        return res.status(200).json({
            data:{
                result:result,
            },
            emoji:emoji,
            message:"Sentiment Analyzed!"
        });
    }
}