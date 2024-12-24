import express from 'express';
import * as reservationController from '../controllers/reservation.js';

const router = express.Router();

router.get('/', reservationController.getReservations);
router.post('/', reservationController.createReservation);
router.get('/:id', reservationController.getReservationById);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

export default router; 