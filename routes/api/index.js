const router = require('express').Router();
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');
//http://localhost:3001/api/courses
//http://localhost:3001/api/students
router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
