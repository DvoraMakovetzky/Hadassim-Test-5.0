const mongoose=require('mongoose');

const OwnerSchema=new mongoose.Schema({
    first_name:{type: String,required:true},
    last_name: {type: String,required:true},
    password: { type: String, required: true }
  });
module.exports=mongoose.model('Owner',OwnerSchema);