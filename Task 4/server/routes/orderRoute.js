const express=require('express');
const router=express.Router();
const {createOrder,getOrdersById,updateOrderStatus}=require('../controllers/orderController');

router.post('/',createOrder);
router.put('/:orderId/status',updateOrderStatus);
router.get('/:id',getOrdersById);


module.exports=router;