const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const EnrollSchemas = require('../Schemas/EnrollSchemas');
const EnrollCourse = new mongoose.model("EnrollCourse", EnrollSchemas);
const courseSchemas = require('../Schemas/CourseSchemas');
const Course = new mongoose.model("Course", courseSchemas);
const IdPassword = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const EnrollIdPassword = new mongoose.model("EnrollIdPassword", IdPassword);


// This api for student can enroll their course {payload: id, email, password, courseID}
router.post('/:id', async (req, res) => {
    const { id, password, email, title, imgLink } = req.body;
    console.log(title, imgLink, email);
    await EnrollIdPassword.find({ id: id, password: password })
        .then(async (documents, err) => {
            if (documents) {
                console.log("id password match");
                const aallCourse = await Course.find({ _id: req.params.id });
                const alreadyEnroll = await EnrollCourse.find({email: email, title: title}).exec();
                if(alreadyEnroll.length){
                    res.status(500).json({
                        error: 'This Course Already Enroll'
                    })
                } else{
                    if (aallCourse) {
                        const newEnrollCourse = new EnrollCourse({
                            id: req.params.id,
                            email: email,
                            title: title,
                            imgLink: imgLink,
                            status: 'Enrolled'
                        })
                        newEnrollCourse.save((err) => {
                            if (err) {
                                res.status(500).json({
                                    error: 'Server site error. Course enroll unsuccessfull'
                                })
                            } else {
                                res.status(200).json({
                                    message: 'Congratulation Your Course enroll successfull'
                                })
                            }
                        })
                    } else {
                        res.status(500).json({
                            messaage: 'This course is not available'
                        })
                    }
                }

            } else if (err) {
                res.status(500).json({
                    error: 'server site error'
                })
            }
        })

});

// this api for get enroll course
router.get('/items:id', async (req, res)=>{
    const allCourse = await Course.find({ _id: req.params.id});
    res.send(allCourse)
})

router.post('/', async (req, res)=>{
   const {email} = req.body
    // const allCourse = await Course.find({_id: {$in: [toString(req.params.id)]}});
  const yourEnrol = await EnrollCourse.find({email: email}).exec()
    res.send(yourEnrol)
})

module.exports = router