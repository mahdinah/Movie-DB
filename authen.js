const users = require("./users");

function authUser(req, res, next) {
    let usr = req.body.username; 
    //let pswrd = req.body.password;
    if (usr == null){
        res.status(403);
        return res.send('you need to sign in');
    }
    else {
        for(let i =0; i <= users.length; i++){
            if (users[i].username == usr && users[i].password == pswrd ){
                return res.send('you are logged in');
            }
            else{
                res.status(403)
                return res.send('your credentials are wrong')
            }
        }
    }
    next();
}

module.exports = {
    authUser
}