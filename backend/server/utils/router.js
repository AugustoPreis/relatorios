const express = require('express');
const gerador = require('../controllers/gerador/gerador');
const multer = require('multer');

const router = new express.Router();
const upload = multer();

router.route('/gerador/:id?')
	.get(gerador.get)
	.post(upload.any(), gerador.post);


module.exports = router;