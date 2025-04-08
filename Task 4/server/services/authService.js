const Owner = require('../models/OwnerModel');
const Vendor = require('../models/VendorModel');

exports.loginUser = async ({ first_name, last_name, password }) => {
  const owner = await Owner.findOne({ first_name, last_name });
  if (owner && owner.password === password) {
    return { role: 'owner', user: owner };
  }

  const vendor = await Vendor.findOne({ first_name, last_name });
  if (vendor && vendor.password === password) {
    return { role: 'vendor', user: vendor };
  }

  throw new Error('שם משתמש או סיסמה שגויים');
};
