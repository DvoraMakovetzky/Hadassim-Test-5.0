import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import { Link,useNavigate } from 'react-router-dom';
import './GlobalCss.css';
import axios from 'axios';

const RegisterForm = () => {
  const [role, setRole] = useState(null);
  const [ownerData, setOwnerData] = useState({ first_name: '', last_name: '', password: '' });
  const [vendorData, setVendorData] = useState({
    company_name: '', phone: '', first_name: '', last_name: '', password: '',
    products: [{ product_name: '', price_per_unit: '', min_order_amount: '' }]
  });
  const navigate=useNavigate();

  const addProduct = () => {
    setVendorData({ ...vendorData, products: [...vendorData.products, { product_name: '', price_per_unit: '', min_order_amount: '' }] });
  };

  const updateProduct = (index, field, value) => {
    const updated = [...vendorData.products];
    updated[index][field] = value;
    setVendorData({ ...vendorData, products: updated });
  };

  const handleRegister = async () => {
    try {
      if (role === 'owner') {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/owners/register`, ownerData);
        sessionStorage.setItem('user_id', res.data.data._id);
        sessionStorage.setItem('role', 'owner');
        navigate('/dashboard');
        console.log('Owner registered:', res.data);
      } else if (role === 'vendor') {
        const convertProducts = vendorData.products.map(p => ({
          product_name: p.product_name,
          price_per_unit: parseFloat(p.price_per_unit),
          min_order_amount: parseInt(p.min_order_amount)
        }));
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/vendors/register`, { ...vendorData, products: convertProducts });
        sessionStorage.setItem('user_id', res.data.data._id);
        sessionStorage.setItem('role', 'vendor');
        navigate('/orders');
        console.log('Vendor registered:', res.data);
      }
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Create your account</h2>
      <Dropdown value={role} options={[{ label: 'Vendor', value: 'vendor' }, { label: 'Owner', value: 'owner' }]} 
                onChange={(e) => setRole(e.value)} placeholder="Select your role" className="mb-3" />

      {role === 'owner' && (
        <div className="fields">
          <InputText placeholder="First name" value={ownerData.first_name} onChange={(e) => setOwnerData({ ...ownerData, first_name: e.target.value })} className="mb-3"/>
          <InputText placeholder="Last name" value={ownerData.last_name} onChange={(e) => setOwnerData({ ...ownerData, last_name: e.target.value })} className="mb-3"/>
          <Password placeholder="Password" value={ownerData.password} onChange={(e) => setOwnerData({ ...ownerData, password: e.target.value })} toggleMask className="mb-3"/>
        </div>
      )}

      {role === 'vendor' && (
        <div className="fields">
          <InputText placeholder="Company name" value={vendorData.company_name} onChange={(e) => setVendorData({ ...vendorData, company_name: e.target.value })} className="mb-3"/>
          <InputText placeholder="Phone" value={vendorData.phone} onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })} className="mb-3"/>
          <InputText placeholder="First name" value={vendorData.first_name} onChange={(e) => setVendorData({ ...vendorData, first_name: e.target.value })} className="mb-3"/>
          <InputText placeholder="Last name" value={vendorData.last_name} onChange={(e) => setVendorData({ ...vendorData, last_name: e.target.value })} className="mb-3"/>
          <Password placeholder="Password" value={vendorData.password} onChange={(e) => setVendorData({ ...vendorData, password: e.target.value })} toggleMask className="mb-3"/>

          <Divider />
          <h4>Products</h4>
          {vendorData.products.map((product, i) => (
            <div key={i} className="products mb-3">
              <InputText placeholder="Product name" value={product.product_name} onChange={(e) => updateProduct(i, 'product_name', e.target.value)} />
              <InputText placeholder="Price per unit" value={product.price_per_unit} onChange={(e) => updateProduct(i, 'price_per_unit', e.target.value)} />
              <InputText placeholder="Min order amount" value={product.min_order_amount} onChange={(e) => updateProduct(i, 'min_order_amount', e.target.value)} />
            </div>
          ))}
          <Button label="Add Product" icon="pi pi-plus" onClick={addProduct} className="p-button-outlined mb-3" />
        </div>
      )}

      <Button label="Register" onClick={handleRegister} className="btn-form mb-3" />
      <p className="link">
        Already have an account? <Link to="/login" style={{ color: '#00bcd4' }}><strong>Login here</strong></Link>
      </p>
    </div>
  );
};

export default RegisterForm;
