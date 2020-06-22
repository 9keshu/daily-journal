const User = require('../models/users');
const Post = require('../models/post');
const emoji = require('node-emoji');


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign-up',{
        title:'Daily Journal | Sign-Up'
    });
}

module.exports.profile = async function(req,res){
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








module.exports.create = async function(req,res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    let user = await User.findOne({email:req.body.email});

    try{
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log(`Error in creating user ${err}`);}
                req.flash('success','User Created Successfully!!!');
                return res.redirect('/');
            });
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(`Error ${err}`);
        return;
    }
}

module.exports.createSession = async function(req,res){
    req.flash('success','Welcome!');  
    return res.redirect(`/users/profile`);
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('error','Sign-Out Successfully!');
    return res.redirect('/');
}

