import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { callFaculty } from "../apis/manage.api";


export const facultyThunk = createAsyncThunk("post-faculty",async(formData,
     {rejectWithValue})=>{
    try{
        const result = await callFaculty(formData);
        return result;
    }catch(e){
        return rejectWithValue(e.message);
    }

})

// ! login thunk
export const loginThunk = createAsyncThunk("login-faculty", async(formData, {rejectWithValue})=> {
        try{
   const result = await loginApi(formData);
  if(result){
    // console.log(result.result)
     localStorage.setItem("token",result.result )
     localStorage.setItem("facultyprofile",result.data.facultyprofile);
    return result; 
 
  }
     }catch(e){
            return rejectWithValue(e.message)
        }
     })


const facultySlice = createSlice({
    name : "faculty ",
    initialState:{
   facultData: [ ],
   loading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(facultyThunk.pending,(state)=>{
    state.loading = true;
        })
        builder.addCase(facultyThunk.fulfilled,(state,action)=>{
            state.loading =false;
            state.facultData = action.payload
        })
        builder.addCase(facultyThunk.rejected,(state)=>{
            state.loading = true;
        })

        // loginThunk
        builder.addCase(loginThunk.pending,(state)=>{
            state.loading = true;
                })
                builder.addCase(loginThunk.fulfilled,(state,action)=>{
                    state.loading =false;
                    state.facultData = action.payload
                })
                builder.addCase(loginThunk.rejected,(state)=>{
                    state.loading = true;
                })
        
    }
});

export default facultySlice.reducer;