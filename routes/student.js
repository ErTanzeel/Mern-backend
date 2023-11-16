const express = require('express')
const studentroutes = express.Router();
const { handleSignup, handleLogin, handleFetchData,
handleUploadFile, handleGetFile, handleModalData, handlepostModal, handleFeed } = require("../Controller/controller")
const multer = require('multer')
const path = require("path")

studentroutes.get('/', handleFetchData)


studentroutes.post('/login', handleLogin);
studentroutes.post('/modal', handleModalData);

studentroutes.post('/postModal', handlepostModal);
studentroutes.post('/feed', handleFeed);

// const img = require('../../my-app/src/ima/')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../../my-app/src/ima/'); // 'uploads' is the directory name
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        // Define the filename for the uploaded file.
        return cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
studentroutes.post('/',upload.single('image'), handleSignup);

// studentroutes.post('/upload', upload.single('image'), handleUploadFile); // Use the 'image' fieldname from your form
studentroutes.get('/upload', handleGetFile); // Use the 'image' fieldname from your form



module.exports = studentroutes;