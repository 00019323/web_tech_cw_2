const express = require('express');
const eventController = require('../../controllers/eventController');

const router = express.Router();

router.get('/', eventController.getEventsPage);

router.get('/create/', eventController.getEventCreatePage);
router.post('/create/', eventController.createEvent);

router.get('/edit/:eventId/', eventController.getEventEditPage);
router.put('/edit/:eventId/', eventController.updateEvent);

router.get('/delete/:eventId/', eventController.getEventDeletePage);
router.delete('/delete/:eventId/', eventController.deleteEvent);

module.exports = router;