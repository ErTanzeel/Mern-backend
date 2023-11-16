const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const { ConnectMongdb } = require('./connection')
const impstudentroutes = require('./routes/student')
const multer = require('multer')
 
// connections
ConnectMongdb('mongodb://127.0.0.1:27017/Tanzeel').then(() => console.log("Mongodb connected"));
app.use(cors()); // manage the same origin policy , actually browser follow the same origin policy but our frontend 
// and backend are different server to manage cross originserver we use cors middleware.

app.use('/upload',express.static('upload'))
app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data

app.use(express.json()); // Middleware for parsing JSON request bodies
// 
app.use('/student', impstudentroutes);




app.listen(5000, console.log("Server is running at port 5000"));
