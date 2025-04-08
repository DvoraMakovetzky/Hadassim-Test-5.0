import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useRef } from 'react';

const OrderTabs = () => {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState(sessionStorage.getItem('role'));
  const [userId, setUserId] = useState(sessionStorage.getItem('user_id'));
  const toast = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${userId}`);
      setOrders(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error('Error retrieving orders:', err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`, { status: newStatus });
      toast.current.show({ severity: 'success', summary: 'Status updated', life: 3000 });
      fetchOrders();
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error updating status', life: 3000 });
    }
  };

  const actionBody = (rowData) => {
    if (role === 'vendor' && rowData.status === 'Pending') {
      return (
        <Button
          label="In progress"
          icon="pi pi-sync"
          onClick={() => handleStatusUpdate(rowData._id, 'In progress')}
        />
      );
    }
    if (role === 'owner' && rowData.status === 'In progress') {
      return (
        <Button
          label="Completed"
          icon="pi pi-check"
          className="p-button-success"
          onClick={() => handleStatusUpdate(rowData._id, 'Completed')}
        />
      );
    }
    return null;
  };

  const designTable = (data) => (
    <DataTable value={data} paginator rows={5}>
      <Column field="_id" header="Order ID" />
      <Column field="status" header="Status" />
      <Column
        header="Products"
        body={(rowData) =>
          rowData.items.map((item, i) =>
            <div key={i}>
              {item.product_id.product_name} × {item.quantity}
            </div>
          )
        }
      />
      <Column field="createdAt" header="Date" body={(rowData) => new Date(rowData.createdAt).toLocaleString()} />
      <Column header="Action" body={actionBody} />
    </DataTable>
  );

  return (
    <div>
      <Toast ref={toast} />
      <TabView>
        <TabPanel header="All">
          {designTable(orders)}
        </TabPanel>
        <TabPanel header="Pending">
          {designTable(orders.filter(order => order.status === 'Pending'))}
        </TabPanel>
        <TabPanel header="In progress">
          {designTable(orders.filter(order => order.status === 'In progress'))}
        </TabPanel>
        <TabPanel header="Completed">
          {designTable(orders.filter(order => order.status === 'Completed'))}
        </TabPanel>
      </TabView>
    </div>
  );
};

export default OrderTabs;
