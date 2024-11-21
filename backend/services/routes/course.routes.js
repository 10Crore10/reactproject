import express from 'express';
import { courseMulter, createCourseByFaculty, deleteAllCourses, getCourse, getCourseByFaculty } from '../controllers/course.controll.js';
const courseRoute =  express.Router();


courseRoute.get("/:adminID/getCourse", getCourse)
courseRoute.get("/faculty/:id/courses", getCourseByFaculty);
courseRoute.post("/faculty/:id/add-course", courseMulter.single('coursePdf'), createCourseByFaculty);
courseRoute.delete("/:adminID/deleteallcourse", deleteAllCourses);

export default courseRoute;


