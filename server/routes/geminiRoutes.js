import express from 'express';
import { classifySymptoms, analyzeReport } from '../controllers/geminiController.js';

const geminiRouter = express.Router();

geminiRouter.post('/classify', classifySymptoms);
geminiRouter.post('/analyze', analyzeReport);

export default geminiRouter;
