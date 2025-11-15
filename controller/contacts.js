const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => {
    const result = await mongodb.getdatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingleContacts = async (req, res, next) => {
    try {
        const contactsId = new ObjectId(req.params.id);
        const result = await mongodb.getdatabase().db().collection('contacts').findOne({ _id: contactsId });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching contact' });
    }
};

const createContacts = async (req, res) => {
    const Contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const result = await mongodb.getdatabase().db().collection('contacts').insertOne(Contacts);
        if (result.acknowledged) {
            res.status(201).json({ message: 'Contact created successfully', id: result.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating contact' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateContacts = async (req, res) => {
    const contactsId = new ObjectId(req.params.id);
    const Contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getdatabase().db().collection('contacts').updateOne({ _id: contactsId }, { $set: Contacts });
    if (result.modifiedCount > 0) {
        res.status(204).send();
    }
    else { 
        res.status(500).json({ message: 'Error updating contact' });
    }
};

const deleteContacts = async (req, res) => {
    const contactsId = new ObjectId(req.params.id);
    const result = await mongodb.getdatabase().db().collection('contacts').deleteOne({ _id: contactsId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } 
    else { 
        res.status(500).json({ message: 'Error deleting contact' });
    }  
};

module.exports = {
    getAllContacts,
    getSingleContacts,
    createContacts,
    updateContacts,
    deleteContacts
};