checkId = (req, res, next) => {
    if(req.body.ok) {
        next();
    }
    else {
        res.status(500).send({message : 'Oke'});
        return;
    }
}
var verifyAuth = {
    checkId
}

module.exports = verifyAuth;