function isLoggedIn(req, res, next) {
    console.log('code not doing much')
    req.user ? next() : res.sendStatus(401);
}

module.exports = {isLoggedIn};