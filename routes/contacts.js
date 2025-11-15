const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contacts');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getSingleContacts);

router.post('/', contactsController.createContacts);

router.put('/:id', contactsController.updateContacts);

router.delete('/:id', contactsController.deleteContacts);

module.exports = router;