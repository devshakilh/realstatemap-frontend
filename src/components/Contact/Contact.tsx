import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css'; // Import the custom CSS file

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null); // State for form submission status

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch('https://formspree.io/f/mzzpzblo', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setStatus('success'); // Set the status to success
      form.reset(); // Reset the form fields after successful submission
      console.log('success')
    } else {
      setStatus('error'); // Set the status to error if the submission fails
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-grid">
          <div>
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-description">
              Have questions about our properties? Feel free to reach out to us.
            </p>

            <div>
              <div className="contact-info">
                <Phone className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="contact-info-title">Phone</h3>
                  <p className="contact-info-text">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-info">
                <Mail className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="contact-info-title">Email</h3>
                  <p className="contact-info-text">shakilshifat65@gmail.com</p>
                </div>
              </div>

              <div className="contact-info">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="contact-info-title">Office</h3>
                  <p className="contact-info-text">123 Real Estate Ave, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label>Message</label>
              <textarea
                rows={4}
                name="message"
                required
                className="form-input"
              ></textarea>
            </div>

            <button className="contact-button" type="submit">
              Send Message
            </button>
          </form>

          {status === 'success' && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" viewBox="0 0 24 24">
                <path d="M9 16.2l-4.2-4.2 1.4-1.4L9 13.4l8.8-8.8 1.4 1.4z"/>
              </svg>
              <p>Your message has been sent successfully!</p>
            </div>
          )}

          {status === 'error' && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-.55 0-1 .45-1 1v4h-2V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1h4v4h-2v-4h4c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z"/>
              </svg>
              <p>Oops! Something went wrong. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
