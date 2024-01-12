import React from 'react';
import './Footer.css'

export default function Footer() {
    return <footer>
    <div className="footer d-flex flex-column ">
    <div className="social-icon d-flex justify-content-center align-items-center ">
          <div className="icon">
          <i class="fa-brands fa-facebook"></i>
          </div>
          <div className="icon">
          <i class="fa-brands fa-whatsapp"></i>
          </div>
          <div className="icon">
          <i class="fa-brands fa-instagram"></i>
          </div>
          <div className="icon">
          <i class="fa-brands fa-linkedin"></i>
          </div>
        </div>
        <div className="copy-icon d-flex justify-content-center ">
            <h4>Copy Rights Reserved </h4>
            <i className="fa-solid fa-copyright fa-sm"></i>         
        </div>
        
        
    </div>
  </footer>
    
  }
  