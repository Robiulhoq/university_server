const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ClassSchemas = require('../Schemas/ClassSchemas');
const Class = new mongoose.model("Class", ClassSchemas);
const EnrollSchemas = require('../Schemas/EnrollSchemas');
const EnrollCourse = new mongoose.model("EnrollCourse", EnrollSchemas);

router.get('/', async (req, res)=>{
    const totalClass = await Class.find({}).exec();
    res.send(totalClass)
})

router.get('/:email/:sub', async (req, res)=>{
    const checkEnroll = await EnrollCourse.find({email: req.params.email, title: req.params.sub}).exec();
    if(checkEnroll.length){
        const allClass = await Class.find({subject: req.params.sub}).exec()
        res.send(allClass);
    } else{
        res.status(500).json({
            error: 'No classs yet'
        })
    }
    
});

router.post('/', async (req, res)=>{
    const newSingleClass = new Class(req.body)
    await newSingleClass.save((err)=>{
        if(err){
            res.status(500).json({
                error: 'Server site errror'
            })
        } else{
            res.status(200).json({
                message: 'Data inserted Successfuly'
            })
        }
    })
});


module.exports = router;