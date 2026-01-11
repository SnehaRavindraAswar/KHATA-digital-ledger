const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/add', customerController.addCustomer);
router.get('/list', customerController.getCustomers);
router.get('/search', customerController.searchCustomers);
router.get('/:id', customerController.getCustomerById);
// Get customer transactions
router.get('/:id/transactions', customerController.getCustomerTransactions);

module.exports = router;
