import express from 'express';
import { classifySymptoms, analyzeReport, generateHealthTips, generatePatientBrief, chatWithAI } from '../controllers/geminiController.js';
const geminiRouter = express.Router();

geminiRouter.post('/classify', classifySymptoms);
geminiRouter.post('/analyze', analyzeReport);
geminiRouter.post('/health-tips', generateHealthTips);
geminiRouter.post('/patient-brief', generatePatientBrief);
geminiRouter.post('/chat', chatWithAI);

export default geminiRouter;
