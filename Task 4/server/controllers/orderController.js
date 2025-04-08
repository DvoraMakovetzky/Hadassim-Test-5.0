const orderService=require('../services/orderService');

exports.createOrder= async(req,res)=>{
    try{
        const newOrder=await orderService.createOrder(req.body);
        res.status(201).json({ success: true, data: newOrder});
    }catch(error){
        res.status(500).json({ success: false,message: 'שגיאה ביצירת הזמנה',error: error.message });
    }

};

exports.getOrdersById=async(req,res)=>{
    try{
        const {id}=req.params;
        const orders= await orderService.getOrdersById(id);
        res.status(200).json({ success: true, data: orders });
    }catch(error){
        res.status(500).json({success: false,message: 'שגיאה בקבלת ההזמנות',error:error.message});
    }
}

exports.updateOrderStatus=async(req,res)=>{
    try{
        const { orderId } = req.params;
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(orderId, status);

        res.status(200).json({ success: true, message: 'סטטוס עודכן', data: updatedOrder });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'שגיאה בעדכון סטטוס', error: error.message });
    }
}