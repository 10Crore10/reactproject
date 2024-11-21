import express from 'express';
import { createFaculty, deleteAllFaculty,  deleteFacultyById, facultyMulter, findFacultyById, getFaculty, loginFaculty } from '../controllers/faculty.controll.js';
import verificationRoute from '../mail/emailroute.js';
const facultyRoute =  express.Router();


facultyRoute.get("/admin/:adminid/faculty", getFaculty);
facultyRoute.post("/admin/:id/createFaculty/",facultyMulter.single('facultyProfile'), createFaculty);
facultyRoute.post("/login", loginFaculty);
facultyRoute.get("/admin/:adminId/findFaculty/:facultyId", findFacultyById);
facultyRoute.delete("/admin/:adminid/deletefaculty/:facultyid", deleteFacultyById);
facultyRoute.delete("/:adminID/deleteallfaculty", deleteAllFaculty);
facultyRoute.get("/mail", verificationRoute)
export default facultyRoute;
