const express = require('express');
const router = express.Router();

// Sample static data for users
const users = [
    { id: 1, email: 'msairoopesh@gmail.com', subscribed: true },
    { id: 2, email: 'sai_mandava@outlook.com', subscribed: true },
    { id: 3, email: 'user3@example.com', subscribed: false },
];

// API to get all subscribed users' emails
router.get('/subscribed', (req, res) => {
    const subscribedUsers = users.filter(user => user.subscribed).map(user => user.email);
    res.json(subscribedUsers);
});

module.exports = router;
