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

module.exports = {
    getAllContacts,
    getSingleContacts,
};