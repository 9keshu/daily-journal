const User = require('../models/users');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign-up',{
        title:'Daily Journal | Sign-Up'
    });
}

module.exports.profile = async function(req,res){
    let user = await User.findOne(req.params.id);
    try{
        res.render('profile',{
            title:'Daily Journal | Profile',
            profile_user:user
        });
    }
    catch(err){
        console.log(`Error ${err}`);
    }
    
}

// module.exports.signIn = function(req,res){
//     if(req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }

//     return res.redirect('/');
// }

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

module.exports.createSession = function(req,res){
    req.flash('success','Welcome!');
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('error','Sign-Out Successfully!');
    return res.redirect('/');
}

