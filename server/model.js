const mongoose = require('mongoose');
const schema = mongoose.Schema;

var registrationSchema = new schema({
    username: {type:String, required: true},
    role: {type:String, required: true,enum:['King','Queen','Boy','Girl']},
    email: {type:String, required: true,unique:true},
    password: {type:String, required: true},
    permissions:{
        view:{type:Boolean, default:false},
        update:{type:Boolean, default:false},
        delete:{type:Boolean, default:false}
        },
    createdAt: {type: Date,default:Date.now()}
})

module.exports = mongoose.model('registration',registrationSchema);