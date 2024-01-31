const express = require('express');
const Restaurant = require('../models/Restaurant'); // Adjust the path as necessary to where your model is located

const router = express.Router();

// Get all restaurant details
router.get('/', async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});

// Get restaurant details by cuisine
router.get('/cuisine/:cuisine', async (req, res, next) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine });
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});

// Get restaurants sorted by a column
router.get('/sortBy/:column/:order', async (req, res, next) => {
    try {
        const { column, order } = req.params;
        let sortQuery = {};
        sortQuery[column] = order === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}).sort(sortQuery);
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});

// Get Delicatessen restaurants not in Brooklyn
router.get('/Delicatessen', async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: 'Delicatessen',
            city: { $ne: 'Brooklyn' }
        }).select('name city -_id');
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
