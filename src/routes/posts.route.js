const controller = require('../controllers/post.controller');

module.exports = router => {
    router.post('/posts', controller.create);
    router.patch('/posts/:id', controller.update);
    router.delete('/posts/:id', controller.remove);
    router.get('/posts', controller.list);
    router.get('/posts/:id', controller.getById);
    router.get('/posts/:id/comments', controller.listComments);
}