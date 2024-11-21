import handleError from "../errors/handle.error.js";
import multer from "multer";
import FacultyModel from "../model/faculty.model.js";
import courseModel from "../model/course.model.js";
import adminModel from "../model/admin.model.js";
import sendVerification from "../mail/mailVarification.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(
      null,
      "/Users/kajal/Desktop/lms_project/backend/public/faculty"
    );
  },

  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const facultyMulter = multer({ storage: storage });

// ! get all the faculties  by admin

export const getFaculty = async (req, res) => {
  const { adminid } = req.params;
  if (!adminid) {
    return handleError(res, 400, "Please provide admin ID");
  }

  const validateAdminId = await adminModel.findById(adminid);
  if (!validateAdminId) {
    return handleError(res, 400, "Faculty not found");
  } else {
    try {
      const getFaculty = await FacultyModel.find({ adminID: validateAdminId });
      if (getFaculty) {
        return handleError(res, 200, "Faculty found", getFaculty);
      } else {
        return handleError(res, 400, "Faculty not found");
      }
    } catch (e) {
      return handleError(res, 500, e.message);
    }
  }
};

// export const verificationRoute =   async (req, res) => {
// res.send("hello world")
// const { id } = req.query;

// if (!id) {
//     return handleError(res, 400, "Invalid request");
// }

// try {
//     const faculty = await FacultyModel.findById(id);
//     if (!faculty) {
//         return handleError(res, 404, "Faculty not found");
//     }

//     // Here you might want to set a flag indicating that the email has been verified
//     faculty.isVerified = true; // Assuming you have an `isVerified` field
//     await faculty.save();

//     res.status(200).send("Email verified successfully!");
// } catch (error) {
//     handleError(res, 500, error.message);
// }
// };
// ! create faculty

export const createFaculty = async (req, res) => {
  const { facultyName, email, mobile, password, adminID } = req.body;
  const facultyProfile = req.file;
  const id = req.params.id;

  if (!id) {
    return handleError(res, 400, "Please provide admin ID");
  }
  const adminid = await adminModel.findById(id);
  if (!adminid) {
    return handleError(res, 400, "Admin not found");
  }

  if (adminid._id.toString() !== adminID) {
    return handleError(res, 401, "Admin id does not match");
  }

  const checkMail = await FacultyModel.findOne({ email: email });
  if (checkMail) {
    return handleError(res, 400, "Email already exists");
  }

  // const passwordValidation =  password.length <3;
  // if(passwordValidation){
  //   return handleError(res, 401, "password length smaller than 3")
  // }

  try {
    if (!facultyProfile) {
      return handleError(res, 400, "Please provide faculty profile");
    } else {
      if (facultyName && email && mobile && password) {
        const salt =  await bcrypt.genSalt(12);
        const hashPass =  await bcrypt.hash(password, salt);
        const faculty = new FacultyModel({
          facultyName: facultyName,
          email: email,
          mobile: mobile,
          password: hashPass,
          facultyProfile: facultyProfile.filename,
          adminID: id,
        });
        if (faculty) {
          const data = await faculty.save();
          const msg = `<h2>Hii ${facultyName} Please <a href='http://localhost:8585/api/v1/mail-verification?id=${data._id}'>Verify</a> Your Mail</h2>`;
          sendVerification(email, "Mail verification", msg);
          return handleError(res, 201, "Faculty created successfully", data);
        } else {
          return handleError(res, 400, "Faculty not created");
        }
      } else {
        return handleError(res, 400, "All fields are required");
      }
    }
  } catch (e) {
    return handleError(res, 400, e.message);
  }
};


// ! login faculty 
export const loginFaculty =  async(req, res)=>{
  const {email, password} =  req.body;
  try{
      if(email && password){
          const varify_email =  await FacultyModel.findOne({email: email});
          if(!varify_email){
            return handleError(res, 400, "Email is not registered")
          };
          const  compare_password =  await bcrypt.compare(password,varify_email.password);
          if(!compare_password){
            return handleError(res, 400, "invalid password");
          } 

          if(compare_password){
            const token =  jwt.sign({userId: varify_email._id}, "secret", {expiresIn: "1d"});
            return handleError(res, 200, "logged in",varify_email, token)
          }
      }else{
        return handleError(res, 400, "all fields are required");
      }
  }catch(e){
   return handleError(res, 500, "internal server login error")
  }
}

// ! find  faculty by admin id and faculty id
export const findFacultyById = async (req, res) => {
  const adminId = req.params.adminId;
  const facultyId = req.params.facultyId;

  try {
    // Check if admin exists
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return handleError(res, 404, "Admin not found");
    }

    const faculty = await FacultyModel.findOne({ _id: facultyId }).populate(
      "adminID"
    );
    if (!faculty) {
      return handleError(
        res,
        404,
        "Faculty not found or does not belong to this admin"
      );
    }
    return handleError(res, 200, "Faculty found", faculty);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};

// ! delete faculty and associated courses

export const deleteFacultyById = async (req, res) => {
  const { adminid } = req.params;
  const { facultyid } = req.params;

  if (!adminid) {
    return handleError(res, 400, "Please provide admin ID");
  }

  const validateAdminId = await adminModel.findById(adminid);
  if (!validateAdminId) {
    return handleError(res, 400, "Invalid admin ID provided");
  }
  if (!facultyid) {
    return handleError(res, 400, "Please provide faculty ID");
  }

  const validateFacultyId = await FacultyModel.findById(facultyid);
  if (!validateFacultyId) {
    return handleError(res, 404, "Invalid faculty ID provided");
  }

  try {
    const facultyId = await FacultyModel.findByIdAndDelete(validateFacultyId);
    if (facultyId) {
      const deleteCoursesAssociated = await courseModel.deleteMany({
        facultyId: validateFacultyId,
      });

      if (deleteCoursesAssociated) {
        return handleError(
          res,
          200,
          "Faculty and associated courses deleted successfully",
          facultyId,
          deleteCoursesAssociated
        );
      } else {
        return handleError(
          res,
          400,
          "cannot delete courses and faculty and associated courses"
        );
      }
    } else {
      return handleError(res, 400, "Faculty not deleted");
    }
  } catch (e) {
    return handleError(res, 500, e.message);
  }
};

// ! delete all faculty
export const deleteAllFaculty = async (req, res) => {
  
  const {adminID} =  req.params;
  try {
    if(!adminID){
      return handleError(res, 404, "admin id not found");
    }else{
    
      const deleteAllFaculties = await FacultyModel.deleteMany();
      if (deleteAllFaculties) {
        return handleError(res, 200, "All faculties deleted successfully");
      } else {
        return handleError(res, 400, "cannot delete faculties");
      }
    }

  } catch (e) {
    return handleError(res, 500, e.message);
  }
};
