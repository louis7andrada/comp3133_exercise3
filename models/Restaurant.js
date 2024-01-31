const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    city: { type: String, required: true },
    restaurant_id: { type: String, required: true },
    address: {
        building: { type: String },
        street: { type: String },
        zipcode: { type: String }
    }
}, { versionKey: false }); // to disable __v key

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
