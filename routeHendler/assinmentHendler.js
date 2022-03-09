const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const AssinmentSchemas = require('../Schemas/AssinmentSchemas');
const Assinment = new mongoose.model("Assinment", AssinmentSchemas);
const EnrollSchemas = require('../Schemas/EnrollSchemas');
const EnrollCourse = new mongoose.model("EnrollCourse", EnrollSchemas);


// get all assinment submited by teacher
router.get('/', (req, res)=>{
      Assinment.find({}, (err, documents) =>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(documents)
        }
    })
   
})

router.get('/:email/:sub', async (req, res) => {
    const checkEnroll = await EnrollCourse.find({email: req.params.email, title: req.params.sub}).exec();
    if(checkEnroll.length){
        const allAssinment = await Assinment.find({subject: req.params.sub});
        res.send(allAssinment)
    } else{
        res.status(500).json({
            error: 'This course is not enroll please enroll'
        })
    }
 
});
// assien assinment by teacher
router.post('/', async (req, res) => {
    const newAssinment = new Assinment(req.body);
    await newAssinment.save((err)=>{
        if(err){
            res.status(500).json({
                error: `Assinment not insert. Server site error${err}`
            })
        } else{
            res.status(200).json({
                message: 'Assinment insert successfully'
            })
        }
    })
});
// submit assinment by student





module.exports = router