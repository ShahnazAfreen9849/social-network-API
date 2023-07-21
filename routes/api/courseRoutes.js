const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/courseController.js');

// /api/courses
// http://localhost:3001/api/courses/
router.route('/').get(getCourses).post(createCourse);

// /api/courses/:courseId
//http://localhost:3001/api/courses/649e3c58bba8e5521fef30ab
router
  .route('/:courseId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
