'use strict';
module.exports = function(app) {
    var tokenCtrl = require('../controllers/tokenController');

    // todoList Routes
    app.route('/token/create')
        // .get(todoList.list_all_tasks)
        .post(tokenCtrl.createToken);

    app.route('/token/open/:token')
        .get(tokenCtrl.openToken);


    // app.route('/tasks/:taskId')
    //     .get(tokenCtrl.read_a_task)
    //     .put(tokenCtrl.update_a_task)
    //     .delete(tokenCtrl.delete_a_task);
};
