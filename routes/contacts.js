const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contacts');
const { isAuthenticated } = require('../middleware/authentication');

/**
 * #swagger.tags = ['Contacts']
 */

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET all contacts
router.get('/:id', contactsController.getSingleContacts);

//Create contacts
router.post('/', isAuthenticated, contactsController.createContacts);

//Update contacts
router.put('/:id', isAuthenticated, contactsController.updateContacts);

//Delete contacts
router.delete('/:id', isAuthenticated, contactsController.deleteContacts);

module.exports = router;