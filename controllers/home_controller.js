module.exports.home = function(req, res){
    return res.end('<h1>Express is up</h1>')

}


module.exports.actionName = function(req, res){
    return res.end('<h1>ActionName</h1>')
}