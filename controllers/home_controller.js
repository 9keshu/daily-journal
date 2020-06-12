
module.exports.home = function(req,res){
    try{
        return res.render('home',{
            title:'Diary | Home'
        });
    }
    catch(err){
        console.log(`Error :: ${err}`);
    }
}