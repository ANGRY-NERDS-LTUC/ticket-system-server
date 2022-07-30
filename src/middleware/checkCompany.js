'use strict';

module.exports = (capability) => {
    return (req, res, next) => {
        try {
            if (req.user.type == 'company') {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login 3')
        }
    }
}