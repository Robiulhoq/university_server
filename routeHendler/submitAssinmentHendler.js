const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const SubmitAssinSchemas = require('../Schemas/SubmitAssinmentSch')
const SubmitAssinmet = new mongoose.model("SubmitAssinmet", SubmitAssinSchemas);


router.get('/', (req, res)=>{
    SubmitAssinmet.find({}, (err, documents)=>{
        if(err){
            res.send(err)
        } else{
            res.send(documents)
        }
    })
    // res.send(fiendedSubAssinment)
    
});

router.post('/', async (req, res) => {
    const link = 'google.com'
    const newSubmit = new SubmitAssinmet(req.body, link );
    await newSubmit.save((err)=>{
        if(err){
            res.status(500).json({
                error: `Assinment not submit ${err}`
            })
        } else{
            res.status(200).json({
                message: 'Assinment submited successfully'
            })
        }
       
    })

});


router.get('/:email',async (req, res)=>{
    const submitedAssinment = await SubmitAssinmet.find({email: req.params.email }).exec()
    res.send(submitedAssinment)
});


router.put('/:id', async (req, res)=>{
    const {gradePoint, comment} = req.body;
     await SubmitAssinmet.updateOne({_id: req.params.id }, {$set:  {
         gradePoint: gradePoint,
         comment: comment
        }}, (err)=>{
        if(err){
            res.status(500).json({
                error: 'error'
            })
        } else{
            res.status(200).json({
                message: "success"
            })
        }
    }).clone()
    
})

module.exports = router