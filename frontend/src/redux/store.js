import {configureStore}from '@reduxjs/toolkit';
import facultySlice from './faculty.slice';

const store = configureStore({
    reducer:{
faculty: facultySlice
    }
});

export default store;