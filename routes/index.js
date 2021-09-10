const express = require('express');
const router = express.Router();

router.get('/about', function (req, res, next) {
	res.status(200);
	return res.json({ message: 'Forward proxy to transform hooks data' });
});

module.exports = router;
