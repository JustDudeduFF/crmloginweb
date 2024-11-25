import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // Add mock data (replace with actual API call later)
  const customerInfo = {
    name: "John Doe",
    address: "123 Main St, City, Country",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    recentRecharges: [
      { date: "2024-03-15", amount: 50 },
      { date: "2024-02-28", amount: 30 },
    ],
    paymentHistory: [
      { date: "2024-03-15", amount: 50, status: "Paid" },
      { date: "2024-02-28", amount: 30, status: "Paid" },
    ],
    currentDue: 75
  };

  return (
    <div className="landing-container mt-5">
      <header className="landing-header">
        <h1>Welcome to Customer Portal</h1>
        <p>Your one-stop solution for customer management</p>
      </header>

      <main className="landing-main">
        <div className="customer-info-section">
          <h2>Customer Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Basic Details</h3>
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Address:</strong> {customerInfo.address}</p>
              <p><strong>Email:</strong> {customerInfo.email}</p>
              <p><strong>Phone:</strong> {customerInfo.phone}</p>
            </div>

            <div className="info-card">
              <h3>Recent Recharges</h3>
              <ul>
                {customerInfo.recentRecharges.map((recharge, index) => (
                  <li key={index}>
                    {recharge.date}: ${recharge.amount}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h3>Payment History</h3>
              <ul>
                {customerInfo.paymentHistory.map((payment, index) => (
                  <li key={index}>
                    {payment.date}: ${payment.amount} - {payment.status}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card highlight">
              <h3>Current Due Amount</h3>
              <p className="due-amount">${customerInfo.currentDue}</p>
              <button 
                className="pay-now-button"
                onClick={() => navigate('/payment')}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        <div className="ledger-section">
          <h2>Transaction Ledger</h2>
          <div className="ledger-table-container">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-03-15</td>
                  <td>Monthly Recharge</td>
                  <td>-</td>
                  <td>$50.00</td>
                  <td>$75.00</td>
                </tr>
                <tr>
                  <td>2024-03-01</td>
                  <td>Service Charge</td>
                  <td>$100.00</td>
                  <td>-</td>
                  <td>$125.00</td>
                </tr>
                <tr>
                  <td>2024-02-28</td>
                  <td>Monthly Recharge</td>
                  <td>-</td>
                  <td>$30.00</td>
                  <td>$25.00</td>
                </tr>
                <tr>
                  <td>2024-02-15</td>
                  <td>Service Charge</td>
                  <td>$50.00</td>
                  <td>-</td>
                  <td>$55.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;