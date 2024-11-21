import multer from "multer";
import handleError from "../errors/handle.error.js";
import adminModel from "../model/admin.model.js";
import FacultyModel from "../model/faculty.model.js";

// ! multer here  for admin

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(
      null,
      "public/admin/"
    );
  },

  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const adminprofile = multer({ storage: store });


// ! get admins

export const getAdmin = async (req, res) => {
  try {
    const getAdmin = await adminModel.find();
    if (getAdmin) {
      return handleError(res, 200, "admin found", getAdmin);
    } else {
      return handleError(res, 400, "Admin not found");
    }
  } catch (e) {
    handleError(res, 500, e.message);
  }
};


// ! create admin account

export const createAdmin = async (req, res) => {
  const { adminUser, adminEmail, adminPassword } = req.body;
  const adminProfile = req.file;

  try {
    if (adminUser && adminEmail && adminProfile && adminPassword) {
      const user = new adminModel({
        adminUser: adminUser,
        adminEmail: adminEmail,
        adminPassword: adminPassword,
        adminProfile: adminProfile.filename,
      });

      const saveAdmin = await user.save();
      if (!saveAdmin) {
        handleError(res, 400, "cannot save admin account");
      } else {
        handleError(res, 201, "admin account created successfully", saveAdmin);
      }
    } else {
      return handleError(res, 400, "all fields are required");
    }
  } catch (e) {
    handleError(res, 500, e.message);
  }
};


// ! delete admin and associated faculty members



export const deleteAdminAndAssociatedFaculties =  async(req, res)=>{
  const { id } = req.params;

  if(!id){
   return handleError(res, 404, "admin id not found");
  }

  const varifyAdminId =  await adminModel.findById(id);
  if(!varifyAdminId){
    return handleError(res, 400, "invalid admin Id provided");
  }

  try{
    const deletAdminAndAssociatedFaculty =  await adminModel.findByIdAndDelete(varifyAdminId);
    if(deletAdminAndAssociatedFaculty){
      const deleteAllFaculties =  await FacultyModel.deleteMany({adminID:deletAdminAndAssociatedFaculty });

      return handleError(res, 200, "admin deleted successfully and all faculty deleted successfully", deleteAllFaculties)
    }else{
      return handleError(res, 404, "admin and associated faculty members not found");
    }
  }catch (e) {
    handleError(res, 500, e.message);
  }
}