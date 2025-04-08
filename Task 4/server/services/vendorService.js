const Vendor=require('../models/VendorModel');
const productService=require('./productService')

exports.getAllVendors=async()=>{
    return await Vendor.find();
};

exports.createVendor=async(vendorData)=>{
    const {company_name,password,phone,first_name,last_name,products} = vendorData;
    const existingVendor = await Vendor.findOne({ company_name });
    
    if (existingVendor) {
        throw new Error('Vendor already exists');
    }
    const vendor = new Vendor({company_name,password,phone,first_name,last_name});
    // await vendor.save();
    if (products && products.length > 0) {
        const productDocs = await productService.createProduct(products);
        vendor.products = productDocs.map(p => p._id);
    }
    await vendor.save();
    return vendor;
}

exports.getProductsByVendor = async (vendorId) => {
    const vendor = await Vendor.findById(vendorId).populate('products');
    if (!vendor) {
        throw new Error('Vendor not found');
    }
    return vendor.products;
};