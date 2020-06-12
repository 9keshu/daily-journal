const User = require('../models/users');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign-up',{
        title:'Daily Journal | Sign-Up'
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.redirect('/');
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
                console.log('User Created!!');
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
    console.log('Session Created');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    console.log('Session Destroyed');
    return res.redirect('/');
}

