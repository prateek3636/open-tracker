'use strict';
module.exports = function(app) {
    var tokenCtrl = require('../controllers/tokenController');

    // Token Routes
    app.route('/token/create')
        .post(tokenCtrl.createToken);

    app.route('/token/open/:token')
        .get(tokenCtrl.openToken);

    app.route('/token/stats')
        .get(tokenCtrl.createStats);

    app.route('/token/eventLog/:token')
        .get(tokenCtrl.eventLog);

};
