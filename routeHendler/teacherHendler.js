const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TeacherSch =  require('../Schemas/TeacherSch');
const Teacher = new mongoose.model('Teacher', TeacherSch)


router.post('/', async (req, res) =>{
    const {email, password} = req.body;
    const teacher = await Teacher.find({email: email, password: password}).exec();
    if(teacher){
        res.status(200).send(teacher)
    } else{
        res.status(500).send('auth failed, teacher not found')
    }
})




module.exports = router