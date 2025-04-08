const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    // vendor_id:{type:mongoose.Schema.Types.ObjectId, ref:'Vendor',required:true},
    product_name: { type: String, required: true },
    price_per_unit: { type: Number, required: true },
    min_order_amount: { type: Number, required: true }
  });
module.exports=mongoose.model('Product',ProductSchema);