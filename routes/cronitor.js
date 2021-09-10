const express = require('express');
const axios = require('axios');

const router = express.Router();
const GCHAT_URL = process.env.GCHAT_URL;

/*
 * Cronitor Webhook POST body will be in JSON:
 *{
 * "id": "The unique tracking code of this monitor",
 * "type": "Alert OR Recovery",
 * "monitor": "The name of this monitor",
 * "description": "Why the alert was sent",
 * "rule": "Name of the rule that was triggered"
 *}
 */

router.post('/gchat', (req, res, next) => {
	const { id, type, monitor, description, rule } = req.body;

	axios.post(GCHAT_URL, {
		text: `${monitor} | ${description}`,
	});

	res.status(200);
	return res.json({ message: 'Sent' });
});

module.exports = router;
