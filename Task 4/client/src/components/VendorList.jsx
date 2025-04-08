import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import VendorProducts from './VendorProducts';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vendors`);
      setVendors(res.data.data);
    } catch (err) {
      console.error('Error retrieving vendors:', err);
    }
  };

  if (selectedVendor) {
    return (
      <VendorProducts vendor={selectedVendor} onBack={() => setSelectedVendor(null)} />
    );
  }

  return (
    <div className="list">
      {vendors.map((vendor) => (
        <div key={vendor._id}>
          <Card title={vendor.company_name} subTitle={`${vendor.first_name} ${vendor.last_name}`} className="mb-3">
            <p><strong>Phone:</strong> {vendor.phone}</p>
            <Button label="Show products" onClick={() => setSelectedVendor(vendor)} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default VendorList;
