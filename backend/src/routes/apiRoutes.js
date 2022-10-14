let router = require('express').Router();
var projectController = require('../controller/projectController');

router.route('/')
    .get(projectController.index);

router.route('/repos')
    .get(projectController.view);

//detail by id
// router.route('/projects/id/:project_id')
//     .get(projectController.detail);

//search by name
// router.route('/projects/search/:name')
//     .get(projectController.search);

module.exports = router;