function authenticationMW(req, res, next) {
    // console.log(req.session.id)
    if (req.session) {
        if (req.session.customerID || req.session.dealerID) {
            next()
        } else {
            res.render('login', {message: 'Please log in to view this page.'})
        }
    } else {
        res.render('login', {message: 'Please log in to view this page.'})
    }
}

module.exports = authenticationMW