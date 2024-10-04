const pool = require('../db');


const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json(rows);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Error fetching courses' }); 
  }
};


const getCourseById = async (req, res) => {
  const courseId = parseInt(req.params.id); 

  if (isNaN(courseId)) {
    return res.status(400).json({ message: 'Invalid course ID' }); 
  }

  try {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [courseId]); 
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' }); 
    }
    res.json(rows[0]); 
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Error fetching course' }); 
  }
};

const getUserEnrolledCourses = async (req, res) => {
  const userId = parseInt(req.params.userId); 

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' }); 
  }

  try {
    
    const [rows] = await pool.query(`
      SELECT 
        ue.id, ue.user_id, ue.course_id, ue.completion, 
        c.title, c.description, c.instructor, c.category
      FROM user_enrollments ue
      JOIN courses c ON ue.course_id = c.id
      WHERE ue.user_id = ?
    `, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No enrolled courses found for this user' }); 
    }

    res.json(rows); 
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Error fetching enrolled courses' }); 
  }
};























    






const getCourseDetailsById = async (req, res) => {
  const { userId, id } = req.params;
  
  try {
    let query = `
  SELECT ue.course_id as id, ue.completion, ue.lessons_completed, ue.title, 
         ue.description, ue.instructor, ue.category, ue.mark_as_complete, 
         ue.list_of_lessons, ue.start_date, ue.end_date, ue.status, c.totalLessons
  FROM user_enrollments ue
  JOIN courses c ON ue.course_id = c.id
  WHERE ue.user_id = ?;
`;


    const [rows] = await pool.query(query, [userId, id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = rows[0];
    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ message: 'Failed to fetch course details.' });
  }
};

const searchCourses = async (req, res) => {
  const { query } = req.query; 
  try {
    const [rows] = await pool.query(
      `SELECT * FROM courses WHERE title LIKE ? OR description LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.status(500).json({ message: 'Server Error' });
  }
};
const markCourseAsComplete = async (req, res) => {
  const userId = parseInt(req.params.userId); 
  const courseId = parseInt(req.params.courseId); 

  if (isNaN(userId) || isNaN(courseId)) {
    return res.status(400).json({ message: 'Invalid user ID or course ID' }); 
  }

  try {
    const query = `
      UPDATE user_enrollments
      SET mark_as_complete = 1
      WHERE user_id = ? AND course_id = ?
    `;
    const [result] = await pool.query(query, [userId, courseId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found for this user' });
    }

    res.status(200).json({ message: 'Course marked as complete' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking course as complete' });
  }
};


module.exports = { 
  getAllCourses , getCourseById, getUserEnrolledCourses, getCourseDetailsById, searchCourses, markCourseAsComplete
};