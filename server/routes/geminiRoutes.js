import express from 'express';
import { classifySymptoms, analyzeReport, generateHealthTips } from '../controllers/geminiController.js';

const geminiRouter = express.Router();

geminiRouter.post('/classify', classifySymptoms);
geminiRouter.post('/analyze', analyzeReport);
geminiRouter.post('/health-tips', generateHealthTips);

export default geminiRouter;
