const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransaction);
router.get('/balance/:id', transactionController.getBalance);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
