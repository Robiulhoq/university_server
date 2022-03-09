const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const courseSchemas = require('../Schemas/CourseSchemas');
const EnrollSchemas = require('../Schemas/EnrollSchemas');
const Course = new mongoose.model("Course", courseSchemas);


// get all course
router.get('/', async (req, res) => {
    const allCourse = await Course.find({});
    res.send(allCourse)
})
// get course by name. This api create for easyly find course

router.post('/name', async (req, res) => {
    const { title } = req.body;
    const searchCourse = await Course.find({ title: title });
    res.send(searchCourse)
});

//admin/teacher insert new course one by one
router.post('/', async (req, res) => {
    const newCourse = new Course(req.body);
    console.log(req.body);
    await newCourse.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'server site error'
            })
        } else {
            res.status(200).json({
                mesage: 'data inserted'
            })
        }
    })

});

// admin/teacher insert multiple course 
router.post('/all', async (req, res) => {
    await Course.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'server site error'
            })
        } else {
            res.status(200).json({
                mesage: 'data inserted'
            })
        }
    })
});


// admin/ teacher edit their course information {payload: courseId, edit information(title, imgLink)}

router.put('/:id', async (req, res) => {
    const { title, imgLink } = req.body;
    await Course.updateOne({ _id: req.params.id }, {
        $set: {
            title: title,
            imgLink: imgLink
        }
    }).then(result => res.send(result))
        .catch(err => {
            if (err) {
                res.status(500).json({
                    error: 'server site error'
                })
            }
        })


});
 
// admin/teacher delete any course {payload: id}
router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    await Course.deleteOne({ _id: req.params.id })
        .then(result => {
            res.send(result.deletedCount > 0)
        })

});


//  insert course id password in database for admin/Teacher
router.post('/idpassword', async (req, res) => {
    console.log(req.body);
    const newIdPassword = new EnrollIdPassword(req.body)
    await newIdPassword.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'server site error'
            })
        } else {
            res.status(200).json({
                mesage: 'data inserted'
            })
        }
    })

})



module.exports = router