// src/components/VendorProducts.jsx
import React, { useEffect, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useRef } from 'react';

const VendorProducts = ({ vendor, onBack }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const toast = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vendors/${vendor._id}/products`);
      setProducts(res.data.data);
    } catch (err) {
      console.error('Error in receiving the products:', err);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({ ...prev, [productId]: value }));
  };

  const getTotalPrice = () => {
    return products.reduce((acc, product) => {
      const quantity = quantities[product._id] || 0;
      return acc + quantity * product.price_per_unit;
    }, 0);
  };

  const handleSubmitOrder = async () => {
    const items = [];

    for (const product of products) {
      const quantity = quantities[product._id];
      if (quantity && quantity >= product.min_order_amount) {
        items.push({ product_id: product._id, quantity });
      } else if (quantity > 0) {
        toast.current.show({
          severity: 'warn',
          summary: 'Less than the minimum quantity',
          detail: `Product: ${product.product_name} - Minimum quantity: ${product.min_order_amount}`,
          life: 4000
        });
        return;
      }
    }

    if (items.length === 0) {
      toast.current.show({ severity: 'error', summary: 'There are no products to order', life: 3000 });
      return;
    }

    const ownerId = sessionStorage.getItem('user_id');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {vendor_id: vendor._id,owner_id: ownerId,items});
      toast.current.show({ severity: 'success', summary: 'The order was successfully received!', life: 3000 });
      setQuantities({});
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error receiving order', life: 3000 });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <Button label="⬅ Back" onClick={onBack} className="mb-3" />

      {products.map((product) => (
        <Card title={product.product_name} key={product._id} className="mb-3">
          <p>Price per unit: {product.price_per_unit}₪</p>
          <p>Minimum order quantity: {product.min_order_amount}</p>
          <InputNumber 
            value={quantities[product._id] || 0} 
            onValueChange={(e) => handleQuantityChange(product._id, e.value)} 
            showButtons min={0} 
            placeholder="Amount" 
          />
          <p>
            Total:{(quantities[product._id] || 0) * product.price_per_unit}₪
          </p>
        </Card>
      ))}

      <h4>To Pay: ₪{getTotalPrice()}</h4>
      <Button label="Place an order" className="p-button-success" onClick={handleSubmitOrder} />
    </div>
  );
};

export default VendorProducts;
