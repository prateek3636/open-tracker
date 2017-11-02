'use strict';
module.exports = function(app) {
    var tokenCtrl = require('../controllers/tokenController');

    // todoList Routes
    app.route('/token/create')
        .post(tokenCtrl.createToken);

    app.route('/token/open/:token')
        .get(tokenCtrl.openToken);

    app.route('/token/stats')
        .post(tokenCtrl.createStats);

    app.route('/token/eventLog/:token')
        .get(tokenCtrl.openToken);


    // app.route('/tasks/:taskId')
    //     .get(tokenCtrl.read_a_task)
    //     .put(tokenCtrl.update_a_task)
    //     .delete(tokenCtrl.delete_a_task);
};
