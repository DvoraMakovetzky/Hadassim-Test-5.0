const Order=require('../models/OrderModel');

exports.createOrder=async({vendor_id,owner_id,items})=>{
    const newOrder=new Order({vendor_id,owner_id,items,});
    return await newOrder.save();
}

exports.getOrdersById=async(id)=>{
    return await Order.find({$or: [{ vendor_id: id },{ owner_id: id }]}).populate('items.product_id');
}

exports.updateOrderStatus= async(orderId,status)=>{
    return await Order.findByIdAndUpdate(orderId,{status},{new:true});
}