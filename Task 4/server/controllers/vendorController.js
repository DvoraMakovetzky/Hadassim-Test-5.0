const vendorService=require('../services/vendorService');

//GET all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await vendorService.getAllVendors();
        res.status(200).json({ success: true, data: vendors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'שגיאה בקבלת הספקים', error: error.message });
    }
};

exports.registerVendor = async (req, res) => {
    try {
        const newVendor = await vendorService.createVendor(req.body);
        res.status(201).json({ success: true, data: newVendor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getProductsByVendor=async(req,res)=>{
    try{
        const {vendorId}=req.params;
        const products= await vendorService.getProductsByVendor(vendorId);
        res.status(200).json({success: true, data: products });
    }catch(error){
        res.status(500).json({ success: false, message: 'שגיאה בקבלת המוצרים', error: error.message});
    }
}
