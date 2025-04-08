const productService=require('../services/productService');

exports.createProduct=async(req,res)=>{
    try{
        const newProduct=await productService.createProduct(req.body);
        res.status(201).json({success: true, data: newProduct})
    }
    catch(error){
        res.status(400).json({ success: false, message: error.message })
    }
}
