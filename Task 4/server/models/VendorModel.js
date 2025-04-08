const mongoose=require('mongoose');

const VendorSchema=new mongoose.Schema({
    company_name: { type: String, required: true },
    password: { type: String, required: true },
    phone: {type: String, required: true},
    first_name:{type: String, required: true},
    last_name: {type: String, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product',required:true }]
  });
module.exports=mongoose.model('Vendor',VendorSchema);