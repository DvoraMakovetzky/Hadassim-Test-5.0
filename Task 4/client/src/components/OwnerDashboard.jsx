import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import VendorList from './VendorList';
import OrderTabs from './OrderTabs';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [activeView, setActiveView] = useState('vendors');

  const menuItems = [
    {
      label: 'VENDORS',
      icon: 'pi pi-users',
      command: () => setActiveView('vendors'),
    },
    {
      label: 'ORDERS',
      icon: 'pi pi-shopping-cart',
      command: () => setActiveView('orders'),
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <PanelMenu model={menuItems} />
      </div>

      <div className="main-content">
        {activeView === 'vendors' && <VendorList />}
        {activeView === 'orders' && <OrderTabs />}
      </div>
    </div>
  );
};

export default OwnerDashboard;
