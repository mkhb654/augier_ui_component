const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const cors = require('cors');

dotenv.config();

// Initialize the Mailgun client
const mailgun = new Mailgun(formData);

// Create a Mailgun client
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

// Enable CORS for all routes
router.use(cors());

// API to send email notifications
router.post('/send', async (req, res) => {
    try {
        // Fetch subscribed users' emails
        const usersResponse = await axios.get(`${process.env.APP_URL}/api/users/subscribed`);
        const subscribedEmails = usersResponse.data;

        // Fetch recommendations from the recommendations API
        const recommendationsResponse = await axios.get(`${process.env.APP_URL}/api/recommendations`);
        const recommendationsData = recommendationsResponse.data;

        // Prepare promises for sending emails
        const emailPromises = subscribedEmails.map(email => {
            const emailContent = {
                from: process.env.MAILGUN_FROM,
                to: email,
                subject: 'Your Daily Recommendations',
                text: `Here are your top 5 recommendations:\n\n${recommendationsData.map(rec => `${rec.title}: ${rec.description}`).join('\n')}`,
            };

            // Send email using mailgun.js
            return mg.messages.create(process.env.MAILGUN_DOMAIN, emailContent);
        });

        // Wait for all email promises to resolve
        await Promise.all(emailPromises);
        res.status(200).json({ message: 'Emails sent successfully.' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ message: 'Error sending emails.' });
    }
});

module.exports = router;
