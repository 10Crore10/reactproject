import express from 'express';
import { adminprofile, createAdmin, deleteAdminAndAssociatedFaculties, getAdmin } from '../controllers/admin.controll.js';
const adminRoute =  express.Router();


adminRoute.get("/admin", getAdmin);
adminRoute.post("/create-admin", adminprofile.single('adminProfile'), createAdmin);
adminRoute.delete("/deleteadmin/:id",deleteAdminAndAssociatedFaculties)

export default adminRoute;