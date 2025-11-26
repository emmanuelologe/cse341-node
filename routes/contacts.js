const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contacts');

/**
 * #swagger.tags = ['Contacts']
 */

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET all contacts
router.get('/:id', contactsController.getSingleContacts);

//Create contacts
router.post('/', contactsController.createContacts);

//Update contacts
router.put('/:id', contactsController.updateContacts);

//Delete contacts
router.delete('/:id', contactsController.deleteContacts);

module.exports = router;