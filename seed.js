// backend/seed.js
const pool = require('./db');

const seedData = async () => {
  try {
    const courses = [
      {
        title: "React for Beginners",
        description: "Learn React from scratch.",
        instructor: "John Doe",
        category: "Frontend Development",
        objectives: JSON.stringify([
          "Understand React components",
          "Manage state and props",
          "Implement routing",
          "Create interactive UIs"
        ]),
        lessons: JSON.stringify([
          { lesson_id: 1, title: "Introduction to React", content: "Learn about React basics." },
          { lesson_id: 2, title: "Components and Props", content: "Understanding components and props." },
          { lesson_id: 3, title: "State Management", content: "Learn how to manage state in React." }
        ]),
        duration: "4 weeks",
        prerequisites: "Basic knowledge of JavaScript"
      },
      {
        title: "Node.js Basics",
        description: "Start building with Node.js.",
        instructor: "Jane Smith",
        category: "Backend Development",
        objectives: JSON.stringify([
          "Understand Node.js architecture",
          "Learn to build APIs",
          "Work with Express",
          "Use MongoDB for data storage"
        ]),
        lessons: JSON.stringify([
          { lesson_id: 1, title: "Introduction to Node.js", content: "Learn about Node.js and its features." },
          { lesson_id: 2, title: "Building APIs with Express", content: "Creating a simple API." },
          { lesson_id: 3, title: "Connecting to MongoDB", content: "Learn how to connect to MongoDB using Mongoose." }
        ]),
        duration: "6 weeks",
        prerequisites: "Basic knowledge of JavaScript and web development"
      }
    ];

    for (const course of courses) {
      await pool.query(
        'INSERT INTO courses (title, description, instructor, category, objectives, lessons, duration, prerequisites) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [course.title, course.description, course.instructor, course.category, course.objectives, course.lessons, course.duration, course.prerequisites]
      );
    }
    
    console.log("Courses seeded successfully!");

    // Seed User Enrollments
    const userEnrollments = [
      {
        user_id: 1,
        course_id: 1,
        completion: 50,
        lessons_completed: JSON.stringify([1]) // Assume user completed lesson 1
      },
      {
        user_id: 1,
        course_id: 2,
        completion: 30,
        lessons_completed: JSON.stringify([1]) // Assume user completed lesson 1
      },
      {
        user_id: 2,
        course_id: 1,
        completion: 80,
        lessons_completed: JSON.stringify([1, 2]) // Assume user completed lessons 1 and 2
      }
    ];

    for (const enrollment of userEnrollments) {
      await pool.query(
        'INSERT INTO user_enrollments (user_id, course_id, completion, lessons_completed) VALUES (?, ?, ?, ?)',
        [enrollment.user_id, enrollment.course_id, enrollment.completion, enrollment.lessons_completed]
      );
    }
    
    console.log("User enrollments seeded successfully!");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    pool.end(); // Close the database connection
  }
};

// Run the seed function
seedData();
