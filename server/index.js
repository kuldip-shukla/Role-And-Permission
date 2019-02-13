const config = require('./config');
const userAction = require('./user_action');
const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect(config.path);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.post('/registration',(req,res)=>userAction.registration(req,res));
app.post('/login',(req,res)=>userAction.login(req,res));
app.get('/edit/:id',(req,res)=>userAction.edit(req,res));
app.post('/updateProfile/:id',(req,res)=>userAction.updateProfile(req,res));
app.get('/deleteProfile/:id',(req,res)=>userAction.deleteProfile(req,res));
app.post('/displayProfile',(req,res)=>userAction.displayProfile(req,res));


app.listen(8000);



// 8155888444
// 2000 1,35