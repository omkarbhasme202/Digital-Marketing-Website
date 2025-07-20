const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // For environment variables

const app = express();
const PORT =" https://crimson.herosite.pro/send-email";

// Middleware
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'crimson.herosite.pro', // Your SMTP server
  port: 465, // SSL port
  secure: true, // Use SSL
  auth: {
    user: 'contact_ade@aaryadigital.com', // Use environment variable for email
    pass: 'AaryaContact@27', // Use environment variable for password
  },
});

// API Endpoint to Send Email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Aarya Digital Edge" <crimson.herosite.pro>`, // Corrected template string for `from`
      to: 'contact_ade@aaryadigital.com', // Receiving email address
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Corrected email content
    });

    console.log('Email sent:', info.messageId);
    res.status(200).send({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ success: false, message: 'Failed to send email.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`https://crimson.herosite.pro/send-email`);
});







document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('https://crimson.herosite.pro/send-email', { // Use the backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert(error.message);
    }
  });












