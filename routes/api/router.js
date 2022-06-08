const express = require('express');
const poolController = require('../../controllers/pool.controller');

const router = express.Router();

router.get('/pools/all', poolController.getWeb3);

module.exports = router;