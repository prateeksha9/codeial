module.exports.setFlash = function(req,res, next){
    res.locals.flash = {
        // find key in flash, fetches it and puts in middleware
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    next();
}