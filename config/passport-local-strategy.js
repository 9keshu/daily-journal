const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
async function(req,email,password,done){
    let user = await User.findOne({email:email});
    try{
        if(!user || user.password != password){
            console.log('Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
    }
    catch(err){
        console.log(`Error ${err}`);
        return done(err);

    }
    
}

));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findOne(id,function(err,user){
        if(err){console.log(`Error in finding the user using passport ${err}`);return done(err);}
        return done(null,user);
    });
});

//if user is authenticated then pass it to next controller
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/');
}

//if user is authenticated then set locals for the res

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user
        //from the sessions cookies and we are just sending it to the locals for the views
        res.locals.user = req.user;
        
    }
    next();
}

module.exports = passport;