const controller = require('../controllers/comment.controller');

module.exports = router => {
    router.post('/comments', controller.create);
    router.put('/comments/:id', controller.update);
    router.delete('/comments/:id', controller.remove);
    router.get('/comments', controller.list);
    router.get('/comments/:id', controller.getById);
}