import express from 'express';
import * as settingsController from '../controllers/settings.js';

const router = express.Router();

router.get('/', settingsController.getSettings);
router.post('/', settingsController.updateSettings);

export default router; 