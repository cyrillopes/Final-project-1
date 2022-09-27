import React from "react";

const OrderDisplay = (props) => {
  const renderTable = ({ orderData }) => {
    if (orderData) {
      return orderData.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.restaurant_name}</td>
            <td>{item.name}</td>
            <td>{item.contact}</td>
            <td>{item.email}</td>
            <td>Rs. {item.cost}</td>
            <td>{item.date}</td>
            <td>{item.status}</td>
            <td>{item.bank_name}</td>
          </tr>
        );
      });
    }
  };
  return (
    <div className="container text-center mt-4">
      <h3>Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Restaurant Name</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Status</th>
            <th>Bank Name</th>
          </tr>
        </thead>
        <tbody>{renderTable(props)}</tbody>
      </table>
    </div>
  );
};

export default OrderDisplay;
