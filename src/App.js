import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import mainImage from './drawables/first_image.jpg';
import aboutImage from './drawables/image_2.webp';

function App() {
  const navigate = useNavigate();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const PrivacyPolicyModal = () => (
    <div className={`modal ${showPrivacyModal ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Privacy Policy</h5>
            <button type="button" className="btn-close" onClick={() => setShowPrivacyModal(false)}></button>
          </div>
          <div className="modal-body">
            <h6>1. Information We Collect</h6>
            <p>We collect information that you provide directly to us, including personal information such as name, email address, and contact details.</p>
            
            <h6>2. How We Use Your Information</h6>
            <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our legal rights.</p>
            
            <h6>3. Right to Collect Personal Information</h6>
            <p>You can visit the Websites (excluding the 'Contact Us' portion of the Websites) without revealing any information about Yourself. We shall collect information that is said to be autonomous over the Sigma Networks network. IP addresses and information collected via "Cookies" are examples of autonomous information. "Cookies" are small text files that store basic information that a Websites can use to recognize repeated visits and as an example, recall Your name if this has been previously supplied. Aggregated data is compiled into statistical and demographic information that Sigma Networks uses, and may share with others, to show preferences of its User base as a whole, but not the preferences of any individual User. Shared aggregated data does not include a level of detail that will permit anyone to identify any individual person's usage or preferences. By accepting

            the terms and conditions contained herein, You agree that We may collect and store Your personal information which will only be used for the purposes for which it was collected or as set out in this Privacy Policy and any other legitimate purpose.

            The Websites may contain hyperlinks to websites of Sigma Networks business partners, advertisers, sponsors and to such other websites that are not affiliated with Sigma Networks and that may or may not have similar practices in place to protect the privacy of information that You supply. Sigma Networks encourages everyone to review the privacy statements of each of the websites that are linked to or accessed from the Website so that there will be no surprise as to how each visited website collects, uses and distributes information. Sigma Networks cannot warrant the security of the information which You transmit to those websites.</p>
            {/* Add more privacy policy content as needed */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowPrivacyModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsAndConditionsModal = () => (
    <div className={`modal ${showTermsModal ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Terms and Conditions</h5>
            <button type="button" className="btn-close" onClick={() => setShowTermsModal(false)}></button>
          </div>
          <div className="modal-body">
            <h6>1. Acceptance of Terms</h6>
            <p>By accessing and using Sigma Networks' services, you accept and agree to be bound by the terms and conditions outlined here.</p>
            
            <h6>2. Service Description</h6>
            <p>Sigma Networks provides internet connectivity services subject to availability in your area. Service speeds may vary based on network conditions and technical limitations.</p>
            
            <h6>3. User Responsibilities</h6>
            <p>Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>
            
            <h6>4. Payment Terms</h6>
            <p>Users agree to pay all fees and charges associated with their chosen service plan. Payments are due according to the billing cycle specified in their service agreement.</p>
            
            <h6>5. Service Modifications</h6>
            <p>Sigma Networks reserves the right to modify, suspend, or discontinue any aspect of its services at any time, with or without notice.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowTermsModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  const RefunPolicyModal = () => (
    <div className={`modal ${showRefundModal ? 'show d-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Refund Policy</h5>
            <button type="button" className="btn-close" onClick={() => setShowRefundModal(false)}></button>
          </div>
          <div className="modal-body">
            <h6>1. Non-Refundable Charges</h6>
            <p>All recharge amounts paid for internet services are strictly non-refundable and non-adjustable under any circumstances.</p><br/>
            <p>Once a recharge is processed, it is considered final.</p>
            
            <h6>2. Security Deposit Refund</h6>
            <p>If a security deposit has been paid for the use of our devices, it will be refunded upon the return of the device in usable condition.
              The device will be inspected for any damages or misuse before processing the refund.
              Refunds will not be issued for devices that are damaged, non-functional, or tampered with.</p>
            
            <h6>3. Refund Process</h6>
            <p>Eligible refunds will be processed within [16-30 business days] after the device is returned and inspected.
              Refunds will be credited to the original payment method or as agreed upon during the refund process.</p>
            
            <h6>4. Contact Us</h6>
            <p>For any questions or concerns regarding refunds, please contact us at [+91 9211636311].</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowRefundModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App vh-100 d-flex flex-column overflow-hidden">
      <div className="flex-grow-1 overflow-auto mt-5">
        <header className="bg-dark text-white py-5" id="home">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold">High-Speed Internet for Your Home</h1>
                <p className="lead">Experience lightning-fast internet speeds with our fiber-optic network.</p>
                <button className="btn btn-primary btn-lg">Check Availability</button>
              </div>
              <div className="col-lg-6">
                <img src={mainImage} alt="High-speed internet" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </header>

        <section className="py-5" id="about">
          <div className="container">
            <div className="row align-items-center">

            <div className="col-lg-6">
                <img 
                  src={aboutImage} 
                  alt="About Sigma Networks" 
                  className="img-fluid rounded shadow-lg"
                />
              </div>
              <div className="col-lg-6">
                <h2 className="mb-4">About Sigma Networks</h2>
                <p className="lead mb-4">We are a leading Internet Service Provider committed to delivering high-speed connectivity solutions across India.</p>
                <p className="mb-4">Founded in 2020, Sigma Networks has quickly grown to become one of the most trusted names in the telecommunications industry. Our state-of-the-art fiber-optic infrastructure and dedication to customer satisfaction set us apart from the competition.</p>
                <div className="row g-4 mt-2">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      <span>6,000+ Happy Customers</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      <span>50+ Town Covered</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      <span>24/7 Technical Support</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      <span>99.9% Uptime Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5" id="services">
          <div className="container">
            <h2 className="text-center mb-4">Our Services</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Residential Internet</h5>
                    <p className="card-text">High-speed internet perfect for streaming, gaming, and working from home.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">ISP Distributer</h5>
                    <p className="card-text">We are a leading ISP distributer in the region, providing high-speed internet solutions to businesses and residential customers.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Networking Equipment</h5>
                    <p className="card-text">We offer a wide range of networking equipment to meet your needs, including routers, olts, and more.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light" id="advantages">
          <div className="container">
            <h2 className="text-center mb-4">Why Choose Us</h2>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="text-center">
                  <i className="bi bi-speedometer2 display-4 text-primary mb-3"></i>
                  <h5>Lightning Fast</h5>
                  <p>Experience speeds up to 1Gbps with our fiber network</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <i className="bi bi-clock display-4 text-primary mb-3"></i>
                  <h5>24/7 Support</h5>
                  <p>Round-the-clock technical support for our customers</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                  <h5>Reliable Service</h5>
                  <p>99.9% uptime guarantee with redundant infrastructure</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <i className="bi bi-cash-stack display-4 text-primary mb-3"></i>
                  <h5>Competitive Pricing</h5>
                  <p>Best-in-class service at affordable rates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light py-5" id="pricing">
          <div className="container">
            <h2 className="text-center mb-4">Internet Plans</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Basic</h5>
                    <h6 className="card-subtitle mb-2 text-muted">100 Mbps</h6>
                    <p className="display-6 my-3">₹399<small className="fs-6">/mo</small></p>
                    <button className="btn btn-outline-primary">Choose Plan</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-primary">
                  <div className="card-body text-center">
                    <h5 className="card-title">Pro</h5>
                    <h6 className="card-subtitle mb-2 text-muted">300 Mbps</h6>
                    <p className="display-6 my-3">₹649<small className="fs-6">/mo</small></p>
                    <button className="btn btn-primary">Choose Plan</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Ultra</h5>
                    <h6 className="card-subtitle mb-2 text-muted">500 Mbps</h6>
                    <p className="display-6 my-3">₹799<small className="fs-6">/mo</small></p>
                    <button className="btn btn-outline-primary">Choose Plan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5" id="contact">
          <div className="container">
            <h2 className="text-center mb-4">Contact Us</h2>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Your Name" />
                      </div>
                      <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email Address" />
                      </div>
                      <div className="mb-3">
                        <textarea className="form-control" rows="3" placeholder="Your Message"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Send Message</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-3">
                <h5>Sigma Networks</h5>
                <p className="mb-1">4649/121-C, Steet No.5, Budh Bazar</p>
                <p className="mb-1">New Modern Shahdara, New Delhi - 110032</p>
                <p className="mb-1">India</p>
              </div>
              <div className="col-md-4 mb-3">
                <h5>Contact</h5>
                <p className="mb-1">
                  <i className="bi bi-telephone-fill me-2"></i>
                  Customer Support: +91 99991 18971
                </p>
                <p className="mb-1">
                  <i className="bi bi-telephone-fill me-2"></i>
                  Whatsapp Support: +91 92116 36311
                </p>
                <p className="mb-1">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href="mailto:support@sigmanetworks.com" className="text-white text-decoration-none">
                    Support Mail: info@sigmanetworks.in
                  </a>
                </p>

                <p className="mb-1">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href="mailto:support@sigmanetworks.com" className="text-white text-decoration-none">
                    Sales Mail: Sales@sigmanetworks.in
                  </a>
                </p>
              </div>
              <div className="col-md-4 mb-3">
                <h5>Legal</h5>
                <ul className="list-unstyled">
                  <li>
                    <a style={{cursor: "pointer"}} className="text-white text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyModal(true);
                    }}>Privacy Policy</a>
                  </li>
                  <li>
                    <a style={{cursor: "pointer"}} className="text-white text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}>Terms & Conditions</a>
                  </li>
                  <li>
                    <a style={{cursor: "pointer"}} className="text-white text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      setShowRefundModal(true);
                    }}>Refund Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="my-3" />
            <div className="text-center">
              <small>&copy; 2025 Sigma Networks. All rights reserved.</small>
              <br />
              <small>Powered by: JustDude</small>
            </div>
          </div>
        </footer>
      </div>
      <PrivacyPolicyModal />
      <TermsAndConditionsModal />
      <RefunPolicyModal/>
    </div>
  );
}

export default App;
