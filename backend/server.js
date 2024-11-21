import express from 'express';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import  'dotenv/config'
const port  =  process.env.PORT;
import fs from 'fs';
import db from './services/database/db.js';
import cors from 'cors';
import path from 'path';

const streame = fs.createWriteStream("./services/logs/config.txt", {flags: "a"});


app.use(cors("*"));
app.use(morgan('combined', {stream: streame}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ! static path
const coursesPath = path.join("public/courses");
const facultyPath =  path.join("public/faculty")
app.use("/course", express.static(coursesPath));
app.use("/faculty", express.static(facultyPath));


//! db
db();

// ! all routes here 


// ! admin routes 
import adminRoute from './services/routes/admin.routes.js';
app.use("/", adminRoute);


// ! faculty routes 
import facultyRoute from './services/routes/faculty.routes.js';
app.use("/", facultyRoute);


//! course routes
import courseRoute from './services/routes/course.routes.js';
app.use("/", courseRoute)

app.listen(port, ()=>{
    console.log(`server connected on port http://localhost:${port}`);
});