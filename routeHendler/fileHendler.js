const express = require('express');
const mongoose = require('mongoose');
var cloudinary = require('cloudinary').v2;
const router = express.Router();
const FileSchemas = require('../Schemas/FileSchemas');
const Files = new mongoose.model('Files', FileSchemas);

cloudinary.config({ 
    cloud_name: 'dv8sz8mml', 
    api_key: '259259562123635', 
    api_secret: '1j0AJuSvwFzlQp3mLUSrETNN_ak'
  });

router.post('/uploadFile', (req, res) =>{
    const resivefile = req.files.file;
            cloudinary.uploader.upload(resivefile.tempFilePath, (err, result)=>{
                if(err){
                    res.status(500).send(err)
                } else{
                    res.status(200).send(result)
                }
            })
        
    
})

module.exports = router