const express = require('express');
const router = express.Router();
const carsController = require('../controller/cars');
const { isAuthenticated } = require('../middleware/authentication');

/**
 * #swagger.tags = ['Cars']
 */

// GET all cars
router.get('/', carsController.getAllCars);

// GET single car
router.get('/:id', carsController.getSingleCar);

// CREATE car
router.post('/', isAuthenticated, carsController.createCar);

// UPDATE car
router.put('/:id', isAuthenticated, carsController.updateCar);

// DELETE car
router.delete('/:id', isAuthenticated, carsController.deleteCar);

module.exports = router;