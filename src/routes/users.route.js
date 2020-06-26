const controller = require('../controllers/user.controller');

module.exports = router => {
    router.post('/users/login', controller.login);
    router.post('/users/signup', controller.signup);
    router.patch('/users/:id', controller.update);
    // router.get('/users', controller.list);
    router.get('/users/:id', controller.getById);
    router.get('/users/:id/comments', controller.listComments);
    router.get('/users/:id/posts', controller.listPosts);
    router.delete('/users/:id', controller.remove);
}