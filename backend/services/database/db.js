import mongoose from 'mongoose';
import  'dotenv/config'
const connStr =  process.env.DB;

if(!connStr){
    // throw new Error("missing conn string");
 throw new Error("missing conn string") 

}


const db =  async()=>{
    try{    
        const connections =  await mongoose.connect(connStr);
        if(!connections){
            throw new Error("Failed to connect to DB");
        }else{
            console.log("DB connected successfully");
        }

    }catch(err){
    //    throw new Error(err)
    console.log("Failed to connect to DB")
    }
}
export default db;