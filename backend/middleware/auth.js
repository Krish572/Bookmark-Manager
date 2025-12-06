function userAuthenication(req, res, next){
    const userId = req.cookies.userId;
    if(!userId){
        return res.status(401).json({message: "Not Authenticated"});
    }

    req.userId = userId;
    next();
}

module.exports = userAuthenication;