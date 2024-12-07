import React from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css'; // Import the custom CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-header">
              <Home className="h-8 w-8 text-blue-500" />
              <span>AhmadHome</span>
            </div>
            <p className="footer-description">
              Making your real estate dreams come true with exceptional service and expertise.
            </p>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#properties">Properties</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Buy Property</a></li>
              <li><a href="#">Sell Property</a></li>
              <li><a href="#">Property Management</a></li>
              <li><a href="#">Consultation</a></li>
            </ul>
          </div>
          
          <div>
            <h3>Follow Us</h3>
            <div className="footer-socials">
              <a href="#">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 DreamHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
