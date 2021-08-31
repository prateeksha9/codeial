const User = require('../../../models/users');
const jwt = require('jsonwebtoken')

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Incorrect Password or Username",
            });
        } else{
            return res.json(200, {
                message: "Sign in Successfull, Keep your token safe!!",
                data: {
                    // this is the part that gets encrypted
                    token: jwt.sign(user.toJSON(), 'codeial', {
                        expiresIn:'100000',
                    })
                }
            });

        }

    } catch(err){
        cosole.log('Error',err)
        return res.json(500,{
            message: "Internal Server Error",
        })
    }
}

