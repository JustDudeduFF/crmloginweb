import React, {useEffect, useState} from 'react';
import './LandingPage.css';
import { db } from './FirebaseConfig';
import { get, ref, set, update } from 'firebase/database';
import axios from 'axios';
import { jsPDF } from "jspdf"; // Import jsPDF
import autoTable from 'jspdf-autotable';

const LandingPage = () => {

  const username = localStorage.getItem('userid');

  const [customerbasicInfo, setCustomerBasciInfo] = useState({
    name: '',
    address: '',
    email: '',
    mobile: '',
    currentDue: ''
  });

  const [paymentArray, setPaymentArray] = useState([]);
  const [rechargeArray, setRechargeArray] = useState([]);
  const [ledgerArray, setLederArray] = useState([]);
  const [companyData, setCompanyData] = useState({});


  const paymentKey = Date.now();


const handlePayment = async () => {
    try {
      // Create order on backend
      const { data } = await axios.post('https://finer-chimp-heavily.ngrok-free.app/create-order', {
        amount: parseInt(customerbasicInfo.currentDue), // Amount in INR
      });

      const options = {
        key: 'rzp_test_5tAkkRIcyGgC0k', // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'JustDude',
        description: 'Test Transaction',
        order_id: data.orderId,
        handler: async (response) => {
            console.log(response);
          // Send response to backend for verification
          const verifyResponse = await axios.post('https://finer-chimp-heavily.ngrok-free.app/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });


          console.log(verifyResponse.data);

          if (verifyResponse.data.success) {
            updatePayment(verifyResponse.data.razorpay_payment_id);
            alert('Payment Successful and Verified!');
          } else {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: customerbasicInfo.name,
          email: customerbasicInfo.email,
          contact: customerbasicInfo.mobile,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
}

const companyRef = ref(db, `Master/companys`);


const updatePayment = async(paymentID) => {
  const paymentRef = ref(db, `Subscriber/${username}/payments/${paymentKey}`);
  const ledgerRef = ref(db, `Subscriber/${username}/ledger/${paymentKey}`)

  fetchCompany();
  handleDownloadInvoice();
  const receiptData = {
    source: 'WebPay',
    receiptNo: `REC-${paymentKey}`,
    billingPeriod: 'Due Payment',
    receiptDate: new Date().toISOString().split('T')[0],
    paymentMode: "Online-Web",
    bankname: "",
    amount: customerbasicInfo.currentDue,
    discount: "",
    collectedBy: "Admin",
    transactionNo: paymentID,
    modifiedBy: "",
    narration: "Payment Done By Customer Self",
    discountkey: "",
    authorized: true
  };

  const ledgerData = {
    type: 'Payment Paid',
    date: new Date().toISOString().split('T')[0],
    particular: `Due Payment`,
    debitamount: 0,
    creditamount: parseFloat(customerbasicInfo.currentDue),
  };

  await set(ledgerRef, ledgerData);
  await set(paymentRef, receiptData).then(() => {
    sendmessage();
  });





}

const fetchCompany = async () => {
  const companySnap = await get(companyRef);
  if(companySnap.exists()){
    companySnap.forEach(company => {
      const companyData = company.val();
      
      if(companyData.companycode === 'global'){
        setCompanyData(companyData);

      }
    });
  }
}

const handleDownloadInvoice = async() => {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: companyData.companyname,
          styles: {
            halign: 'left',
            fontSize: 20,
            textColor: '#ffffff',
          }
        },
        {
          content: 'Invoice',
          styles: {
            halign: 'right',
            fontSize: 20,
            fontWeight: 'bold',
            textColor: '#ffffff',
          }
        }
      ],
    ],
    theme: 'plain',
    styles: {
      fillColor: '#3366ff',
    }
  });


  autoTable(doc, {
    body: [
      [
        {
          content: `Reference : #INV${paymentKey.slice(10, 13)}` + '\nDate: ' + new Date().toISOString().split('T')[0],
          styles: {
            halign: 'right',
            
          }
        }
      ],
    ],
    theme: 'plain',
    
  });


  autoTable(doc, {
    body: [
      [
        {
          content: 'Billed to:' + '\nCustomer Name: ' + customerbasicInfo.name + '\nAddress: ' + customerbasicInfo.address + '\nMobile No: ' + customerbasicInfo.mobile,
          styles: {
            halign: 'left',
          }
        },
        {
          content: 'From:' + '\n' + companyData.companyname + '\n' + companyData.companyaddress + '\nMobile No: ' + companyData.companymobile,
          styles: {
            halign: 'right',
          }
        }
      ],
    ],
    theme: 'plain',
    
  });

  autoTable(doc, {
    body: [
      [
        {
          content: 'Amount Paid: ',
          styles: {
            fontSize: 18,
            halign: 'right',
          }
        }
      ],

      [
        {
          content:  customerbasicInfo.currentDue + '.00 Rs',
          styles: {
            halign: 'right',
            fontSize: 15,
            textColor: '#3366ff',
          }
        }
      ],

      [
        {
          content: 'Payment Mode: ' + "Web Pay",
          styles: {
            halign: 'right',
          }
        }
      ]
    ],
    theme: 'plain',
    
  });

  autoTable(doc, {
    body: [
      [
        {
          content: 'Products and Services',
          styles: {
            halign: 'left',
            fontSize: 14,
          }
        }
      ]
    ],
    theme: 'plain',
    
  });


  autoTable(doc, {
    head: [
      ['S. No.', '', 'Quantity', 'Rate', 'Discount', 'Amount']
    ],
    body: [
      ['1', `${customerbasicInfo.address}`, `${"Broadband Payment"}`, `${parseInt(customerbasicInfo.currentDue)}`, `${0}`, `${customerbasicInfo.currentDue}`]
    ],
    theme: 'striped',
    headStyles: {
      fillColor: '#343a40',
    }
  });


  autoTable(doc, {
    body: [
      [
        {
          content: 'Total Amount: ' + customerbasicInfo.currentDue + '.00 Rs',
        styles: {
            halign: 'right',
            fontSize: 14,
          }
        }
      ]
    ],
    theme: 'plain',
  });

  autoTable(doc, {
    body: [
      [
        {
          content: 'Thank you for your business!' + '\n' + 'For any queries, please contact us at ' + companyData.companymobile + '\n' + 'This is an auto generated invoice and does not require any signature.',
          styles: {
            halign: 'center',
            fontSize: 12,
          }
        }
      ]
    ],
    theme: 'plain',
  });

  autoTable(doc, {
    body: [
      [
        {
          content: 'Powered by: CRMDude',
          styles: {
            halign: 'left',
            fontSize: 12,
          }
        }
      ]
    ],
    theme: 'plain',
  });

  const pdfBlob = doc.output('blob');

  const mailData = new FormData();
  mailData.append('pdf', pdfBlob, `${new Date().toISOString().split('T')[0]}.pdf`);
  mailData.append('to', 'justdudehere@gmail.com');
  mailData.append('subject', 'Payment Status And Invoice');
  mailData.append('text', `Dear ${customerbasicInfo.name}, \nYour Payment has been done for receipt period ${"Broadband Payment"}.\n\nPayment Mode: ${"Web Pay"}\n\nReceipt Date: ${new Date().toISOString().split('T')[0]}\n\nReceipt No.: ${paymentKey}\n\nThank you for your business.\nRegards,\nSigma Business Solutions`)

  try{
    const response = await axios.post('https://finer-chimp-heavily.ngrok-free.app/send-invoice', mailData);
    if(response.ok){
      console.log('Invoice Sent Succesfully');
    }else{
      console.log('Failed to Send Invoice');
    }
  }catch(error){
    console.log('Error to Send Mail: '+ error);
  }

};

const sendmessage = async () => {
  const message = `Dear ${customerbasicInfo.name},\nThanks for making payment Rs. ${customerbasicInfo.currentDue} by Website On Date ${new Date().toISOString().split('T')[0]} your current balance is Rs. 0.\nfor any query contact on 919999118971.\n\nSIGMA BUSINESS SOLUTIONS.`;
  const encodedMessage = encodeURIComponent(message);
  const response = await axios.post(`https://finer-chimp-heavily.ngrok-free.app/send-message?number=91${9266125445}&message=${encodedMessage}`);
}


  useEffect(() => {
    const fetcUserInfo = async() => {
      const userRef = ref(db, `Subscriber/${username}`);

      const userSnap = await get(userRef);
      

      if(userSnap.exists()){
        const ledgerArray = [];
        const rechargeArray = [];
        const paymentArray = [];
        setCustomerBasciInfo({
          name: userSnap.child("fullName").val(),
          address: userSnap.child("installationAddress").val(),
          mobile: userSnap.child("mobileNo").val(),
          email: userSnap.child("email").val(),
          currentDue: userSnap.child("connectionDetails").child("dueAmount").val(),

        });

        //LedgerData
        userSnap.child('ledger').forEach((child) => {
          const date = child.val().date;
          const type = child.val().type;
          const camount = child.val().creditamount;
          const damount = child.val().debitamount;


          ledgerArray.push({date, type, camount, damount});
          if(damount){
            rechargeArray.push({date, damount});
          }

          if(camount){
            paymentArray.push({date, camount});
          }
        });
        setRechargeArray(rechargeArray);
        setPaymentArray(paymentArray);
        setLederArray(ledgerArray);
      }
    }

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
              <p><strong>Name:</strong> {customerbasicInfo.name}</p>
              <p><strong>Address:</strong> {customerbasicInfo.address}</p>
              <p><strong>Email:</strong> {customerbasicInfo.email}</p>
              <p><strong>Phone:</strong> {customerbasicInfo.mobile}</p>
            </div>

            <div className="info-card">
              <h3>Recent Recharges</h3>
              <ul>
                {rechargeArray.slice(-4).map(({date, damount}, index) => (
                  <li key={index}>
                    {date}: ₹{damount}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h3>Payment History</h3>
              <ul>
                {paymentArray.slice(-4).map(({date, camount}, index) => (
                  <li key={index}>
                    {date}: ₹{camount} - "Paid"
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card highlight">
              <h3>Current Due Amount</h3>
              <p className="due-amount">₹{customerbasicInfo.currentDue}</p>
              <button 
                className="pay-now-button"
                onClick={handlePayment}
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
                {
                  ledgerArray.length > 0 ? (
                    ledgerArray.reverse().map(({date, type, damount, camount}, index) => {
                      runningBalance += damount - camount;
                      
                      return(
                      <tr key={index}>
                        <td>{date}</td>
                        <td>{type}</td>
                        <td>₹{damount}</td>
                        <td>₹{camount}</td>
                        <td>₹{runningBalance}</td>
                      </tr>
                    )})
                  ) : (
                    <tr>
                      <td>
                        No Data Found!
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;