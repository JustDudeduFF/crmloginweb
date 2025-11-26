import React, { useState } from "react";
import "./customerLogin.css";
import { useNavigate } from "react-router-dom";
import { api } from "./FirebaseConfig";
import axios from "axios";
import { Modal } from "react-bootstrap";
const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [fetchedData, setFetechedData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowModal(true);
    const userid = formData.userid;
    const password = formData.password;

    try {
      const response = await axios.get(
        api + `/customer/login?userkey=${userid}&password=${password}`
      );

      if (response.status !== 200) {
        return;
      }

      const data = response.data;
      if (data) {
        const userData = [];
        Object.keys(data).forEach((user) => {
          const acc = data[user];
          userData.push(acc);
        });

        setFetechedData(userData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userid">User ID/Mobile</label>
            <input
              type="text"
              id="userid"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="additional-options">
          <label>Your Default Password is: 123456</label>
          <a href="/" onClick={() => setShowModal(true)}>
            Forgot Password?
          </a>
        </div>
      </div>

      <Modal show={showModal} onHide={() => {setFetechedData([]); setShowModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Your Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.length > 0 ? (
                  fetchedData.map(({ fullName, mobileNo, _id, partnerId }, index) => (
                    <tr key={index}>
                      <td>{fullName}</td>
                      <td>{mobileNo}</td>
                      <td>
                        <button
                          onClick={() => {
                            localStorage.setItem("userid", _id);
                            localStorage.setItem("partnerId", partnerId);
                            navigate("/LandingPage");
                          }}
                          className="btn btn-success"
                        >
                          Login
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerLogin;
