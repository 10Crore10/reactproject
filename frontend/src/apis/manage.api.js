import axios from 'axios';

export const appID = "673c1cd95ce89aa987b65230"
const facultyApi = `http://localhost:8585/admin/${appID}/createFaculty/`;
const loginAPI = "http://localhost:8585/login"

export const callFaculty = async(formData)=>{
  try{
const response = await axios.post(facultyApi,formData);
return response.data;
  }  catch(e){
    if(e.response.data.message === "Email already exists"){
      alert("Email already exists");
      throw new Error(e.message);
    }
  }
}

// ! login api 
export const loginApi = async(formData)=>{
  try{
    const response = await axios.post(loginAPI, formData);
    return response.data;
  }catch(e){
    if(e.response.data.message === "Email is not registered"){
      alert("Email is not registered")
      throw new Error ("Email is not registered")
    }
     if(e.response.data.message === "invalid password"){
      alert("INVALID PASSWORD")
      throw new Error("invalid password")
     }
  }
}