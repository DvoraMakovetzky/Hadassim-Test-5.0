const Owner=require('../models/OwnerModel');

exports.createOwner=async(ownerData)=>{
  const {first_name, last_name, password} = ownerData;
  const existingOwner = await Owner.findOne({ first_name, last_name });

  if (existingOwner) {
    throw new Error('Owner already exists');
  }

  const owner = new Owner({first_name,last_name,password});
  await owner.save();
  return owner;
};