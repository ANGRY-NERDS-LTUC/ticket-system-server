'use strict';

module.exports = (capability) => {
    return (req, res, next) => {
        try {
            if (req.user.type == 'client') {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}