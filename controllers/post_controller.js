const Post = require('../models/post');
const user = require('../models/users');

module.exports.create = async function(req,res){

    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        req.flash('success','Post Published!');
        return res.redirect('back');
    }
    catch(err){
        console.log(`Error ${err}`);
        return res.redirect('back');
    }
}