const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughts,
    deleteThought,
    addNewReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
  

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughts)
    .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions/
router
    .route('/:id/reactions/')
  .post(addNewReaction);

    
    //  /api/thoughts/:thoughtId/reactions/:reactionid
router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;



