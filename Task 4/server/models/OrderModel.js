const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  status: {
    type: String,
    enum: ['Pending', 'In progress', 'Completed'],
    default: 'Pending'
  },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);