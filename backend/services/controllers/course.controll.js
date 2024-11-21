import handleError from "../errors/handle.error.js"
import courseModel from "../model/course.model.js"
import multer from 'multer';
import FacultyModel from "../model/faculty.model.js";
import adminModel from "../model/admin.model.js";



const storage =  multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "/Users/kajal/Desktop/lms_project/backend/public/courses")
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname);
    }
})

export const courseMulter =  multer({storage: storage});


export const getCourse =  async(req, res)=>{
    const adminID =  req.params.adminID;

    if(!adminID){
        return handleError(res, 404, "adminID not found")
    };

    const verifyID =  await adminModel.findById(adminID)
    if(!verifyID){
        return handleError(res, 404, "invalid admin ID")
    }

    try{
        const getCourse = await courseModel.find().populate("facultyId")
        if(getCourse){
            return handleError(res, 200, getCourse)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}

export const getCourseByFaculty =  async(req, res)=>{
    const id =  req.params.id;
    try{
        const checkFaculty =  await FacultyModel.findById(id);
        if(!checkFaculty){
            return handleError(res, 400, "Faculty not found")
        }
        
        const getCourseByFaculty = await courseModel.find({facultyId:id});
        if(getCourseByFaculty){
            return handleError(res, 200, getCourseByFaculty)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}


export const createCourseByFaculty = async(req, res)=>{
    const fId = req.params.id;
    const {courseTitle, courseContent, facultyId, author} =  req.body;
    const coursePdf =  req.file;

    const faculty = await FacultyModel.findById(fId);
    if(!faculty){

        return handleError(res, 400, "Faculty not found")
    }

    if(faculty._id.toString() !== facultyId){
        return handleError(res, 401, "faculty iD dosn't match")
    }

    if(!coursePdf){
        return handleError(res, 400, "Please provide course pdf");
    }

  

    try{
        if(courseTitle && courseContent && facultyId && author){
            const createCourseByFaculty = new courseModel({
                courseTitle: courseTitle,
                courseContent: courseContent,
                facultyId: facultyId,
                coursePdf: coursePdf.filename,
                author: author,
               
            });
            if(createCourseByFaculty){
                const saveCourse =  await createCourseByFaculty.save();
                return handleError(res, 201, "Course created successfully", saveCourse)
            }else{
                return handleError(res, 400, "Failed to create course")
            }
        }else{
            return handleError(res, 400, "Please provide course details")
        }
      
  
    }catch(e){
        handleError(res, 500, e.message)
    }
}



// ! delete all courses

export const deleteAllCourses = async(req, res)=>{
    var {adminID} =  req.params;
    if(!adminID){
        return handleError(res, 404, "admin id not found")
    }
    
    const verifyAdminID =  await adminModel.findById(adminID);
    if(!verifyAdminID){
        return handleError(res, 401, "admin id is invalid")
    }
    try{
        const deleteAllCoursesQuery = await courseModel.deleteMany();
        if(deleteAllCoursesQuery){
            return handleError(res, 200, "All courses deleted successfully")
        }else{
            return handleError(res, 400, "Failed to delete all courses")
        }
    }catch(e){
      return  handleError(res, 500, e.message)
    }
}


