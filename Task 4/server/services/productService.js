const Product=require('../models/ProductModel');

exports.createProduct=async(products)=>{
    const productsDocs= await Product.insertMany(products.map(p=>({...p})));
    return productsDocs;
}
