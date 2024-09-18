const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Static recommendations data
const staticRecommendations = [
    { title: 'Book A', description: 'A great book about adventure.' },
    { title: 'Movie B', description: 'An amazing movie about friendship.' },
    { title: 'Product C', description: 'A fantastic product for everyday use.' },
    { title: 'Course D', description: 'A top-rated course for learning programming.' },
    { title: 'App E', description: 'A useful app to help manage your tasks.' },
];

// API to get static recommendations
router.get('/', (req, res) => {
    try {
        res.json(staticRecommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: 'Error fetching recommendations.' });
    }
});

module.exports = router;
