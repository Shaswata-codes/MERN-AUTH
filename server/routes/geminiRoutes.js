import express from 'express';
import { classifySymptoms } from '../controllers/geminiController.js';

const geminiRouter = express.Router();

geminiRouter.post('/classify', classifySymptoms);

export default geminiRouter;
