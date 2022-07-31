'use strict';

module.exports = (capability) => {
    return (req, res, next) => {
        try {
            if (req.user.role == 'admin') {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}