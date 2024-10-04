const express = require('express');
const router = express.Router();

const {getUserEnrolledCourses, getCourseDetailsById, markCourseAsComplete} = require('../controllers/courseController')

router.route("/:userId/courses")
        .get(getUserEnrolledCourses)


router.get("/:userId/courses/:id", getCourseDetailsById);
router.patch('/:userId/courses/:courseId/complete', markCourseAsComplete); 


module.exports = router;
