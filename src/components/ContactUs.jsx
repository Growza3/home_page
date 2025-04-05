import React, { useState } from "react";
import styles from "../styles/ContactUs.module.css";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact/add`, formData);
      if (response.data.success) {
        setStatus("Message sent successfully!");
        alert("Message Sent Successfully");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch (error) {
      setStatus("Error sending message. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h2>Our doors are always open!</h2>
      </section>

      {/* Google Map */}
      <div className={styles.mapContainer}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19842.7099020942!2d-0.20483835!3d51.4816966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760fe3e6b91c03%3A0xa90f6f7b21d9b56!2s189%20Munster%20Rd%2C%20London%20SW6%206AW%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <div className={styles.formContainer}>
          <h3>Contact Form</h3>
          <p>Fill this out so we can learn more about you and your needs.</p>
          {status && <p className={styles.statusMessage}>{status}</p>}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name and Surname" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <h3>Casa Seven</h3>
          <p>203, Central Mall, Opposite Vidhyakunj School, Navsari</p>
          <p>Email: growza0107@gmail.com</p>
          <p>Call us: +91 96386 74470</p>
          <p>Monday - Friday: 9:00 AM to 6:00 PM</p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;



