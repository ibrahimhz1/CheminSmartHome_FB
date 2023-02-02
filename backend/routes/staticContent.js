const express = require('express');
const router = express.Router();

const {sampleRes} = require('../controller/staticController');

router.route('/').get(sampleRes);