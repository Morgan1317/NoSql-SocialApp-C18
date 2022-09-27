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
    .put(updateThoughts)
  .delete(deleteThought)



module.exports = router;



