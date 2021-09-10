const express = require('express');
const axios = require('axios');

const logger = require('../libs/logger');
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

router.post('/gchat', async (req, res, next) => {
	try {
		const { id, type, monitor, description, rule } = req.body;

		const text = `${type}:${monitor} | ${rule} \n${description}`;

		logger.info(text);

		await axios.post(GCHAT_URL, {
			text,
		});

		res.status(200);
		return res.json({ message: 'Sent' });
	} catch (error) {
		logger.error('Failed to send message to Google Chat');
		next(error);
	}
});

module.exports = router;
