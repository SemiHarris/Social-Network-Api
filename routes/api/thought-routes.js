const router = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

router.route('/:user/:thoughtsId').delete(removeThought)

module.exports = router;