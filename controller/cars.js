const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL CARS
const getAllCars = async (req, res, next) => {
    const result = await mongodb.getdatabase().db().collection('cars').find();
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
};

// GET A SINGLE CAR
const getSingleCar = async (req, res, next) => {
    try {
        const carId = new ObjectId(req.params.id);
        const result = await mongodb.getdatabase().db().collection('cars').findOne({ _id: carId });

        if (!result) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching car' });
    }
};

// CREATE A CAR
const createCar = async (req, res) => {
    const Car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
        mileage: req.body.mileage,
        engine: req.body.engine
    };

    try {
        const result = await mongodb.getdatabase().db().collection('cars').insertOne(Car);
        if (result.acknowledged) {
            res.status(201).json({ message: 'Car created successfully', id: result.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating car' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// UPDATE A CAR
const updateCar = async (req, res) => {
    const carId = new ObjectId(req.params.id);
    const Car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
        mileage: req.body.mileage,
        engine: req.body.engine
    };

    const result = await mongodb.getdatabase().db().collection('cars')
        .updateOne({ _id: carId }, { $set: Car });

    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ message: 'Error updating car' });
    }
};

// DELETE A CAR
const deleteCar = async (req, res) => {
    const carId = new ObjectId(req.params.id);

    const result = await mongodb.getdatabase().db().collection('cars')
        .deleteOne({ _id: carId });

    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ message: 'Error deleting car' });
    }
};

module.exports = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar
};