const router = require('express').Router();
const { addThought, 
        removeThought,
        addReaction,
        removeReaction} = require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

router.route('/:userId/:thoughtsId')
    .put(addReaction)   
    .delete(removeThought);

router.route('/:userId/:thoughtsId/:reactionsId').delete(removeReaction)

module.exports = router;