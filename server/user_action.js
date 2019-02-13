const model = require('./model');
const mongoose = require('mongoose');

module.exports = {
    'registration': function(req,res){
        var Model = new model(req.body)
        Model.save((err) => {
            if(err){ console.log(err); return res.json({code:400, message:"Try again for Registration"})}
            else return res.json({code:201, message:"Registration Successfully"})
        })
    },

    'login': async function(req,res){
        var Model = mongoose.model("registration")
        var email = req.body.email;
        var pwd = req.body.password;
        var param = await Model.findOne({email:email,password:pwd})
        if(param){
                    return res.json(param)
                }
        else return res.status(400).send({message:"Invalid Username or Password"}) 
    },

    "edit": function(req,res){
        var Model = mongoose.model("registration")
        let id = req.params.id;
        Model.findById({_id : req.params.id},function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },

    "updateProfile":async function(req,res){
        var Model = mongoose.model("registration")
        var update = {$set:{username:req.body.username,email:req.body.email,password:req.body.password}}
        var param = await Model.findOneAndUpdate({_id : req.params.id},update)
        if(param){return res.json({code:201, message:"Data Updated Successfully"})}
        else  return res.json({code:400, message:"Data Updation Failed"})
    },

    "deleteProfile": function(req,res){
        var Model = mongoose.model("registration")
        Model.findByIdAndRemove({_id : req.params.id},function (err, data){
            if(err) res.json(err);
            else res.json(data);
        });
    },

    "displayProfile":async function(req,res){
        var Model = mongoose.model("registration")
        Model.find({}, function(err,result){
            if(err){return res.json({code:400, message:"Data Display Error"})}
            else return res.json(result)
        })
    }
}