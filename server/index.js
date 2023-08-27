const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods : ["GET", "POST"],
    credentials : true
}));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/videocall");



const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json("THe token is not available");
    }
    else{
        jwt.verify(token, "jwt-secret-key-is-here" , (err,decode)=>{
            if(err){
                return res.json("token is wrong");
            }
            next();
        })
    }
}

app.get('/home',verifyUser,(req,res)=>{
    return res.json("Success");
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(users => {

            if (users) {
                bcrypt.compare(password, users.password, (err, response) => {
                   
                    if (response) {
                        const token  = jwt.sign({email: users.email} , "jwt-secret-key-is-here" ,{expiresIn:"1d"})
                        res.cookie("token",token);
                        res.json("Success")
                    }
                    else{

                        return res.json("The email or password is incorrect");

                    }
                })
            }
            else {
                res.json("No user exist please sign in ");

            }
        })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {

            UserModel.create({ name, email, password: hash })
                .then(users => res.json(users))
                .catch(err => res.json(err))
        })
        .catch(err => console.log(err.message))
})

app.post("/logout",(req,res)=>{
  
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true,
      });
    
      res.json({ message: 'Logout successful' });
      console.log("logout successfully")
 
})

const multer = require('multer');

const audioStorage = multer.diskStorage({
    destination(req, file, cb) {
        // directory to save the audio
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        const fileNameArr = file.originalname.split(".");
        var filetype = '';
        if (file.mimetype === 'audio/wav') {
            filetype = 'wav';
        }

        // file name
        cb(null, 'recording-' + Date.now() + '.' + filetype);
    },
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'uploads/'); // Define the upload directory
    },
    filename: function (req, file, cb) {
        var filetype = '';
        if (file.mimetype === 'video/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'video/mp4') {
            filetype = 'mp4';
        }
        if (file.mimetype === 'video/ogg') {
            filetype = 'ogg';
        }
        if (file.mimetype === 'video/wmv') {
            filetype = 'wmv';
        }
        if (file.mimetype === 'video/x-flv') {
            //filetype = mime.getExtension('video/flv');
            filetype = 'flv';
        }
        if (file.mimetype === 'video/avi') {
            filetype = 'avi';
        }
        if (file.mimetype === 'video/webm') {
            filetype = 'webm';
        }
        if (file.mimetype === 'video/mkv') {
            filetype = 'mkv';
        }
        if (file.mimetype === 'video/avchd') {
            filetype = 'avchd';
        }
        if (file.mimetype === 'video/mov') {
            filetype = 'mov';
        }
        if (file.mimetype === 'video/wav') {
            filetype = 'wav';
        }

        return cb(null, 'video-' + Date.now() + '.' + filetype); // Define the filename
    },
});

const upload = multer
    ({
        storage: storage

    });

const audioUpload = multer({ storage: audioStorage });

app.post('/upload', upload.single('video'), (req, res) => {
    // The uploaded file is available as req.file
    const videoFile = req.file;
    console.log(req.file)

    // You can now save the videoFile data to MongoDB using Mongoose
    // Example: Create a Mongoose model and save the video data
    // ...

    res.json({ message: 'File uploaded successfully' });
});

app.post("/audioUpload", audioUpload.single("audio"), (req, res) => {
    const audioFile = req.file;
    res.json({
        success: true,
    })
});


app.listen(port, () => {
    console.log(`Connection is successfull to ${port}`)
})