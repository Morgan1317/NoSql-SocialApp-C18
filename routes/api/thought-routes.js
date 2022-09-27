const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughts,
  deleteThought,
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
    .get(getAllThoughts)
    .post(createThought)
  

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)

//   api/thoughts/userId

//   api/thoughts/userId/thoughtId
router
    .route('/:userId/:id').delete(deleteThought);


module.exports = router;



