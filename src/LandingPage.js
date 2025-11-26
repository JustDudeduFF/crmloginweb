import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { api, db } from "./FirebaseConfig";
import { get, ref, set, update } from "firebase/database";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import autoTable from "jspdf-autotable";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const LandingPage = () => {
  const username = localStorage.getItem("userid");
  const partnerId = localStorage.getItem("partnerId");

  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    planName: "",
    speed: "",
    validity: "",
    price: "",
  });

  const [customerbasicInfo, setCustomerBasciInfo] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    currentDue: "",
    planName: "",
    planAmount: "",
    expireData: "",
    plancode: "",
    userid:""
  });

  const [paymentArray, setPaymentArray] = useState([]);
  const [rechargeArray, setRechargeArray] = useState([]);
  const [ledgerArray, setLederArray] = useState([]);
  const [companyData, setCompanyData] = useState({});


  const handlePayment = async () => {
    try {
      // Step 1: Create order
      const { data } = await axios.post(api + "/link/create-order", {
        amount: Number(customerbasicInfo.currentDue),
        partnerId,
      });

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      // Step 2: Razorpay Checkout options
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Sigma Business Solutions",
        description: "Payment for Due Amount",
        handler: async function (response) {
          try {
            // Step 3: Verify payment on backend
            const verifyRes = await axios.post(api + "/link/verify-payment", {
              ...response,
              partnerId,
              subscriberId: username,
            });
            console.log(verifyRes);
            if (verifyRes.data.success) {

              const paymentkey = Date.now();
              const receiptData = {
                source: "Website",
                receiptNo: `REC-${paymentkey}`,
                billingPeriod:"Due Payment",
                receiptDate: new Date().toISOString().split("T")[0],
                paymentMode:"Web-Pay",
                bankname:"",
                amount:customerbasicInfo.currentDue,
                discount:"0",
                collectedBy:"RazorPay",
                transactionNo:response.razorpay_payment_id,
                modifiedBy: "Customer",
                narration:"Payment Paid From Website",
                discountkey: Date.now(),
                authorized: true,
                userId: customerbasicInfo.userid,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                partnerId: partnerId,
                subscriber: username,
                paymentKey: paymentkey,
                dueAmount: "0",
              };
              const paymentCollection = await axios.post(`${api}/subscriber/payment`, {receiptData});
              console.log(paymentCollection.data);
              alert("✅ Payment Successful!");
            } else {
              alert("❌ Payment Verification Failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Verification request failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error in startPayment:", err);
      alert("Payment request failed");
    }
  };

  const handlerenewal = async () => {
    if (parseInt(customerbasicInfo.currentDue) > 0) {
      alert(
        "Dear Customer, you need to pay due amount first then after you can proceed with renewal"
      );
      return;
    }

    const currentExp = new Date(customerbasicInfo.expireData);

    const today = new Date().getTime();
    const lastto = currentExp.getTime();

    const timeDiff = lastto - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff > 3) {
      alert(
        "You Plan is expired after " +
          daysDiff +
          " Days. You can proceed last 3 days before your plan expired"
      );
      return;
    }

    try {
      // Create order on backend
      const { data } = await axios.post(api + "/link/create-order", {
        amount: parseInt(currentPlan.price), // Amount in INR
      });

      const options = {
        key: "rzp_live_Ig7L9kOGXdtYDt", // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Sigma Business Solutions",
        description: "Plan Renewal Transaction",
        order_id: data.orderId,
        handler: async (response) => {
          console.log(response);
          // Send response to backend for verification
          const verifyResponse = await axios.post(
            api + "/link/verify-payment",
            {
              ...response,
              partnerId,
              subscriberId:username,
              action: "Renewal",
            }
          );

          console.log(verifyResponse.data);

          if (verifyResponse.data.success) {
            alert("Payment Successful and Verified!");
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: customerbasicInfo.name,
          email: customerbasicInfo.email,
          contact: customerbasicInfo.mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  // Add this new function to handle modal
  const handleRenewClick = async () => {
    try {
      const response = await axios.get(
        `${api}/customer/currentplan/${customerbasicInfo.plancode}`
      );
      const data = response.data;

      setCurrentPlan({
        planName: data.planname,
        speed: data.bandwidth,
        validity: `${data.periodtime} ${data.planperiod}`,
        price: customerbasicInfo.planAmount,
      });

      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  };


  const fetcUserInfo = async () => {
    try {
      const response = await axios.get(`${api}/subscriber?id=${username}`);
      const ledgerresponse = await axios.get(
        `${api}/subscriber/ledger?id=${username}`
      );
      const paymentresponse = await axios.get(
        `${api}/subscriber/payments?id=${username}`
      );
      const planresponse = await axios.get(
        `${api}/subscriber/planinfo/${username}?partnerId=${partnerId}`
      );

      if (response.status !== 200)
        return toast.error("Failed to Fetch Data", { autoClose: 2000 });

      const data = response.data;
      setCustomerBasciInfo({
        name: data.fullname,
        address: data.email,
        mobile: data.mobile,
        currentDue: data.dueAmount,
        planName: data.planName,
        planAmount: data.planAmount,
        expireData: data.expiryDate,
        plancode: data.plancode,
        userid:data.username
      });

      if (ledgerresponse.status !== 200)
        toast.error("Failed to Fetch Ledger Data", { autoClose: 2000 });
      if (paymentresponse.status !== 200)
        toast.error("Failed to Fetch Payment Data", { autoClose: 2000 });
      if (planresponse.status !== 200)
        toast.error("Failed to Fetch Recharge Data", { autoClose: 2000 });

      const ledgerData = ledgerresponse.data;
      const paymentData = paymentresponse.data;
      const planData = planresponse.data;

      setLederArray(ledgerData);
      setPaymentArray(paymentData);
      setRechargeArray(planData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetcUserInfo();
  }, []);

  let runningBalance = 0;

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
              <p>
                <strong>Name:</strong> {customerbasicInfo.name}
              </p>
              <p>
                <strong>Address:</strong> {customerbasicInfo.address}
              </p>
              <p>
                <strong>Email:</strong> {customerbasicInfo.email}
              </p>
              <p>
                <strong>Phone:</strong> {customerbasicInfo.mobile}
              </p>
            </div>

            <div className="info-card">
              <h3>Recent Recharges</h3>
              <ul>
                {rechargeArray.slice(-4).map(({ date, planAmount }, index) => (
                  <li key={index}>
                    {date}: ₹{planAmount}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h3>Payment History</h3>
              <ul>
                {paymentArray
                  .slice(-4)
                  .map(({ receiptDate, amount, status }, index) => (
                    <li key={index}>
                      {receiptDate}: ₹{amount} - "{status}"
                    </li>
                  ))}
              </ul>
            </div>

            <div className="info-card highlight">
              <h3>Current Due Amount</h3>
              <p className="due-amount">₹{customerbasicInfo.currentDue}</p>
              <button className="pay-now-button" onClick={handlePayment}>
                Pay Due
              </button>
              <button className="renew-button" onClick={handleRenewClick}>
                Renew Subscription
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
                {ledgerArray.length > 0 ? (
                  ledgerArray.map(
                    ({ date, type, debitamount, creditamount }, index) => {
                      runningBalance += debitamount - creditamount;

                      return (
                        <tr key={index}>
                          <td>{date}</td>
                          <td>{type}</td>
                          <td>₹{debitamount}</td>
                          <td>₹{creditamount}</td>
                          <td>₹{runningBalance}</td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td>No Data Found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Current Plan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="plan-details">
            <p>
              <strong>Plan Name:</strong> {currentPlan.planName}
            </p>
            <p>
              <strong>Speed:</strong> {currentPlan.speed}
            </p>
            <p>
              <strong>Validity:</strong> {currentPlan.validity}
            </p>
            <p>
              <strong>Price:</strong> ₹{currentPlan.price}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className="btn btn-success" onClick={handlerenewal}>
            Proceed to Payment
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LandingPage;
