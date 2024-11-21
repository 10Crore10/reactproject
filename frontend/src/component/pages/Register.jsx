import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { facultyThunk } from '../../redux/faculty.slice';
import { useNavigate } from 'react-router-dom';
import {appID} from '../../apis/manage.api'; 

function Register() {
	
//    const [facultyName, setFacultyName] = useState("");
//    const [email, setEmail] = useState("");
//    const [mobile, setMobile] = useState("");
//    const [password, setPassword] = useState("");
// const [cpass, setCpass ] = useState("");
//    const [adminID, setAdminID] = useState("");
//    const [facultyProfile, setFacultyProfile] = useState("");




	// const [adminID, setAdminID] = useState("");
	 const [val, setVal] = useState({
		facultyName: "",
		email: "",
		mobile:"",
		password: "",
		cpass: "",
		facultyProfile: "",
		// adminID : ""
	 });
     appID
	 
     const [adminID, setAdminID] = useState('');
	 const navigate = useNavigate()

	 const dispatch = useDispatch();
	 const result = useSelector(state=> state.faculty.facultData);
     console.log(result);

	 useEffect(()=>{
		setAdminID(appID)
	 },[adminID])
	//  Handle input 
	 function handleChange(e){ 
       const {value, name, files, type} = e.target;
   
	    if(name === "facultyProfile"){
			const file = files[0];
			
			const isValid = file.type === "image/png" || file.type==="image/jpg";
			if(!isValid){
				e.target.value = ""
				return alert("invalid file format");
			}
		}

	   setVal((prev)=>({
		...prev,[name]: type === "file"? files[0] : value
	   }));
	 }


	 async function handleSubmit(e){
		let mobileReg = /^(?!0{10})\d{10}$/;
		let emailReg = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
		e.preventDefault();
		// alert("success");
if(val.facultyName && val.email && val.mobile && val.password && val.cpass  
	&& val.facultyProfile &&  adminID){

		if(!mobileReg.test(val.mobile)){
 return alert("only 10  digit are allowed ")
		}
		if(!emailReg.test(val.email)){
			return alert("invalied email  ")
		 }
  if(val.password !== val.cpass){
 return alert("password does't match")
  }else{
   try{
	    const formData = new FormData();
		formData.append("facultyName", val.facultyName);
		formData.append("email", val.email);
		formData.append("mobile", val.mobile);
		formData.append("password", val.password);
		formData.append("facultyProfile", val.facultyProfile);
		formData.append("adminID", adminID);
	




await dispatch(facultyThunk(formData)).unwrap();
console.log(formData)
	alert("Success");
	navigate("/login")
   }catch(e){
  console.log(e)
   }

	
 }
		
	}else{
		alert("all fields are required  "); 
	}

	 }
  return (
    <div><section className="p-6 bg-gray-900 text-gray-100">
		<centre>
	<form onSubmit={handleSubmit}  method='POST' encType='multipart/form-data'  noValidate="" action="" className="flex flex-col justify-center items-center gap-4">
		<fieldset className="flex flex-col justify-center items-center gap-4">
			<div className="flex flex-col justify-center items-center gap-4">
				<p className="font-medium">Personal Inormation</p>
				<p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
			</div>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="firstname" className="text-sm">Faculty Name </label>
		
					<input onChange={handleChange} value={val.facultyName} id="firstname" type="text" placeholder="First name" className="text-black" name='facultyName' fdprocessedid="4ujutq" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="lastname" className="text-sm">mobile</label>
					<input  onChange={handleChange} name='mobile' value={val.mobile} id="lastname" type="text" placeholder="Last name" className="text-black" fdprocessedid="fo2jtr" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="email" className="text-sm">Email</label>
					<input  value={val.email} onChange={handleChange} name='email' id="email" type="email" placeholder="Email" className="text-black" fdprocessedid="4oue3k" />
				</div>
				
				
				
			</div>
		</fieldset>
		<fieldset className="flex flex-col justify-center items-center gap-10">
			
			<div className="flex flex-col justify-center items-center gap-10">
				<div className="">
					<label htmlFor="username" className="text-sm">Password</label>
					<input value={val.password } onChange={handleChange} name='password'  id="username" type="text" placeholder="Username" className="text-black" fdprocessedid="4bvrh9" />
				</div>
				<div className="">
					<label htmlFor="website" className="text-sm">Confirm Password </label>
					<input  value={val.cpass} onChange={handleChange}  name='cpass' id="website" type="text" placeholder="https://" className="text-black" fdprocessedid="rgrxv" />
				</div>

				{/* <div className="col-span-full sm:col-span-3"> */}
					{/* <label htmlFor="website" className="text-sm">adminID </label> */}
					<input onChange={(e)=>setAdminID(e.target.value)} value={adminID} className='text-black' type='hidden'   name="adminID" id=""  />
				{/* </div> */}
				
				
				<div className="">
					
					<div className="">
						<label htmlFor=""  >Profile</label>
						<input  accept='.jpg, .png ' onChange={handleChange} type="file" className='input p-2 text-black' name="facultyProfile" id="" />
                        <button type="submit" className="btn btn-secondary" fdprocessedid="kifzhi">register here</button>
					</div>
				</div>
			</div>
		</fieldset>
	</form>
	</centre>
</section></div>
  )
}

export default Register