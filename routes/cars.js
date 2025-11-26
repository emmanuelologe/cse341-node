const express = require('express');
const router = express.Router();
const carsController = require('../controller/cars');

/**
 * #swagger.tags = ['Cars']
 */

// GET all cars
router.get('/', carsController.getAllCars);

// GET single car
router.get('/:id', carsController.getSingleCar);

// CREATE car
router.post('/', carsController.createCar);

// UPDATE car
router.put('/:id', carsController.updateCar);

// DELETE car
router.delete('/:id', carsController.deleteCar);

module.exports = router;