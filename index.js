const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
const upload = require('express-fileupload');
app.use(upload({
  useTempFiles : true
}));
const port = 5000;
const courseHendler = require('./routeHendler/courseHendler');
const enrollHendler = require('./routeHendler/enrollHendler');
const classHendler = require('./routeHendler/classHendler');
const assinmentHendler = require('./routeHendler/assinmentHendler');
const submitAssinmentHendler = require('./routeHendler/submitAssinmentHendler');
const fileHendler = require('./routeHendler/fileHendler');
const teacherHendler = require('./routeHendler/teacherHendler');


// connect mongodb database using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tx9ov.mongodb.net/University_Class_Managment?retryWrites=true&w=majority`)
.then(()=> console.log('connection successfull'))
.catch(err => console.log(err))


app.use('/course', courseHendler);
app.use('/enroll', enrollHendler);
app.use('/class', classHendler);
app.use('/assinment', assinmentHendler);
app.use('/submitassinment', submitAssinmentHendler);
app.use('/upload', fileHendler);
app.use('/teacher', teacherHendler);



function errorHendler (err, req, res, next){
    if(res.headerSent){
      return next(err)
    } else{
      res.status(500).json({error: err})
    }
};

app.listen(process.env.PORT || port)