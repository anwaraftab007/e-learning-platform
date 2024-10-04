const express = require('express');
const router = express.Router();


const { getAllCourses, getCourseById, searchCourses} = require('../controllers/courseController');


router.route("/courses")                  
  .get(getAllCourses)            

router.route("/courses/:id")               
  .get(getCourseById)

router.get('/search', searchCourses);

module.exports = router;           
